import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import leoProfanity from 'leo-profanity'

const Messages = ({ messages, currentChannel }) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const renderMessage = (msg) => {
    const text = leoProfanity.clean(msg.text?.trim() || '')

    return (
      <div key={msg.id} className="text-break mb-2">
        <b>{msg.username}:</b> {text}
      </div>
    )
  }

  return (
    <div className="chat-messages overflow-auto px-5">
      <div className="mb-4">
        <h3 className="text-center mb-0">
          Channel:
          {' '}
          <b>
            #{currentChannel?.name}
          </b>
        </h3>
        <hr />
      </div>
      {messages.map(renderMessage)}
      <div ref={messagesEndRef} />
    </div>
  )
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      username: PropTypes.string
    })
  ).isRequired,
  currentChannel: PropTypes.shape({
    name: PropTypes.string
  })
}

Messages.defaultProps = {
  currentChannel: {
    name: 'unknown'
  }
}

export default Messages
