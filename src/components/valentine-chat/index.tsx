'use client';

import { useChat } from 'ai/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/ui/terminal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from 'react';
import { ScrollAreaViewport } from '@radix-ui/react-scroll-area';
import { useRoseStore } from '@/store/useRoseStore';

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
  const { getCurrentRose } = useRoseStore();
  const currentRose = getCurrentRose();

  const systemMessage = `You are a playful and romantic AI assistant managing a Valentine's Day game experience. 
Your role is to guide ${gameInfo.valentineName} through a series of fun challenges to discover their secret admirer.

Game Context:
- Secret Admirer: ${currentRose?.secret_admirer_name}
- Valentine's Name: ${currentRose?.valentines_name}
- Custom Message: ${currentRose?.system_prompt}
- Secret Question: ${currentRose?.secret_question}
- Secret Answer: ${currentRose?.secret_answer}
- Available Clues: ${currentRose?.clue_1}, ${currentRose?.clue_2}, ${currentRose?.clue_3}
- Date Location: ${currentRose?.date_site}
- Date Details: ${currentRose?.date_details}
- Calendly Link: ${currentRose?.calendly_link}
- Custom Poem: ${currentRose?.poem_text}

Your personality should be:
- Playful and flirtatious but respectful
- Encouraging and supportive
- Mysterious about the secret admirer's identity
- Helpful in providing guidance without giving away answers
- Responsive to the user's emotional state

Game Rules:
1. Players must complete all challenges to unlock the date details
2. Give hints strategically but never reveal answers directly
3. Maintain the mystery and excitement throughout the experience
4. Use emojis and playful language to keep the mood light and fun
5. Celebrate each achievement as players progress through the games`;

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    initialMessages: [
      {
        id: 'system-1',
        role: 'system',
        content: systemMessage
      },
      {
        id: 'initial',
        role: 'assistant',
        content: `🌹 Hi there ${gameInfo.valentineName}! Welcome to this Valentine's game. You just got some $LOVE tokens. A secret admirer is trying to ask you out. You must unlock all four gift's to find out the details of all this. Are you a romantic? ¿Who might be your secret Valentine? 💫. I am an AI but my guess is you are quite beautiful. Now, let's see if you're smart. This game won't be difficult, but that depends on how easy your Valentine made it for you. Is your Valentine worth it? 💝 Find out what the four games are, get the gifts and find out who your secret Valentine is. There is a surprise by the end of it all so make sure you get all the gifts. Good luck! 💝`
      }
    ],
    api: '/api/chat',
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const renderMessage = (message: any) => {
    if (message.role === 'system') return null;
    
    const isUser = message.role === 'user';
    
    return (
      <div
        key={message.id}
        className={cn(
          "flex items-start gap-3 mb-4",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-pink-600" : "bg-purple-500"
        )}>
          {isUser ? '🫰🏻✨' : '🧛‍♂️'}
        </div>

        <div className={cn(
          "relative p-4 rounded-2xl max-w-[80%]",
          isUser 
            ? "bg-pink-500/10 border border-pink-500/20 text-pink-400"
            : "bg-purple-500/10 border border-purple-500/20 text-purple-400"
        )}>
          <div className={cn(
            "text-xs mb-1 font-medium",
            isUser ? "text-pink-400/70" : "text-purple-400/70"
          )}>
            {isUser ? gameInfo.valentineName : 'Secret Valentine AI'}
          </div>

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
      <div className="flex-1" ref={scrollAreaRef}>
        <ScrollArea className="h-full relative">
          <ScrollAreaViewport className="h-full pb-36">
            <div className="flex flex-col p-4 space-y-4">
              {messages.map(renderMessage)}
              <div ref={messagesEndRef} />
            </div>
          </ScrollAreaViewport>
        </ScrollArea>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
        <form 
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 max-w-full mx-auto"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Write your message..."
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
                '💝 Send'
              )}
            </Button>
          </div>
        </form>
      </div>
    </Terminal>
  );
}