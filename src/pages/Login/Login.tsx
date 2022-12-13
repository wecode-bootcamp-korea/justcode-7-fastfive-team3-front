import React, { useEffect, useState } from 'react';
import css from './Login.module.scss';

const Login = () => {
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
    fetch('http://localhost:8000/login', {
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
        if (json.token) {
          localStorage.setItem('token', json.token);
          window.location.href = '/';
        } else {
          alert('입력한 정보를 다시 확인해주세요.');
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
          disabled={isEmailWrong}
          className={`${isEmailWrong && password !== '' ? css.on : css.off}`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
