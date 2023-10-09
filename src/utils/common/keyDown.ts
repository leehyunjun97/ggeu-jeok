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
