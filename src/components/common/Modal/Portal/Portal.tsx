import { createPortal } from 'react-dom';

interface IPortalProps {
  children: React.ReactNode;
  id: string;
}

const Portal = ({ children, id }: IPortalProps) => {
  return createPortal(children, document.getElementById(id) as HTMLElement);
};

export default Portal;
