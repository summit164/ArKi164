import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { App } from './app/ui/App'
import { store } from './model/store'
import { initTelegramSettings } from './shared/utils/initTelegramSettings'
import ErrorBoundary from './features/ErrorBoundary/ErrorBoundary'
import { initSentry } from './shared/utils/initSentry'
import { initSupabase } from './shared/utils/initSupabase'

initSentry()
initTelegramSettings()

export const supabase = initSupabase()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </BrowserRouter>
)
