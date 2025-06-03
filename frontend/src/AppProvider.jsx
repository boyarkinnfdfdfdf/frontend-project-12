import { Provider } from 'react-redux'
import store from './store/store.js'
import { AuthProvider } from './AuthContext.jsx'

const AppProvider = ({ children }) => (
  <Provider store={store}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </Provider>
)

export default AppProvider
