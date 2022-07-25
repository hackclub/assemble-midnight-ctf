export const formatTime = (time: number, long?: boolean) => {
  const mins = Math.floor(time / 60000);
  const secs = Math.floor((time % 60000) / 1000);
  return long
    ? `${
        mins ? `${mins} minute${mins === 1 ? "" : "s"} and ` : ""
      } ${secs} seconds`
    : `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export const selectRandom = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];
