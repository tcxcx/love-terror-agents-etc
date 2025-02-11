import { VALENTINE_ASCII } from '@/lib/ascii';
import { tool as createTool } from 'ai';
import { z } from 'zod';

// ASCII Art Tool
export const asciiArtTool = createTool({
 description: 'Reveals the ASCII art from your not-so-secret admirer',
 parameters: z.object({
   artText: z.string().describe('The ASCII art love message'),
 }),
 execute: async function () {
   return { artText: VALENTINE_ASCII };
 },
});

// Guessing Game Tool
export const guessingGameTool = createTool({
 description: 'Play the 7 clues game to discover who your secret admirer is',
 parameters: z.object({
   clueNumber: z.number().min(1).max(7).describe('Which clue to reveal (1-7)'),
   guess: z.string().optional().describe('Your guess trying to figure out who your secret admirer is')
 }),
 execute: async function ({ clueNumber, guess }) {
   return { clueNumber, guess };
 }
});

// Poem Tool 
export const poemRevealTool = createTool({
 description: 'Reveals the secret poem written by your not-so-secret admirer',
 parameters: z.object({
   poem: z.string().describe('The secret poem'),
   action: z.enum(['view', 'submit']).describe('Action to perform with the poem')
 }),
 execute: async function ({ poem, action }) {
   return { poem, action };
 }
});

// Date Location Tool
export const dateLocationTool = createTool({
 description: 'Reveals the date location with your not-so-secret admirer',
 parameters: z.object({
   location: z.string().describe('The date location'),
   details: z.string().describe('Additional details about the date')
 }),
 execute: async function ({ location, details }) {
   return { location, details };
 }
});

// Calendly Scheduling Tool
export const scheduleDateTool = createTool({
 description: 'Schedule a date with your not-so-secret admirer using Calendly',
 parameters: z.object({
   calendlyLink: z.string().describe('Calendly link to schedule the date'),
   date: z.string().optional().describe('Suggested date for the meeting')
 }),
 execute: async function ({ calendlyLink, date }) {
   return { calendlyLink, date };
 }
});

// Game Progress Tool
export const gameProgressTool = createTool({
 description: 'Check progress of games and unlocks',
 parameters: z.object({
   gameId: z.string().describe('Current game ID'),
   checkType: z.enum([
     'ascii_game',
     'guess_game', 
     'poem_game',
     'roses_game',
     'all'
   ]).describe('Type of progress to check')
 }),
 execute: async function ({ gameId, checkType }) {
   return { gameId, checkType };
 }
});

// Secret Answer Validation Tool
export const validateSecretAnswerTool = createTool({
 description: 'Validates the secret answer provided by the user',
 parameters: z.object({
   answer: z.string().describe('Answer provided by user'),
   secretAnswer: z.string().describe('Correct secret answer'),
   gameId: z.string().describe('Current game ID')
 }),
 execute: async function ({ answer, secretAnswer, gameId }) {
   const isCorrect = answer.toLowerCase().trim() === secretAnswer.toLowerCase().trim();
   return { isCorrect, gameId };
 }
});

export const tools = {
 asciiArt: asciiArtTool,
 guessingGame: guessingGameTool,
 poemReveal: poemRevealTool,
 dateLocation: dateLocationTool,
 scheduleDate: scheduleDateTool,
 gameProgress: gameProgressTool,
 validateSecretAnswer: validateSecretAnswerTool
};