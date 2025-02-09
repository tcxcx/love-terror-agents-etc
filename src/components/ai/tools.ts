import { VALENTINE_ASCII } from '@/lib/ascii';
import { tool as createTool } from 'ai';
import { z } from 'zod';


export const asciiArtTool = createTool({
  description: 'Revela el arte ASCII de tu admirador no tan secreto',
  parameters: z.object({
    artText: z.string().describe('El arte ASCII de tu admirador no tan secreto'),
  }),
  execute: async function () {
    return { artText: VALENTINE_ASCII };
  },
});

// export const passwordAuthTool = createTool({
//   description: 'Intenta entrar a la aplicacion utilizando la palabra clave',
//   parameters: z.object({
//     password: z.string().describe('La palabra clave para entrar a la aplicacion y descubrir quien es tu admirador no tan secreto'),
//   }),
//   execute: async function ({ password }) {
//     return { password };
//   },
// });

// export const agendarCitaTool = createTool({
//   description: 'Agenda una cita con tu admirador no tan secreto',
//   parameters: z.object({
//     date: z.string().describe('Puedes agendar la cita en el siguiente link de calendy'),
//   }),
//   execute: async function ({ date }) {
//     return { date };
//   },
// });

// export const revelarLugarCitaTool = createTool({
//   description: 'Revela el lugar de la cita con tu admirador no tan secreto, luego podras agendar la cita con el link de calendy',
//   parameters: z.object({
//     location: z.string().describe('El lugar de la cita es:'),
//   }),
//   execute: async function ({ location }) {
//     return { location };
//   },
// });

// export const revelarPoemaSecretoTool = createTool({
//   description: 'Revela el poema secreto que tu admirador no tan secreto te ha escrito',
//   parameters: z.object({
//     poem: z.string().describe('El poema secreto es:'),
//   }),
//   execute: async function ({ poem }) {
//     return { poem };
//   },
// });

// export const inscribirPoemaBlockchainNftTool = createTool({
//   description: 'Inscribe el poema secreto en la blockchain como un NFT, luego de ello podras revelar el lugar de la cita con tu admirador no tan secreto y agendar la cita con el link de calendy',
//   parameters: z.object({
//     poem: z.string().describe('El poema secreto es:'),
//   }),
//   execute: async function ({ poem }) {
//     return { poem };
//   },
// });

export const tools = {
  asciiArt: asciiArtTool,
  // passwordAuth: passwordAuthTool,
  // agendarCita: agendarCitaTool,
  // revelarLugarCita: revelarLugarCitaTool,
  // revelarPoemaSecreto: revelarPoemaSecretoTool,
  // inscribirPoemaBlockchainNft: inscribirPoemaBlockchainNftTool,
};