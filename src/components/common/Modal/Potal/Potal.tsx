import { createPortal } from 'react-dom';

const Potal = ({ children }: any) => {
  return createPortal(
    children,
    document.getElementById('modal') as HTMLElement
  );
};

export default Potal;
