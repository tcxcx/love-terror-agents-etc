'use client';

import { useChat } from 'ai/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/ui/terminal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from 'react';
import { ScrollAreaViewport } from '@radix-ui/react-scroll-area';
import { getGameStateWithValentineInfo } from '@/utils/supabase/queries';
import { useQuery } from '@tanstack/react-query';
// import { useActions, useUIState } from "ai/rsc";


interface ValentineChatProps {
  gameInfo: {
    valentineName: string;
    systemPrompt: string;
    clues: string[];
    poemText: string;
    dateDetails: string;
    calendlyLink: string;
  };
}

export default function ValentineChat({ gameInfo }: ValentineChatProps) {
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    initialMessages: [
      {
        id: 'initial',
        role: 'assistant',
        content: `🌹 Hi there ${gameInfo.valentineName}! Welcome to this Valentine's game. You just got some $LOVE tokens. A secret admirer is trying to ask you out. You must unlock all four gift's to find out the details of all this. Are you a romantic? ¿Who might be your secret Valentine? 💫. I am an AI but my guess is you are quite beautiful. Now, let's see if you're smart. This game won't be difficult, but that depends on how easy your valentine made it for you. Is your Valentine worth it? 💝 Find out what the four games are, get the gifts and find out who your secret Valentine is. Good luck! 💝`
      }
    ],
    body: {
      systemPrompt: gameInfo.systemPrompt
    }
  });
  

  // const [conversation, setConversation] = useUIState();
  // const { continueConversation } = useActions();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Small delay to ensure content is rendered
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const renderMessage = (message: any) => {
    const isUser = message.role === 'user';
    
    return (
      <div
        key={message.id}
        className={cn(
          "flex items-start gap-3 mb-4",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* Avatar */}
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-pink-600" : "bg-purple-500"
        )}>
          {isUser ? '🫰🏻✨' : '🧛‍♂️'}
        </div>

        {/* Message Bubble */}
        <div className={cn(
          "relative p-4 rounded-2xl max-w-[80%]",
          isUser 
            ? "bg-pink-500/10 border border-pink-500/20 text-pink-400"
            : "bg-purple-500/10 border border-purple-500/20 text-purple-400"
        )}>
          {/* Name */}
          <div className={cn(
            "text-xs mb-1 font-medium",
            isUser ? "text-pink-400/70" : "text-purple-400/70"
          )}>
            {isUser ? gameInfo.valentineName : 'Secret Admirer'}
          </div>

          {/* Message Content */}
          <AnimatedSpan
            delay={100}
            className="whitespace-pre-wrap break-words text-sm"
          >
            <TypingAnimation>{message.content}</TypingAnimation>
          </AnimatedSpan>
        </div>
      </div>
    );
  };

  return (
    <Terminal className="relative flex flex-col h-screen">
      {/* Main content area with messages */}
      <div className="flex-1" ref={scrollAreaRef}>
        <ScrollArea className="h-full relative">
          <ScrollAreaViewport className="h-full pb-36">
            <div className="flex flex-col p-4 space-y-4">
              {messages.map(renderMessage)}
              {/* Invisible element for scrolling */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollAreaViewport>
        </ScrollArea>
      </div>

      {/* Input Form - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
        <form 
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 max-w-full mx-auto"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Escribe tu mensaje..."
            disabled={isLoading}
            className="flex-1 bg-transparent border-pink-400/30 focus:border-pink-400 text-pink-400 placeholder-pink-400/50"
          />
          
          <div className="flex items-center gap-2">
            {isLoading && (
              <Button
                type="button"
                onClick={stop}
                variant="outline"
                size="icon"
                className="border-red-400/30 hover:border-red-400 text-red-400"
              >
                <span className="sr-only">Stop</span>
                ⏹️
              </Button>
            )}
            
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500/20",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : (
                '💝 Enviar'
              )}
            </Button>
          </div>
        </form>
      </div>
    </Terminal>
  );
}