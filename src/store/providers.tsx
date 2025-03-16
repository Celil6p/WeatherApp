'use client';

import { Provider } from 'react-redux';
import { store } from './index';
import FavoritesHydration from '@/components/FavoritesHydration';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <FavoritesHydration />
      {children}
    </Provider>
  );
}