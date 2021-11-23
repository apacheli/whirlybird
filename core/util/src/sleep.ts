/** Getting 8 hours of sleep is healthy */
export const sleep = (delay: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, delay));
