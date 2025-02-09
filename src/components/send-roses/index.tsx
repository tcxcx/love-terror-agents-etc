"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createPeanutLink, createRoseSubmission } from "@/utils/supabase/mutations/client"
import { Textarea } from "@/components/ui/textarea"
import RoseLinkForm from "@/components/create-rose-link"


const formSchema = z.object({"system_prompt":z.string().min(1).max(1500),"valentines_name":z.string().min(1).max(255),"secret_admirer_name":z.string().min(1).max(255),"secret_question":z.string().min(1).max(255),"secret_answer":z.string().min(1),"clue_1":z.string(),"clue_2":z.string().optional(),"clue_3":z.string().optional(),"clue_4":z.string().optional(),"clue_5":z.string().optional(),"clue_6":z.string().optional(),"clue_7":z.string().max(255).optional(),"poem_text":z.string().min(1),"date_site":z.string().min(1).max(255),"date_details":z.string().min(1).max(255).optional(),"calendly_link":z.string().min(1).max(255).optional(),"amount_roses":z.coerce.number().gte(0.001).lte(9999999999)})

export default function SendRoses() {
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    system_prompt: "",
    valentines_name: "",
    secret_admirer_name: "string",
    secret_question: "string",
    secret_answer: "",
    clue_1: "",
    clue_2: "",
    clue_3: "",
    clue_4: "",
    clue_5: "string",
    clue_6: "string",
    clue_7: "string",
    poem_text: "string",
    date_site: "string",
    date_details: "string",
    calendly_link: "string",
    amount_roses: 1,
    },
      })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const rose = await createRoseSubmission(values);
        if (rose) {
        // Create peanut link
        const peanutLink = await createPeanutLink(rose.id, "your-peanut-link");
        if (peanutLink) {
            // Handle success
            console.log('Successfully created rose and peanut link');
        }
        }
    } catch (error) {
        console.error('Error in form submission:', error);
    }
}

  return (
    <div className="w-full p-4">
      <div className="relative min-h-screen glassmorphism bg-no-repeat mx-auto w-full lg:max-w-7xl border border-black rounded-lg overflow-hidden p-6">
        <div className="flex flex-col items-left justify-start w-full">
          <h1 className="text-2xl font-bold mb-2">Send Roses Form</h1>
          <p className="text-gray-600 mb-6">Send roses to your loved ones</p>
          <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Context System Prompt */}
                <FormField
                    control={form.control}
                    name="system_prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Context of you and your valentine</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jane Austen is a writter and is a Geminis, she studies Literature and her hobbies are reading and writing..."
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormDescription>
                          Give context of you and your valentine. Give as much detail about your connectionas possible.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />    
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  {/* Left Column */}
                  
                  <FormField
                    control={form.control}
                    name="valentines_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valentines Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Austen" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the name of the person you are sending this to.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="secret_admirer_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Admirer Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Satoshi Nakamoto" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your Name. Provide your First and Last Name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="secret_question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Question</FormLabel>
                        <FormControl>
                          <Input placeholder="ask a question" {...field} />
                        </FormControl>
                        <FormDescription>
                          Ask a fun secret question for your Valentine to guess - provide up to 7 clues to help them.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="secret_answer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Passphrase Answer</FormLabel>
                        <FormControl>
                          <Input placeholder="Two Words" {...field} />
                        </FormControl>
                        <FormDescription>
                          Here goes the answer. Two words max.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clue_1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Clue #1</FormLabel>
                        <FormControl>
                          <Input placeholder="That coffee shop we met" {...field} />
                        </FormControl>
                        <FormDescription>
                          Here goes the first clue
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clue_2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Clue #2</FormLabel>
                        <FormControl>
                          <Input placeholder="That time we first saw each other" {...field} />
                        </FormControl>
                        <FormDescription>
                          Here goes the second clue
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clue_3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Clue #3</FormLabel>
                        <FormControl>
                          <Input placeholder="Something cheesy" {...field} />
                        </FormControl>
                        <FormDescription>
                          Here goes the third clue
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clue_4"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Clue #4</FormLabel>
                        <FormControl>
                          <Input placeholder="Something cheesy again" {...field} />
                        </FormControl>
                        <FormDescription>
                          Here goes the fourth clue
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-8">
                  {/* Right Column */}
                  <FormField
                    control={form.control}
                    name="clue_5"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Clue #5</FormLabel>
                        <FormControl>
                          <Input placeholder="Something cheesy again and again" {...field} />
                        </FormControl>
                        <FormDescription>
                          Here goes the fifth clue
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clue_6"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Clue #6</FormLabel>
                        <FormControl>
                          <Input placeholder="Something mean maybe?" {...field} />
                        </FormControl>
                        <FormDescription>
                          Here goes the sixth clue
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clue_7"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Clue #7</FormLabel>
                        <FormControl>
                          <Input placeholder="Here goes the seventh clue" {...field} />
                        </FormControl>
                        <FormDescription>
                          Here goes the seventh and last clue. Make it easy and explicit.   
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="poem_text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Poem</FormLabel>
                        <FormControl>
                          <Input placeholder="Violets are red.... max 1000 words" {...field} />
                        </FormControl>
                        <FormDescription>
                          Write a poem here and express your feelings. Jane Austen or Bukowski style.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date_site"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Place or Site</FormLabel>
                        <FormControl>
                          <Input placeholder="Coffee Shop @ The City" {...field} />
                        </FormControl>
                        <FormDescription>
                          Write the name of the place you wish to meet up with your valentine
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date_details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Details</FormLabel>
                        <FormControl>
                          <Input placeholder="Bring an umbrella it&#x27;s going to get wet" {...field} />
                        </FormControl>
                        <FormDescription>
                          Here you can provide additional details about the date you have planned
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="calendly_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Calendly Link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://calendly.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          Optional: Add your calendly link so your date books a time slot with you.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <RoseLinkForm
                formData={form.getValues()}
                onSubmitForm={form.handleSubmit}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}