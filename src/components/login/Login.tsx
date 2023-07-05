import React, { useState } from 'react';
import styles from './style/login.module.css';
import { useNavigate } from 'react-router-dom';
import { getUsersApi } from '../../services/user/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';

const Login = () => {
  const [loginInputState, setLoginInputState] = useState({
    email: '',
    password: '',
  });
  const [loginCheck, setLoginCheck] = useState(false);
  const setUser = useSetRecoilState(userInfo);

  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const userList = await getUsersApi();
      const findUser = userList.find(
        (item: any) =>
          item.email === loginInputState.email &&
          item.password === loginInputState.password
      );

      if (findUser) {
        setLoginCheck(false);

        localStorage.setItem('id', findUser.email);
        setUser({ ...findUser });
        navigate('/main');
      } else {
        setLoginCheck(true);
      }
    } catch (error) {
      console.log('아이디 비번 확인');
    }
  };

  const errorMessageDivHandler = (bool: boolean) => {
    if (!bool) {
      return { display: 'none' };
    } else {
      return { display: 'block' };
    }
  };

  return (
    <div
      className={styles.loginDiv}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          loginHandler();
        }
      }}
    >
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
      <button className={styles.loginBtn} onClick={loginHandler}>
        로그인
      </button>
      <div
        className={styles.errorMessageDiv}
        style={errorMessageDivHandler(loginCheck)}
      >
        <span>
          아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시
          확인해주세요.
        </span>
      </div>
    </div>
  );
};

export default Login;
