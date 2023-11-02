import { AUTH_DATA_ACTION, AuthDispatchContext } from '@/context/auth.provider';
import { apiAxios } from '@/util/instances';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, FormEvent, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const authDispatch = useContext(AuthDispatchContext);

  const passRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget;
    const formData = new FormData(target);

    const data = Object.fromEntries(formData.entries());

    try {
      const response = await apiAxios.post('/auth/signin', data);
      if (response.status === 200) {
        // console.log('✨ success!', response.data.data);
        authDispatch({
          type: AUTH_DATA_ACTION.SIGNIN,
          auth: {
            token: response.data.data.access_token,
            refresh: response.data.data.refresh_token,
          },
        });
        authDispatch({
          type: AUTH_DATA_ACTION.SAVE,
        });
        authDispatch({
          type: AUTH_DATA_ACTION.UPDATE_VER,
        });

        navigate('/');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log('❌ fail!', error.response);
      if (error.response.status === 400) {
        if (error.response.data.detail === undefined) {
          alert('로그인 시도 가능 횟수가 초과되었습니다.');
        } else {
          alert(
            `이메일 또는 비밀번호를 확인해주세요.\n남은 로그인 시도 횟수: ${error.response.data.detail}`,
          );
        }
      } else if (error.response.status === 401) {
        alert('이메일 또는 비밀번호를 입력해주세요.');
      } else if (error.response.status === 404) {
        alert('없는 사용자 이메일입니다.');
        target.reset();
      }
      if (passRef.current) {
        passRef.current.value = '';
      }
    }

    return false;
  };

  const handleRedirect = (path: string) => navigate(path);

  return (
    <Stack component="form" gap={1} flex={1} onSubmit={handleSubmit}>
      <Typography fontWeight={700} fontSize={24} textAlign="center">
        Sign In
      </Typography>
      <TextField
        size="small"
        name="email"
        label="Email"
        autoComplete="username"
      />
      <TextField
        size="small"
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        inputRef={passRef}
      />
      <Button variant="contained" color="success" type="submit">
        Sign in
      </Button>
      <Button
        variant="contained"
        type="button"
        color="primary"
        onClick={() => handleRedirect('/auth/signup')}
      >
        Sign up
      </Button>
    </Stack>
  );
}

export default Signin;
