import React, { useState } from 'react';
import css from './Login.module.scss';

const Login = () => {
  const URI = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailWrong, setIsEmailWrong] = useState(false);
  const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneRegex = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/;

    if (!phoneRegex.test(e.target.value)) {
      setIsEmailWrong(false);
    } else {
      setIsEmailWrong(true);
    }
    setEmail(e.target.value);
  };
  const login = () => {
    fetch('http://' + URI + ':8000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.message) {
          alert('입력한 정보를 다시 확인해주세요.');
        } else if (json.token !== '') {
          localStorage.setItem('token', json.authInfo.token);
          localStorage.setItem('id', json.authInfo.id);
          localStorage.setItem('nickname', json.authInfo.nickname);
          localStorage.setItem('email', json.authInfo.email);
          localStorage.setItem('sort_id', json.authInfo.sort_id);
          localStorage.setItem('is_admin', json.authInfo.is_admin);
          window.location.href = '/';
        }
      });
  };

  return (
    <div className={css.loginContainer}>
      <div className={css.loginBox}>
        <h1>FASTFIVE Login</h1>
        <span>FASTFIVE에 오신 여러분을 환영합니다!</span>
        <input
          type="text"
          className={css.loginInput}
          placeholder="이메일"
          onChange={handleEmail}
        />
        {!isEmailWrong && email !== '' && (
          <p className={css.warning}>이메일 양식에 맞지 않습니다.</p>
        )}
        <input
          type="password"
          className={css.loginInput}
          placeholder="비밀번호"
          onChange={getPassword}
        />
        <button
          onClick={login}
          disabled={!isEmailWrong}
          className={`${isEmailWrong && password !== '' ? css.on : css.off}`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
