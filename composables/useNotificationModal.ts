export const useNotificationModal = () =>
  useState<boolean>("notification", () => false);
