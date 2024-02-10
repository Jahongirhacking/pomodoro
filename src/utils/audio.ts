export const playAudio = (audio: HTMLAudioElement) => {
  audio.currentTime = 0;
  return audio.play();
};

export const stopAudio = (audio: HTMLAudioElement) => {
  audio.pause();
  audio.currentTime = 0;
};
