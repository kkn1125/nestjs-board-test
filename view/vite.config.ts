import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import dotenv from 'dotenv';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  const MODE = process.env.NODE_ENV;
  dotenv.config({
    path: path.join(path.resolve(), '.env'),
  });
  dotenv.config({
    path: path.join(path.resolve(), `.env.${MODE}`),
  });
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      host: process.env.HOST,
      port: +process.env.PORT || 8000,
    },
    build: {
      outDir: 'build',
      minify: 'terser',
      cssMinify: true,
      terserOptions: {
        keep_classnames: true,
      },
    },
    resolve: {
      alias: [{ find: '@', replacement: path.join(path.resolve(), 'src/') }],
    },
    plugins: [react()],
  };
});
