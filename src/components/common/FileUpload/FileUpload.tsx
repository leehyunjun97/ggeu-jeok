import React, { useRef } from 'react';
import Img from '../Img/Img';
import Input from '../Input/Input';
import { imgFileHandler } from '../../../utils/common/imageUpload';

interface IFileUploadProps {
  src: string;
  imgClassName?: string;
  setImg: React.Dispatch<React.SetStateAction<File | null>>;
  setImgSrc: React.Dispatch<React.SetStateAction<string | null>>;
}

const FileUpload = ({
  src,
  imgClassName,
  setImg,
  setImgSrc,
}: IFileUploadProps) => {
  const imgRef = useRef<HTMLInputElement>(null);

  const refClickHandler = () => {
    imgRef?.current?.click();
  };
  return (
    <>
      <Img src={src} onClick={refClickHandler} className={imgClassName} />
      <Input
        style={{ display: 'none' }}
        inputRef={imgRef}
        type='file'
        accept='image/*'
        onChange={(e) => {
          imgFileHandler(e, setImg);
          setImgSrc('change');
        }}
      />
    </>
  );
};

export default FileUpload;
