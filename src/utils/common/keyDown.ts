export const enterKeyDownHandler = (
  e: React.KeyboardEvent<HTMLInputElement>,
  handlerFunction: () => void
) => {
  e.key === 'Enter' && handlerFunction();
};

export const escapeKeyDownHandler = (
  e: React.KeyboardEvent<HTMLInputElement>,
  handlerFunction: () => void
) => {
  e.key === 'Escape' && handlerFunction();
};

export const shiftEnterKeyDownHandler = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  handlerFunction: () => void
) => {
  if (e.shiftKey) return;

  e.key === 'Enter' && handlerFunction();
  return;
};
