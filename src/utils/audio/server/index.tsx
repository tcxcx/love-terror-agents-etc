
export function playAudio(audioFilePath: string) {
    const audio = new Audio(audioFilePath);
    audio.play();
  }