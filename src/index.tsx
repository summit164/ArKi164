import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { App } from './app/ui/App'
import { store } from './model/store'
import { initTelegramSettings } from './shared/utils/initTelegramSettings'
import ErrorBoundary from './features/ErrorBoundary/ErrorBoundary'
import { initSentry } from './shared/utils/initSentry'
import { initSupabase } from './shared/utils/initSupabase'
import { SentryErrorBoundary } from './features/SentryErrorBoundary/SentryErrorBoundary'

initSentry()
initTelegramSettings()

export const supabase = initSupabase()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <SentryErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </SentryErrorBoundary>
    </ErrorBoundary>
  </BrowserRouter>
)
