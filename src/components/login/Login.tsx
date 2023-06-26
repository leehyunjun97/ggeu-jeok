import React from 'react';
import styles from './style/login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const loginHandler = () => {
    localStorage.setItem('id', 'dummy');
    navigate('/main');
  };

  return (
    <div className={styles.loginDiv}>
      <input placeholder='이메일' type='email' className={styles.emailInput} />
      <input
        placeholder='비밀번호'
        type='password'
        className={styles.passwordInput}
      />
      <button className={styles.loginBtn} onClick={loginHandler}>
        로그인
      </button>
    </div>
  );
};

export default Login;
