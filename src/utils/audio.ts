export const playAudio = (audio: HTMLAudioElement) => {
  return audio.play();
};

export const stopAudio = (audio: HTMLAudioElement) => {
  audio.pause();
  audio.currentTime = 0;
};
