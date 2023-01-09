import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
    },
  },
});
export type GlobalContent = {
  refreshNumber: number;
  setRefreshNumber: (refreshNumber: number) => void;
}
export const MyGlobalContext = createContext<GlobalContent>({
  refreshNumber: 0,
  setRefreshNumber: () => { },
});

function App() {
  const [refreshNumber, setRefreshNumber] = useState(0);
  return (
    <MyGlobalContext.Provider value={{ refreshNumber, setRefreshNumber}}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MyGlobalContext.Provider>
   
  );
}

export default App;
