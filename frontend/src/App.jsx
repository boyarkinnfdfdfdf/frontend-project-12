import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ChatPage from './pages/ChatPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Page404 from './pages/Page404.jsx'
import SignupPage from './pages/SignupPage.jsx'
import routes from './services/clientRoutes.js'
import AppProvider from './AppProvider.jsx'

const App = ({ socket }) => (
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path={routes.notFound} element={<Page404 />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.signup} element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={routes.root} element={<ChatPage socket={socket} />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </AppProvider>
)

export default App
