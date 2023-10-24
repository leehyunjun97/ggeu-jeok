import styles from './styles/profileSection.module.css';
import { IUserInfo } from '../../../../types/user';
import { IFriendInfo } from '../../../../types/friend';

interface IProfileProps {
  info?: IUserInfo | IFriendInfo;
}

const ProfileSection = ({ info }: IProfileProps) => {
  return (
    <section className={styles.profileSection}>
      <section className={styles.imgSection}>
        <img className={styles.profileImg} src={info?.image} alt='profile' />
      </section>
      <section className={styles.infoSection}>
        <h1 className={styles.nickName}>{info?.nickName}</h1>
        <div className={styles.emailNameDiv}>
          <span className={styles.email}>{info?.email}</span>
          <span className={styles.name}>{info?.name}</span>
        </div>
      </section>
    </section>
  );
};

export default ProfileSection;
