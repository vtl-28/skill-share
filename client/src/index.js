import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import './index.css';
import './App.css';
import App from './App';
import TalkProvider from '../src/Context/TalkProvider';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThemeProvider } from 'react-ui'
import { tokens, components } from 'react-ui/themes/light'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TalkProvider>
          <ThemeProvider tokens={tokens} components={components}>
            <App />
          </ThemeProvider>
        </TalkProvider>
      </QueryClientProvider>
     
    </BrowserRouter>
  </React.StrictMode>
);
