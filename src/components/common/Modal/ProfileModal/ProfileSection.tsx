import styles from './styles/profileSection.module.css';
import { IUserInfo } from '../../../../types/user';
import { IFriendInfo } from '../../../../types/friend';
import { useEffect, useRef, useState } from 'react';
import Input from '../../Input/Input';
import { imgFileHandler } from '../../../../utils/common/imageUpload';
import { imgUpdateApi } from '../../../../services/user/user';
import { useSetRecoilState } from 'recoil';
import { userInfo } from '../../../../recoil/user/user';

interface IProfileProps {
  info?: IUserInfo | IFriendInfo;
  my?: boolean;
}

const ProfileSection = ({ info, my }: IProfileProps) => {
  const [img, setImg] = useState<File | null>(null);
  const [imgSrc, setimgSrc] = useState<string | null>(null);
  const setInfo = useSetRecoilState(userInfo);

  const imgRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    imgRef?.current?.click();
  };

  useEffect(() => {
    if (imgSrc === '') return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setimgSrc(reader.result as string);
    };

    if (img) {
      reader.readAsDataURL(img);
      setimgSrc(imgSrc);
    }
  }, [img, imgSrc]);

  const imgUpdateHandler = async () => {
    try {
      const uuid = (info as IUserInfo).uuid;
      const putCom = await imgUpdateApi(uuid, imgSrc!);
      if (putCom.status === 200) {
        alert('수정성공');
        setInfo((prev) => ({ ...prev, image: imgSrc! }));
        setimgSrc('');
      }
    } catch (error) {
      alert('이미지 업로드 에러!');
    }
  };

  const updateCancelHandler = () => {
    setimgSrc('');
  };

  return (
    <section className={styles.profileSection}>
      <section className={styles.imgSection}>
        {my ? (
          <>
            <img
              className={styles.myProfileImg}
              src={imgSrc || info?.image}
              alt='profile'
              onClick={handleClick}
            />
            <Input
              style={{ display: 'none' }}
              inputRef={imgRef}
              type='file'
              accept='image/*'
              onChange={(e) => {
                imgFileHandler(e, setImg);
                setimgSrc('change');
              }}
            />
          </>
        ) : (
          <img className={styles.profileImg} src={info?.image} alt='profile' />
        )}
      </section>
      <section className={styles.infoSection}>
        <h1 className={styles.nickName}>{info?.nickName}</h1>
        <div className={styles.emailNameDiv}>
          <span className={styles.email}>{info?.email}</span>
          <span className={styles.name}>{info?.name}</span>
        </div>
      </section>
      {imgSrc && (
        <>
          <button className={styles.updateBtn} onClick={imgUpdateHandler}>
            정보수정
          </button>
          <button
            className={styles.updateCancelBtn}
            onClick={updateCancelHandler}
          >
            수정취소
          </button>
        </>
      )}
    </section>
  );
};

export default ProfileSection;
