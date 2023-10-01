import React, { useState, useEffect, useRef } from 'react';
import styles from './style/signup.module.css';
import { postEmailCheckApi, postSignupApi } from '../../services/user/user';
import Toast from '../../components/common/Toast/Toast';
import { IUserInfo } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';

const Signup = () => {
  const [signUpInputState, setSignUpInputState] = useState<IUserInfo>({
    email: '',
    password: '',
    name: '',
    nickName: '',
    friend: [],
    image: '',
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
  const [nickNameCheck, setNickNameCheck] = useState({ text: '', bool: true });
  const [nameCheck, setNameCheck] = useState({ text: '', bool: true });

  const setUser = useSetRecoilState(userInfo);

  const [img, setImg] = useState<File | null>(null);
  const [imgSrc, setimgSrc] = useState<string | null>('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!emailCheck.bool) {
      const timer = setTimeout(() => {
        setEmailCheck({ ...emailCheck, bool: true });
      }, 1300);
      return () => clearTimeout(timer);
    }
  }, [emailCheck]);

  const handleClick = () => {
    imgRef?.current?.click();
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;

    if (target.files !== null) {
      const file = target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setimgSrc(reader.result as string);
      };

      reader.readAsDataURL(file);

      console.log(imgSrc);
    }
  };

  const signupHandler = async () => {
    if (signUpInputState.email.trim() === '') {
      emailRef.current?.focus();
      return;
    } else if (signUpInputState.password.trim().length < 6) {
      passwordRef.current?.focus();
    } else if (signUpInputState.nickName.trim().length < 3) {
      nickNameRef.current?.focus();
    } else if (signUpInputState.name.trim().length < 2) {
      nameRef.current?.focus();
    } else {
      const signComplet = await postSignupApi(signUpInputState);
      localStorage.setItem('id', signUpInputState.email);
      setUser({ ...signComplet.data });
      alert(`${signUpInputState.name}님 반갑습니다!`);
      navigate('/main');
    }
  };

  const changeInputHandler = (value: string, key: string) => {
    setSignUpInputState((prev) => ({ ...prev, [key]: value }));
  };

  const checkEmail = async () => {
    const isEmail = await postEmailCheckApi(signUpInputState.email);
    if (!emailTypeCheck.bool) {
      setEmailCheck({
        bool: false,
        text: '이메일 형식을 확인해주세요',
      });
    } else if (emailTypeCheck.bool && !isEmail) {
      setEmailCheck({
        bool: false,
        text: '사용 가능한 이메일 입니다',
      });
    } else if (isEmail) {
      setEmailCheck({
        bool: false,
        text: '중복된 이메일 입니다',
      });
    }
  };

  const checkEmailType = (e: any) => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i;
    const isRegExp = regExp.test(e.target.value);

    if (!isRegExp) {
      setEmailTypeCheck({
        text: '- 이메일 형식을 확인해주세요',
        bool: isRegExp,
      });
    } else {
      setEmailTypeCheck({ text: '형식 확인 완료', bool: isRegExp });
    }
  };

  // 나중에 물어볼거 (어떻게 재사용하는지)
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

  const checkNick = (e: any) => {
    if (e.target.value.trim().length < 3) {
      setNickNameCheck({
        text: '- 닉네임은 3자 이상 입력해주세요',
        bool: false,
      });
    } else {
      setNickNameCheck({
        text: '- 형식 합격',
        bool: true,
      });
    }
  };

  const checkName = (e: any) => {
    if (e.target.value.trim().length < 2) {
      setNameCheck({
        text: '- 이름을 입력해주세요',
        bool: false,
      });
    } else {
      setNameCheck({
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
            ref={emailRef}
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
          value={signUpInputState.password}
          onChange={(e) => changeInputHandler(e.target.value, 'password')}
          ref={passwordRef}
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
          onBlur={checkNick}
          value={signUpInputState.nickName}
          onChange={(e) => changeInputHandler(e.target.value, 'nickName')}
          ref={nickNameRef}
        />

        <input
          placeholder='이름'
          type='text'
          className={styles.passwordInput}
          onBlur={checkName}
          value={signUpInputState.name}
          onChange={(e) => changeInputHandler(e.target.value, 'name')}
          ref={nameRef}
        />

        <label htmlFor='file' className={styles.imgAttachLabel}>
          사진첨부
        </label>
        <div className={styles.imgAttach} onClick={handleClick}>
          {!imgSrc ? (
            '+'
          ) : (
            <img className={styles.imgPriview} src={imgSrc as string} alt='' />
          )}
        </div>

        <input
          style={{ display: 'none' }}
          ref={imgRef}
          type='file'
          accept='image/*'
          onChange={fileHandler}
        />
        {/* <button onClick={deleteImage}>사진삭제</button> */}

        <div
          className={styles.errorMessageDiv}
          style={errorMessageDivHandler(nickNameCheck.bool)}
        >
          <span>{nickNameCheck.text}</span>
        </div>
        <div
          className={styles.errorMessageDiv}
          style={errorMessageDivHandler(nameCheck.bool)}
        >
          <span>{nameCheck.text}</span>
        </div>

        <button className={styles.signUpBtn} onClick={signupHandler}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Signup;
