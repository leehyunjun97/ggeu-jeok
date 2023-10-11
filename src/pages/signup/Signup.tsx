import React, { useState, useEffect, useRef } from 'react';
import styles from './style/signup.module.css';
import { getUsersApi, postSignupApi } from '../../services/user/user';
import Toast from '../../components/common/Toast/Toast';
import { IUserInfo } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';
import { v4 as uuidv4 } from 'uuid';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../../scripts/firebase';
import { objTransArr } from '../../utils/common/objectTransformArray';
import {
  isValidationCheck,
  isVisibleDisplay,
  isVisibleText,
} from '../../utils/common/isValidation';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import Label from '../../components/common/Label/Label';
import ErrorMessage from '../../components/common/Error/ErrorMessage';

const Signup = () => {
  const [signUpInputState, setSignUpInputState] = useState<IUserInfo>({
    uuid: '',
    id: '',
    email: '',
    password: '',
    name: '',
    nickName: '',
    friend: [],
    alarm: [],
    alarmIndex: 0,
    image:
      'https://firebasestorage.googleapis.com/v0/b/montamp-be910.appspot.com/o/images%2Fdefault.png?alt=media&token=e67e268a-b4f5-498a-a68e-4cb5a38ebc2e&_gl=1*r2tf3r*_ga*MTY3Mjk4ODAwOC4xNjgzMjY3ODY3*_ga_CW55HF8NVT*MTY5NjE0NjcxNy42LjEuMTY5NjE0NzIyOS41OC4wLjA.',
  });
  const setUser = useSetRecoilState(userInfo);
  const [img, setImg] = useState<File | null>(null);
  const [imgSrc, setimgSrc] = useState<string | null>('');
  const [visible, setVisible] = useState(false);
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

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;

    if (target.files !== null) {
      const file = target.files[0];
      setImg(file);
    }
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
      if (img) {
        const imgRef = ref(storage, `images/user/${signUpInputState.email}`);
        await uploadBytes(imgRef, img).then(() => {
          const uploadTask = uploadBytesResumable(imgRef, img);
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            const signComplet = await postSignupApi({
              ...signUpInputState,
              id: uuidv4(),
            });

            localStorage.setItem('id', signComplet.data['name']);
            navigate('/main');
          });
        });
      } else {
        const signComplet = await postSignupApi({
          ...signUpInputState,
          id: uuidv4(),
        });

        localStorage.setItem('id', signComplet.data['name']);
        navigate('/main');
      }
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

    // const data = await postEmailCheckApi(signUpInputState.email);
    const data = await getUsersApi();
    const isEmail = objTransArr(data).find(
      (item: any) => item.email === signUpInputState.email
    );

    if (isEmail) {
      setVisible(true);
      setToastText('중복된 이메일 입니다');
      return;
    }

    setVisible(true);
    setToastText('사용 가능한 이메일 입니다');
  };

  return (
    <>
      <div className={styles.main}>
        <span className={styles.signupTitleSpan}>SignUp</span>
        <div className={styles.loginDiv}>
          <section className={styles.emailSection}>
            <Input
              placeholder='이메일'
              style={{ width: '75%' }}
              type='email'
              value={signUpInputState.email}
              onChange={(e) => changeInputHandler(e.target.value, 'email')}
              inputRef={emailRef}
            />
            <Button
              onClick={checkEmail}
              text={'중복확인'}
              className={'emailCheck'}
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
            onChange={fileHandler}
          />
          {/* <button onClick={deleteImage}>사진삭제</button> */}

          <Button
            onClick={signupHandler}
            text={'회원가입'}
            className={'signupBtn'}
          />
        </div>
      </div>
      {visible && (
        <Toast text={toastText} visible={visible} setVisible={setVisible} />
      )}
    </>
  );
};

export default Signup;
