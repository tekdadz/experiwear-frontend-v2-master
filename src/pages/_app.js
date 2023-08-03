import React from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'components';
import {
  BANNER_IMAGE_PATH,
  TITLE,
  SITE_URL,
  DESCRIPTION,
} from 'utils/constants';
import { useGameSocket, useFanbandSocket } from 'hooks';

import theme from 'theme';
import { wrapper } from 'redux/store';
import 'normalize.css';

function CustomApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useGameSocket();
  useFanbandSocket();

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta charSet="utf-8" />
        <meta name="keywords" content="Keywords" />
        <meta name="description" content="Description" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content={theme.custom.palette.white} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={BANNER_IMAGE_PATH} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={SITE_URL} />
        <meta property="twitter:title" content={TITLE} />
        <meta property="twitter:description" content={DESCRIPTION} />
        <meta property="twitter:image" content={BANNER_IMAGE_PATH} />

        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta
          name="msapplication-TileColor"
          content={theme.custom.palette.orange}
        />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(CustomApp);
