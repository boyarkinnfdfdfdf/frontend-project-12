import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../AuthContext.jsx'
import { selectCurrentChannelId } from '../store/currentChannelSlice.js'
import { selectCurrentChannel } from '../store/channelsSlice.js'
import { useGetMessagesQuery, useAddMessageMutation } from '../store/messagesApi'
import SendMessageForm from './SendMessageForm'


const Messages = () => {
  const { t } = useTranslation()
  const currentChannel = useSelector(selectCurrentChannel)
  const currentChannelId = useSelector(selectCurrentChannelId)
  const { token, user: username } = useAuth()

  const { data: messages = [], isLoading, error } = useGetMessagesQuery({ channelId: currentChannelId })
  const [sendMessage, { isLoading: isSending }] = useAddMessageMutation()

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {currentChannel?.name}
            </b>
          </p>
          <span className="text-muted">
            {t('chat.messagesCounter', { count: messages.length })}
          </span>
        </div>

        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {isLoading && <div>{t('chat.loading')}</div>}
          {error && <div className="text-danger">{t('chat.loadError')}</div>}
          {messages.map((msg) => (
            <div key={msg.id} className="text-break mb-2">
              <b>{msg.username || 'user'}</b>
              {': '}
              {msg.body}
            </div>
          ))}
        </div>

        <div className="mt-auto px-5 py-3">
          <SendMessageForm
            username={username}
            token={token}
            currentChannelId={currentChannelId}
            sendMessage={sendMessage}
            isSubmitting={isSending}
          />
        </div>
      </div>
    </div>
  )
}

export default Messages
