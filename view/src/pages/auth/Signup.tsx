import DateView from '@/components/auth/DateView';
import { apiAxios } from '@/util/instances';
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget;
    const formData = new FormData(target);

    const data = Object.fromEntries(formData.entries());

    if (value) {
      data['birth'] = value.toString();
    }

    try {
      const response = await apiAxios.post('/user', data);
      if (response.status === 201) {
        console.log('✨ success!');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log('❌ fail!', error.response.data.message);
    }

    return false;
  };

  const handleRedirect = (path: string) => navigate(path);

  return (
    <Stack component="form" gap={1} flex={1} onSubmit={handleSubmit}>
      <Typography fontWeight={700} fontSize={24} textAlign="center">
        Sign Up
      </Typography>
      <TextField
        size="small"
        name="username"
        label="Username"
        autoComplete="username"
      />
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
      />
      <TextField
        size="small"
        name="phone_number"
        label="Phone Number"
        autoComplete="username"
      />
      <DateView value={value} setValue={setValue} />

      <RadioGroup defaultValue="female" name="gender">
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>

      <Button variant="contained" color="success" type="submit">
        Sign up
      </Button>
      <Button
        variant="contained"
        type="button"
        color="primary"
        onClick={() => handleRedirect('/auth/signin')}
      >
        Sign in
      </Button>
    </Stack>
  );
}

export default Signup;
