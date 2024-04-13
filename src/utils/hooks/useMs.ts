export function useMs(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
