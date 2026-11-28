// True when the screenshot file is in public/ (listed at build time)
export const hasScreenshot = (src: string | undefined) => Boolean(src && __PROJECT_SHOTS__.includes(src));
