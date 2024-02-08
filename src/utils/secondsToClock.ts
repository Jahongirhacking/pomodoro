const padZero = (num: number) => {
  return num < 10 ? `0${num}` : num;
};

const secondsToClock = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${padZero(minutes)}:${padZero(remainingSeconds)}`;
  return formattedTime;
};

export default secondsToClock;
