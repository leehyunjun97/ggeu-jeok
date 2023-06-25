import React from 'react';
import styles from './style/login.module.css';

const Login = () => {
  return (
    <div className={styles.loginDiv}>
      <input placeholder='이메일' type='email' className={styles.emailInput} />
      <input
        placeholder='비밀번호'
        type='password'
        className={styles.passwordInput}
      />
      <button>로그인</button>
    </div>
  );
};

export default Login;
