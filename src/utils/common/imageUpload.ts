import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../../scripts/databaseFirebase';

export const imgUpload = async (
  storageUrl: string,
  img: File,
  uploadfunc: (url: string) => void
) => {
  const imgRef = ref(storage, storageUrl);
  await uploadBytes(imgRef, img).then(() => {
    const uploadTask = uploadBytesResumable(imgRef, img);
    getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
      uploadfunc(url);
    });
  });
};

export const imgFileHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImg: React.Dispatch<React.SetStateAction<File | null>>
) => {
  const files = e.currentTarget.files;

  if (files !== null) {
    const file = files[0];
    setImg(file);
  }
};
