export const formatTime = (time: number) => {
  const mins = Math.floor(time / 60000);
  const secs = Math.floor((time % 60000) / 1000);
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
};
