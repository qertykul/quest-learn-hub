
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { ProgressProvider } from '@/context/ProgressContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <AuthProvider>
      <ThemeProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </ThemeProvider>
    </AuthProvider>
  </ErrorBoundary>
);
