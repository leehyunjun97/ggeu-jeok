import React from 'react';
import styles from './style/img.module.css';
import { onErrorImg } from '../../../constants/images/defaultImg';

interface IImgProps {
  className?: string;
  src: string;
  alt?: string;
  onClick?: () => void;
}

const Img = ({ className, src, alt = '', onClick }: IImgProps) => {
  return (
    <img
      alt={alt}
      className={`${styles.basicImg} ${styles[`${className}`]}`}
      src={src}
      onClick={onClick}
      onError={onErrorImg}
    />
  );
};

export default Img;
