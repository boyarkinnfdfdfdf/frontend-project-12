import Header from '../components/Header.jsx'
import Channels from '../components/Channels.jsx'
import Messages from '../components/Messages.jsx'
import ModalFacade from '../modals/ModalFacade.jsx'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks'

const ChatPage = () => {
  const { user } = useAuth()
  return (
    <div className="d-flex flex-column h-100">
      <Header />

      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Messages token={user?.token} username={user?.username} />
        </div>
      </div>

      <ModalFacade />
    </div>
  )
}

export default ChatPage
