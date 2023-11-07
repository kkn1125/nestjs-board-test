import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.scss';
import ApiDataProvider from './context/api-data.provider.tsx';
import ApiProvider from './context/auth.provider.tsx';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ApiProvider>
      <ApiDataProvider>
        <App />
      </ApiDataProvider>
    </ApiProvider>
  </BrowserRouter>,
);

{
  /* <React.StrictMode></React.StrictMode>; */
}
