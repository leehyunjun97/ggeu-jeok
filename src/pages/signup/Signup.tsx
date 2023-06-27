import React from 'react';
import styles from './style/signup.module.css';

const Signup = () => {
  return (
    <div className={styles.main}>
      <span className={styles.signupTitleSpan}>SignUp</span>
      <div className={styles.loginDiv}>
        <section className={styles.emailSection}>
          <input
            placeholder='이메일'
            type='email'
            className={styles.emailInput}
          />
          <button className={styles.emailCheckBtn}>중복확인</button>
        </section>

        <input
          placeholder='비밀번호'
          type='password'
          className={styles.passwordInput}
        />
        <button className={styles.loginBtn}>로그인</button>
      </div>
    </div>
  );
};

export default Signup;
