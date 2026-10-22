// Fire-and-forget toasts for the site's little easter eggs; <Toaster> renders them
export const TOAST_EVENT = "site-toast";

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}
