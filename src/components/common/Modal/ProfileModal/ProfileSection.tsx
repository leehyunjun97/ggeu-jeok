import styles from './styles/profileSection.module.css';
import { IUserInfo } from '../../../../types/user';
import { IFriendInfo } from '../../../../types/friend';
import { useEffect, useRef, useState } from 'react';
import Input from '../../Input/Input';
import { imgFileHandler } from '../../../../utils/common/imageUpload';
import { imgUpdateApi } from '../../../../services/user/user';
import { useSetRecoilState } from 'recoil';
import { userInfo } from '../../../../recoil/user/user';
import Button from '../../Button/Button';
import Toast from '../../Toast/Toast';

interface IProfileProps {
  info?: IUserInfo | IFriendInfo;
  my?: boolean;
}

const ProfileSection = ({ info, my }: IProfileProps) => {
  const [img, setImg] = useState<File | null>(null);
  const [imgSrc, setimgSrc] = useState<string | null>(null);
  const setInfo = useSetRecoilState(userInfo);
  const [visible, setVisible] = useState(false);
  const [toastText, setToastText] = useState('');

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

    if (!img) return;

    reader.readAsDataURL(img);
    setimgSrc(imgSrc);
  }, [img, imgSrc]);

  const imgUpdateHandler = async () => {
    try {
      const uuid = (info as IUserInfo).uuid;
      const putCom = await imgUpdateApi(uuid, imgSrc!);
      if (putCom.status === 200) {
        setVisible(!visible);
        setToastText('수정 성공!');
        setInfo((prev) => ({ ...prev, image: imgSrc! }));
        setimgSrc('');
      }
    } catch (error) {
      alert('이미지 업로드 에러!');
    }
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
        <section className={styles.btnSection}>
          <Button.ReplyButton
            onClick={imgUpdateHandler}
            refusalOnClick={() => setimgSrc('')}
            type='profile'
          />
        </section>
      )}
      {visible && (
        <Toast text={toastText} visible={visible} setVisible={setVisible} />
      )}
    </section>
  );
};

export default ProfileSection;
