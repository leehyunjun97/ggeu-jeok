import React, { useState } from 'react';
import styles from './style/login.module.css';
import { useNavigate } from 'react-router-dom';
import { getLoginCheckApi } from '../../services/user/user';
import { useSetRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';
import { IUserInfo } from '../../types/user';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import ErrorMessage from '../common/Error/ErrorMessage';
import { enterKeyDownHandler } from '../../utils/common/keyDown';
import BackgroundLoading from '../common/Loading/BackgroundLoading';

const Login = () => {
  const [loginInputState, setLoginInputState] = useState({
    email: '',
    password: '',
  });
  const [loginCheck, setLoginCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useSetRecoilState(userInfo);
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      setIsLoading(true);
      const findUser = await getLoginCheckApi(loginInputState.email);

      if (Object.keys(findUser).length === 0) {
        setLoginCheck(true);
        return;
      }

      const dataid = Object.keys(findUser)[0];
      const myInfo: IUserInfo = findUser[dataid];

      if (myInfo.password !== loginInputState.password) {
        setLoginCheck(true);
        return;
      }

      myInfo.uuid = dataid;

      localStorage.setItem('id', dataid);
      setUser(myInfo);
      navigate('/main');
    } catch (error) {
      alert('로그인 에러');
    } finally {
      setIsLoading(false);
    }
  };

  const errorMessageDivHandler = (bool: boolean) => {
    return !bool ? 'displayNone' : 'displayBlock';
  };

  return (
    <div
      className={styles.loginDiv}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
        enterKeyDownHandler(e, loginHandler)
      }
    >
      <Input
        placeholder='이메일'
        type='email'
        value={loginInputState.email}
        onChange={(e) => {
          setLoginInputState((prev) => ({ ...prev, email: e.target.value }));
        }}
      />
      <Input
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
      <Button
        text={'로그인'}
        className={'loginBtn'}
        onClick={loginHandler}
        disable={isLoading}
      />

      <ErrorMessage
        style={errorMessageDivHandler(loginCheck)}
        className={'login'}
        text='- 아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시
        확인해주세요.'
      />

      {isLoading && <BackgroundLoading />}
    </div>
  );
};

export default Login;
