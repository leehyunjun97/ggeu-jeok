import React from 'react';
import styles from './style/img.module.css';
import { onErrorImg } from '../../../constants/images/defaultImg';

interface IImgProps {
  className?: string;
  src?: string;
  alt?: string;
  clickFunc?: () => void;
}

const Img = ({ className, src, alt = '', clickFunc }: IImgProps) => {
  return (
    <img
      alt={alt}
      className={`${styles.basicImg} ${styles[`${className}`]}`}
      src={src}
      onClick={clickFunc}
      onError={onErrorImg}
    />
  );
};

export default Img;
