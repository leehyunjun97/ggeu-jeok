import React, { useEffect, useState } from 'react';
import styles from './styles/profileSection.module.css';
import { IUserInfo } from '../../../../types/user';
import { IFriendInfo } from '../../../../types/friend';

interface IProfileProps {
  myinfo?: IUserInfo;
  friendInfo?: IFriendInfo;
}

const ProfileSection = ({ myinfo, friendInfo }: IProfileProps) => {
  return (
    <section className={styles.profileSection}>
      <section className={styles.imgSection}>
        <img
          className={styles.profileImg}
          src={myinfo?.image ?? friendInfo?.image}
          alt='profile'
        />
      </section>
      <section className={styles.infoSection}>
        <h1 className={styles.nickName}>
          {myinfo?.nickName ?? friendInfo?.nickName}
        </h1>
        <div className={styles.emailNameDiv}>
          <span className={styles.email}>
            {myinfo?.email ?? friendInfo?.email}
          </span>
          <span className={styles.name}>
            {myinfo?.name ?? friendInfo?.name}
          </span>
        </div>
      </section>
    </section>
  );
};

export default ProfileSection;
