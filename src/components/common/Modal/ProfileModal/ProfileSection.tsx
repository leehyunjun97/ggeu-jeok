import styles from './styles/profileSection.module.css';
import { IUserInfo } from '../../../../types/user';
import { IFriendInfo } from '../../../../types/friend';
import { useEffect, useState } from 'react';
import { imgUpdateApi } from '../../../../services/user/user';
import { useSetRecoilState } from 'recoil';
import { userInfo } from '../../../../recoil/user/user';
import Button from '../../Button/Button';
import Toast from '../../Toast/Toast';
import Img from '../../Img/Img';
import FileUpload from '../../FileUpload/FileUpload';
interface IProfileProps {
  info?: IUserInfo | IFriendInfo;
  my?: boolean;
}

const ProfileSection = ({ info, my }: IProfileProps) => {
  const [img, setImg] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const setInfo = useSetRecoilState(userInfo);
  const [visible, setVisible] = useState(false);
  const [toastText, setToastText] = useState('');

  useEffect(() => {
    if (imgSrc === '') return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgSrc(reader.result as string);
    };

    if (!img) return;

    reader.readAsDataURL(img);
    setImgSrc(imgSrc);
  }, [img, imgSrc]);

  const imgUpdateHandler = async () => {
    try {
      const uuid = (info as IUserInfo).uuid;
      const putCom = await imgUpdateApi(uuid, imgSrc!);
      if (putCom.status === 200) {
        setVisible(!visible);
        setToastText('수정 성공!');
        setInfo((prev) => ({ ...prev, image: imgSrc! }));
        setImgSrc('');
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
            <FileUpload
              src={imgSrc || info?.image}
              imgClassName={'myProfileImg'}
              setImg={setImg}
              setImgSrc={setImgSrc}
            />
          </>
        ) : (
          <Img src={info?.image} />
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
          <Button.ActiveButton onClick={imgUpdateHandler} text={'수정하기'} />
          <Button.ActiveButton
            onClick={() => setImgSrc('')}
            text={'수정취소'}
            isActive='cancel'
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
