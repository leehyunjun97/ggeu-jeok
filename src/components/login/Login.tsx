import React, { useState } from 'react';
import styles from './style/login.module.css';
import { useNavigate } from 'react-router-dom';
import { getUsersApi } from '../../services/user/user';

const Login = () => {
  const [loginInputState, setLoginInputState] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const loginHandler = () => {};

  const getUsers = async () => {
    const userList = await getUsersApi();
    console.log(userList);
  };

  return (
    <div className={styles.loginDiv}>
      <input
        placeholder='이메일'
        type='email'
        className={styles.emailInput}
        value={loginInputState.email}
        onChange={(e) => {
          setLoginInputState((prev) => ({ ...prev, email: e.target.value }));
        }}
      />
      <input
        placeholder='비밀번호'
        type='password'
        className={styles.passwordInput}
        value={loginInputState.password}
        onChange={(e) => {
          setLoginInputState((prev) => ({ ...prev, password: e.target.value }));
        }}
      />
      <span className={styles.signupSpan} onClick={() => navigate('/signup')}>
        회원가입
      </span>
      <button className={styles.loginBtn} onClick={getUsers}>
        로그인
      </button>
    </div>
  );
};

export default Login;
