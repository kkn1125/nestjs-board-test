import ImageBox from '@/components/common/ImageBox';
import { ApiDataContext, Board, User } from '@/context/api-data.provider';
import { AuthContext } from '@/context/auth.provider';
import { Box, Stack, Typography } from '@mui/material';
import {
  Component,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

function Home() {
  return (
    <Stack>
      <Typography
        fontWeight={700}
        fontSize={(theme) => theme.typography.pxToRem(32)}
      >
        Lorem ipsum dolor sit amet.
      </Typography>
      <ImageBox
        placeholder
        // hideSize
        width={'100%'}
        height={350}
      />
      <Typography
        fontWeight={700}
        fontSize={(theme) => theme.typography.pxToRem(32)}
      >
        Lorem, ipsum dolor.
      </Typography>
      <ImageBox
        placeholder
        // hideSize
        width={'100%'}
        height={350}
      />
    </Stack>
  );
}

export default Home;
