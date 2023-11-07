import React, { useState, useEffect, useRef } from 'react';
import styles from './style/signup.module.css';
import { getLoginCheckApi } from '../../services/user/user';
import Toast from '../../components/common/Toast/Toast';
import { IUserInfo } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  isValidationCheck,
  isVisibleDisplay,
  isVisibleText,
} from '../../utils/common/isValidation';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import Label from '../../components/common/Label/Label';
import ErrorMessage from '../../components/common/Error/ErrorMessage';
import { postSignupApi } from '../../services/sign/sign';
import { initialSignUpInputState } from '../../constants/sign/sign';
import { imgFileHandler, imgUpload } from '../../utils/common/imageUpload';
import Span from '../../components/common/Span/Span';
import BackgroundLoading from '../../components/common/Loading/BackgroundLoading';

const Signup = () => {
  const [signUpInputState, setSignUpInputState] = useState<IUserInfo>(
    initialSignUpInputState
  );
  const [img, setImg] = useState<File | null>(null);
  const [imgSrc, setimgSrc] = useState<string | null>('');
  const [visible, setVisible] = useState(false);
  const [emailDisable, setEmailDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastText, setToastText] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleClick = () => {
    imgRef?.current?.click();
  };

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setimgSrc(reader.result as string);
    };

    if (img) {
      reader.readAsDataURL(img);
      changeInputHandler(imgSrc, 'image');
    }
  }, [img, imgSrc]);

  const signupHandler = () => {
    if (!emailDisable) {
      setToastText('이메일 중복체크를 해주세요');
      setVisible(!visible);
      return;
    }

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
      img
        ? imgUpload(`images/user/${signUpInputState.email}`, img, signup)
        : signup();
    }
  };

  const signup = async () => {
    try {
      setIsLoading(true);
      const signComplet = await postSignupApi({
        ...signUpInputState,
        id: uuidv4(),
      });

      localStorage.setItem('id', signComplet.data['name']);
      navigate('/main');
    } catch (error) {
      alert('회원가입 오류');
    } finally {
      setIsLoading(false);
    }
  };

  const changeInputHandler = (value: string | null, key: string) => {
    setSignUpInputState((prev) => ({ ...prev, [key]: value }));
  };

  const checkEmail = async () => {
    if (!isValidationCheck(signUpInputState.email, 'email')) {
      setVisible(true);
      setToastText('이메일 형식을 확인해주세요');
      return;
    }

    const duplicate = await getLoginCheckApi(signUpInputState.email);

    if (Object.keys(duplicate)[0]) {
      setVisible(true);
      setToastText('중복된 이메일 입니다');
      return;
    }

    setVisible(true);
    setEmailDisable(true);
    setToastText('사용 가능한 이메일 입니다');
  };

  return (
    <div className={styles.empty}>
      <Span.GoBackSpan
        text={'뒤로가기'}
        className={'backSpan'}
        style={{ top: '-25px', left: '5px' }}
      />
      <div className={styles.main}>
        <span className={styles.signupTitleSpan}>SignUp</span>
        <div className={styles.loginDiv}>
          <section className={styles.emailSection}>
            <Input
              placeholder='이메일'
              style={{ width: '75%' }}
              type='email'
              value={signUpInputState.email}
              onChange={(e) => {
                changeInputHandler(e.target.value, 'email');
                setEmailDisable(false);
              }}
              inputRef={emailRef}
            />
            <Button
              onClick={checkEmail}
              text={'중복확인'}
              className={'emailCheck'}
              disable={emailDisable}
              style={emailDisable ? { opacity: '0.5' } : { opacity: '1' }}
            />
          </section>

          <Input
            placeholder='비밀번호'
            type='password'
            value={signUpInputState.password}
            onChange={(e) => changeInputHandler(e.target.value, 'password')}
            inputRef={passwordRef}
          />

          <ErrorMessage
            style={isVisibleDisplay(signUpInputState.email, 'email')}
            text={isVisibleText(
              signUpInputState.email,
              'email',
              '- 이메일 형식을 확인해주세요'
            )}
          />
          <ErrorMessage
            style={isVisibleDisplay(signUpInputState.password, 'password')}
            text={isVisibleText(
              signUpInputState.password,
              'password',
              '- 패스워드는 6자 이상 입력해주세요'
            )}
          />

          <Input
            placeholder='닉네임'
            type='text'
            value={signUpInputState.nickName}
            onChange={(e) => changeInputHandler(e.target.value, 'nickName')}
            inputRef={nickNameRef}
          />

          <Input
            placeholder='이름'
            type='text'
            value={signUpInputState.name}
            onChange={(e) => changeInputHandler(e.target.value, 'name')}
            inputRef={nameRef}
          />
          <ErrorMessage
            style={isVisibleDisplay(signUpInputState.nickName, 'nickName')}
            text={isVisibleText(
              signUpInputState.nickName,
              'nickName',
              '- 닉네임은 3자 이상 입력해주세요'
            )}
          />
          <ErrorMessage
            style={isVisibleDisplay(signUpInputState.name, 'name')}
            text={isVisibleText(
              signUpInputState.name,
              'name',
              '- 이름을 입력해주세요'
            )}
          />

          <Label htmlFor={'file'} text={'사진첨부'} className={'photoUpload'} />

          <div className={styles.imgAttach} onClick={handleClick}>
            {!imgSrc ? (
              '+'
            ) : (
              <img
                className={styles.imgPriview}
                src={imgSrc as string}
                alt=''
              />
            )}
          </div>

          <Input
            style={{ display: 'none' }}
            inputRef={imgRef}
            type='file'
            accept='image/*'
            onChange={(e) => imgFileHandler(e, setImg)}
          />

          <Button
            onClick={signupHandler}
            text={'회원가입'}
            className={'signupBtn'}
            disable={isLoading}
          />
        </div>
      </div>
      {visible && (
        <Toast text={toastText} visible={visible} setVisible={setVisible} />
      )}
      {isLoading && <BackgroundLoading />}
    </div>
  );
};

export default Signup;
