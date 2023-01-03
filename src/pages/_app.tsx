import type { AppProps } from 'next/app';
import { createContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Skill } from '@/domain/models';

import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/presentation/mui-utils/theme';
import { ThemeProvider } from '@mui/material';

import createEmotionCache from '@/presentation/mui-utils/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';

const clientSideEmotionCache = createEmotionCache();

interface StoreInterface {
  skills: Skill[];
}

function useStoreData() {
  const store = useState<StoreInterface>({
    skills: [],
  });
  return store;
}

type useStoreDataType = ReturnType<typeof useStoreData>;

export const CourseContext = createContext<useStoreDataType | null>(null);

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const store = useState<StoreInterface>({
    skills: [],
  });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CourseContext.Provider value={store}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </CourseContext.Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
