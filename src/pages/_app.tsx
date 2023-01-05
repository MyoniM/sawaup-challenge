import type { AppProps } from 'next/app';

import { useState } from 'react';
import Image from 'next/image';

import { QueryClient, QueryClientProvider } from 'react-query';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { ThemeProvider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';

import theme from '@/presentation/mui-utils/theme';
import createEmotionCache from '@/presentation/mui-utils/createEmotionCache';


const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AppBar
            position="fixed"
            elevation={0}
            style={{ backgroundColor: 'white', height: 60, paddingLeft: 15, display: 'flex', justifyContent: 'center' }}
          >
            <Image src="/logo.svg" alt="me" width="150" height="50" />
          </AppBar>
          <hr style={{ margin: '60px 0 0 0' }} />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
