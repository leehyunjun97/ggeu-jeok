import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../../scripts/firebase';

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
