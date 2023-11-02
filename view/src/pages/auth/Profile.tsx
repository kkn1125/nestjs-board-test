import {
  AUTH_DATA_ACTION,
  AuthContext,
  AuthDispatchContext,
} from '@/context/auth.provider';
import { apiAxios } from '@/util/instances';
import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const authDispatch = useContext(AuthDispatchContext);

  // const getProfile = async () => {
  //   if (auth.auth.token) {
  //     const { data } = await apiAxios.get('/auth/profile', {
  //       headers: {
  //         Authorization: `Bearer ${auth.auth.token}`,
  //       },
  //     });
  //     console.log(data.data);
  //   }
  // };

  // useEffect(() => {
  //   getProfile();
  // }, [auth.auth.token]);

  const handleSignout = async () => {
    const response = await apiAxios.post(
      '/auth/signout',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + auth.auth.token,
        },
      },
    );

    if (response.status === 200) {
      navigate('/auth/signin');
      authDispatch({
        type: AUTH_DATA_ACTION.SIGNOUT,
      });
    }
  };

  return (
    <div>
      <Button color="error" variant="contained" onClick={handleSignout}>
        Sign out
      </Button>
      <pre>{JSON.stringify(auth.user, null, 2)}</pre>
    </div>
  );
}

export default Profile;
