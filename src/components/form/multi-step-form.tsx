"use client"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Input, InputMoney } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'
import { useMultiStepForm } from '@/hooks/use-multi-step-form'
import { JSX } from "react"
import React, { useState } from 'react';
import { TokenChip } from '@/components/token-chip';
import { BaseTokens } from '@/constants/Tokens';
//------------------------------ peanut link imports ------------------------------
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";

interface MultiStepViewerProps {
  formData: any;
  loading: boolean;
  tokenAmount: number;
  setTokenAmount: (amount: number) => void;
  onSubmit: (values: any, amount: number) => Promise<void>;
}

//------------------------------
/**
 * Used to render a multi-step form in preview mode
 */

export function MultiStepViewer({ formData, loading, tokenAmount, setTokenAmount, onSubmit }: MultiStepViewerProps) {
    

    const { address } = useAccount();
    
    
    const handleFormSubmit = async () => {
    await onSubmit(formData.getValues(), tokenAmount);
    };


  const stepFormElements: {
    [key: number]: JSX.Element
  } = {
    1: (
      <div>
        <h1 className="text-3xl font-bold">Create new Valentine&lsquo;s game</h1>
        <h2 className="text-2xl font-bold">Create AI agent Context 🤖</h2>
        <p className="text-base">
          Welcome! Here you must create an AI agent that will interact with your Valentine&lsquo;s through a bunch of games. <br /> Give as much context as possible to make it more personal and create a closer connection.
        </p>
        <FormField
          control={formData.control}
          name="system_prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>System Prompt</FormLabel> *
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Jane Austen is a writer. She likes to read and..."
                  className="resize-none"
                />
              </FormControl>
              <FormDescription>
                Give context of you and your valentine. Give as much detail about your connections as possible.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-3 w-full">
          <Separator />
        </div>
        <h2 className="text-2xl font-bold">Game 1: Guess my name 😍</h2>

        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2">
          <FormField
            control={formData.control}
            name="valentines_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Valentines Name</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Jane Austen"
                    type={"text"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormDescription>This is the name of your crush</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formData.control}
            name="secret_admirer_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Secret Admirer Name</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="Vitalik 'Simp' Buterin"
                    type={"text"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormDescription>Your name to be revealed as part of the game.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    ),
    2: (
      <div>
        <h2 className="text-2xl font-bold">Game 2: Secret Passphrase Question 🤓</h2>
        <p className="text-base">Ask a fun secret question for your Valentine to guess. Provide up to 7 clues to help them. In order to win this gift your valentine&lsquo;s must explicitly state the two words.</p>

        <FormField
          control={formData.control}
          name="secret_question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret Passphrase Question</FormLabel> *
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="What is the name of the coffee shop we met?"
                  className="resize-none"
                />
              </FormControl>
              <FormDescription>Ask a fun secret question for your Valentine to guess. Provide up to 7 clues to help them.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formData.control}
          name="secret_answer"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Secret Passphrase Answer</FormLabel> *
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter the passphrase"
                  type="password"
                />
              </FormControl>
              <FormDescription>Here goes the answer to the question. Two words max.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="py-3 w-full">
          <Separator />
        </div>
        <h3 className="text-xl font-bold">Clues to help solve the passphrase 🧙‍♂️</h3>
        <p className="text-base">You can add up to 7 clues for helping your valentine through this game.</p>

        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2">
          <FormField
            control={formData.control}
            name="clue_1"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Clue #1</FormLabel>
                <FormControl>
                  <Input
                    placeholder="That coffee shop we met"
                    type={"text"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormDescription>Please add the first clue here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formData.control}
            name="clue_2"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Clue #2</FormLabel> *
                <FormControl>
                  <Input
                    placeholder="You came in 30 mins late"
                    type={"text"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormDescription>Please add the second clue here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2">
          <FormField
            control={formData.control}
            name="clue_3"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Clue #3</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Another clue"
                    type={"text"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formData.control}
            name="clue_4"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Clue #4</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Another clue"
                    type={"text"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2">
          <FormField
            control={formData.control}
            name="clue_5"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Clue #5</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Another clue"
                    type={"text"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formData.control}
            name="clue_6"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Clue #6</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Another clue"
                    type={"text"}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={formData.control}
          name="clue_6"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Clue #7</FormLabel>
              <FormControl>
                <Input
                  placeholder="Another clue"
                  type={"text"}
                  value={field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val);
                  }}
                />
              </FormControl>
              <FormDescription>Last clue. Optional as well.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    ),
    3: (
      <div>
        <h2 className="text-2xl font-bold">Game 3: A Poem ✨📜</h2>
        <p className="text-base">Write a poem that will be revealed to your Valentine. This poem will be revealed as a lovely surprise. Write a poem here and express your feelings. Haiku, Jane Austen, Shakespeare or Bukowski style. Or create your own cheesy version of a poem.</p>

        <FormField
          control={formData.control}
          name="poem_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>A Poem</FormLabel> *
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Violets are red
                  Roses are blue
                  My portfolio is rekt
                  But I still love you
                  "
                  className="resize-none min-h-[300px]"
                />
              </FormControl>
              <FormDescription>Express your feelings. This is required for Cringy Cupid to work.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    ),
    4: (
      <div>
        <h2 className="text-2xl font-bold">Risky Game: Get a date 💖</h2>
        <h3 className="text-xl font-bold">If your valentine solves all games, she will be able to reveal a date site and book the date and time via Calendly.</h3>
        <FormField
          control={formData.control}
          name="date_site"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Date Place or Site</FormLabel> *
              <FormControl>
                <Input
                  placeholder="Coffee Shop @ The City"
                  type={"text"}
                  value={field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val);
                  }}
                />
              </FormControl>
              <FormDescription>Bring an umbrella if it rains.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formData.control}
          name="date_details"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Date Details</FormLabel> *
              <FormControl>
                <Input
                  placeholder="Here you can provide additional details about the date  you have planned."
                  type={"text"}
                  value={field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val);
                  }}
                />
              </FormControl>
              <FormDescription>Here you can provide additional context about the date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formData.control}
          name="calendly_link"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Your Calendly Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://calendly"
                  type={"text"}
                  value={field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val);
                  }}
                />
              </FormControl>
              <FormDescription>We recommend adding your own calendly link tied to your Google Calendar to find the best time.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    ),
    5: (
        <div>
          <h1 className="text-3xl font-bold">Send $LOVE quest 🌹</h1>
          <h2 className="text-2xl font-bold">This is a gift</h2>
          <p className="text-base">$LOVE are tokens that unlock a given amount of roses and are the first gift the user receives during the game. You will receive a shareable link you can send to a user or embedd or download as a QR so that you can gift $LOVE to your Valentine&lsquo;s.</p>
          <div className="px-4 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-xl">💸💕💸</span>
            </div>
            <FormField
              control={formData.control}
              name="amount_roses"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Amount of Roses ($LOVE)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <InputMoney
                        placeholder="0.0000"
                        value={field.value?.toString() || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;
                          if (value === "" || /^\d*\.?\d*$/.test(value)) {
                            const numericValue = value;
                            field.onChange(numericValue);
                            setTokenAmount(Number(numericValue)); // Update parent state for peanut
                          }
                        }}
                        className="text-center w-full text-7xl "
                      />
                      <div className="w-full flex justify-center mt-2">
                        <TokenChip token={BaseTokens[0]} />
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>Enter the amount of $LOVE tokens</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )
  };

  const steps = Object.keys(stepFormElements).map(Number);
  const { currentStep, isLastStep, goToNext, goToPrevious } = useMultiStepForm({
    initialSteps: steps,
    onStepValidation: () => true,
  });

  const current = stepFormElements[currentStep];
  const { formState: { isSubmitting } } = formData;

  return (
    <div className="flex flex-col gap-2 pt-3">
      <div className="flex-col-start gap-1">
        <span className="">
          Step {currentStep} of {steps.length}
        </span>
        <Progress value={(currentStep / steps.length) * 100} />
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="flex flex-col gap-2"
        >
          {current}
        </motion.div>
      </AnimatePresence>
      <div className="flex-row-between gap-3 w-full pt-3">
        <Button size="sm" variant="ghost" onClick={goToPrevious} type="button">
          Previous
        </Button>
        {!address && isLastStep && isSubmitting ? (
          <DynamicWidget />
        ) : isLastStep ? (
          <Button
            size="lg"
            type="submit"
            className="mt-5 flex items-center gap-2 self-end w-full"
            disabled={loading}
            onClick={handleFormSubmit}

          >
            <span>Create Quest Link 🌹</span>
          </Button>
        ) : (
          <Button
            size="sm"
            type="button"
            variant="secondary"
            onClick={goToNext}
            disabled={isLastStep}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default MultiStepViewer;
