import React, { useState, useEffect } from 'react';
import styles from './style/signup.module.css';
import { postEmailCheckApi } from '../../services/user/user';
import Toast from '../../components/common/Toast/Toast';

const Signup = () => {
  const [signUpInputState, setSignUpInputState] = useState({
    email: '',
    password: '',
    name: '',
    nickName: '',
  });

  const [emailCheck, setEmailCheck] = useState({
    text: '사용 가능한 이메일 입니다',
    bool: true,
  });
  const [emailTypeCheck, setEmailTypeCheck] = useState({
    text: '',
    bool: true,
  });
  const [passwordCheck, setPasswordCheck] = useState({ text: '', bool: true });

  useEffect(() => {
    if (!emailCheck.bool) {
      const timer = setTimeout(() => {
        setEmailCheck({ ...emailCheck, bool: true });
      }, 1300);
      return () => clearTimeout(timer);
    }
  }, [emailCheck]);

  const changeInputHandler = (value: string, key: string) => {
    setSignUpInputState((prev) => ({ ...prev, [key]: value }));
  };

  const checkEmail = async () => {
    const isEmail = await postEmailCheckApi(signUpInputState.email);
    if (!isEmail) {
      setEmailCheck({ bool: false, text: '사용 가능한 이메일 입니다' });
    }
  };

  const checkEmailType = (e: any) => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i;
    const isRegExp = regExp.test(e.target.value);

    if (!isRegExp) {
      console.log('이메일 유효성 불합격 :: ', regExp.test(e.target.value));
      setEmailTypeCheck({
        text: '- 이메일 형식을 확인해주세요',
        bool: isRegExp,
      });
    } else {
      console.log('이메일 유효성 합격 :: ', regExp.test(e.target.value));
      setEmailTypeCheck({ text: '형식 확인 완료', bool: isRegExp });
    }
  };

  const checkPassword = (e: any) => {
    if (e.target.value.trim().length < 6) {
      setPasswordCheck({
        text: '- 패스워드는 6자 이상 입력해주세요',
        bool: false,
      });
    } else {
      setPasswordCheck({
        text: '- 형식 합격',
        bool: true,
      });
    }
  };

  const errorMessageDivHandler = (bool: boolean) => {
    if (bool) {
      return { display: 'none' };
    } else {
      return { display: 'block' };
    }
  };

  return (
    <div className={styles.main}>
      {!emailCheck.bool && <Toast text={emailCheck.text} />}
      <span className={styles.signupTitleSpan}>SignUp</span>
      <div className={styles.loginDiv}>
        <section className={styles.emailSection}>
          <input
            placeholder='이메일'
            type='email'
            className={styles.emailInput}
            onBlur={checkEmailType}
            value={signUpInputState.email}
            onChange={(e) => changeInputHandler(e.target.value, 'email')}
          />
          <button className={styles.emailCheckBtn} onClick={checkEmail}>
            중복확인
          </button>
        </section>

        <input
          placeholder='비밀번호'
          type='password'
          className={styles.passwordInput}
          onBlur={checkPassword}
        />

        <div
          className={styles.errorMessageDiv}
          style={errorMessageDivHandler(emailTypeCheck.bool)}
        >
          <span>{emailTypeCheck.text}</span>
        </div>
        <div
          className={styles.errorMessageDiv}
          style={errorMessageDivHandler(passwordCheck.bool)}
        >
          <span>{passwordCheck.text}</span>
        </div>

        <input
          placeholder='닉네임'
          type='text'
          className={styles.passwordInput}
        />

        <input
          placeholder='이름'
          type='text'
          className={styles.passwordInput}
        />

        <button className={styles.signUpBtn}>회원가입</button>
      </div>
    </div>
  );
};

export default Signup;
