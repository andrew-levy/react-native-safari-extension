export function isSafariExtension(): boolean {
  return (
    // @ts-ignore
    typeof window !== "undefined" &&
    // @ts-ignore
    window?.location?.href.startsWith("safari-web-extension://")
  );
}
