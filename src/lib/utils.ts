import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import confetti from "canvas-confetti";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export  const confettiLove = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  if (typeof window === "undefined") return;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};


export const VALENTINE_ASCII = `
███████╗███████╗██╗     ██╗███████╗    
██╔════╝██╔════╝██║     ██║╚══███╔╝    
█████╗  █████╗  ██║     ██║  ███╔╝     
██╔══╝  ██╔══╝  ██║     ██║ ███╔╝      
██║     ███████╗███████╗██║███████╗    
╚═╝     ╚══════╝╚══════╝╚═╝╚══════╝    

███████╗ █████╗ ███╗   ██╗
██╔════╝██╔══██╗████╗  ██║
███████╗███████║██╔██╗ ██║
╚════██║██╔══██║██║╚██╗██║
███████║██║  ██║██║ ╚████║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝

██╗   ██╗ █████╗ ██╗     ███████╗███╗   ██╗████████╗██╗███╗   ██╗
██║   ██║██╔══██╗██║     ██╔════╝████╗  ██║╚══██╔══╝██║████╗  ██║
██║   ██║███████║██║     █████╗  ██╔██╗ ██║   ██║   ██║██╔██╗ ██║
╚██╗ ██╔╝██╔══██║██║     ██╔══╝  ██║╚██╗██║   ██║   ██║██║╚██╗██║
 ╚████╔╝ ██║  ██║███████╗███████╗██║ ╚████║   ██║   ██║██║ ╚████║
  ╚═══╝  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝  ╚═══╝
                                                     
💝 Para la más hermosa Géminis de ojos verdes 💝
Te pido perdon por haberte llamado 'bruja', pero es que nunca he sentido tanta magia como la que siento cuando te veo. Tanto que me aterras.
`;


export const defaultQRSize = 150;

export const sizeStyles = {
  container: {
    sm: 'w-48',
    base: 'w-64',
    lg: 'w-72'
  },
  input: {
    sm: 'text-lg',
    base: 'text-2xl',
    lg: 'text-6xl'
  },
  balance: {
    sm: 'text-xs',
    base: 'text-sm',
    lg: 'text-base'
  }
};