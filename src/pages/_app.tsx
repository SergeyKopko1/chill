import { FC } from 'react';
import { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
// import { Provider } from 'react-redux';
import Router from 'next/router';
import NProgress from 'nprogress';
import AppTheme from '@/lib/theme';
// import store from '@/store';

import '../App.scss';
import '@/lib/nprogress/nprogress.scss';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppTheme>
      <Component {...pageProps} />
    </AppTheme>
  );
};

export default MyApp;
