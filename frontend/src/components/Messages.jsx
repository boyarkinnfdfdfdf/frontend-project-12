import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import leoProfanity from 'leo-profanity'
import { useAuth } from '../AuthContext.jsx'
import { selectCurrentChannel, selectCurrentChannelId } from '../store/channelsSlice.js'
import { useFetchMessagesQuery, useSendMessageMutation } from '../store/messagesApi'

const Messages = () => {
  const { t } = useTranslation()
  const currentChannel = useSelector(selectCurrentChannel)
  const currentChannelId = useSelector(selectCurrentChannelId)
  const { token, user: username } = useAuth()
  const inputRef = useRef(null)

  const { data: messages = [], isLoading, error } = useFetchMessagesQuery({ channelId: currentChannelId })
  const [sendMessage] = useSendMessageMutation()

  useEffect(() => {
    inputRef.current?.focus()
  }, [currentChannelId])

  const validationSchema = Yup.object({
    body: Yup.string().trim().required(t('chat.errors.required')),
  })

  const handleSubmit = async (values, { resetForm, setSubmitting, setFieldError }) => {
    const sanitized = leoProfanity.clean(values.body.trim())
    try {
      await sendMessage({
        channelId: currentChannelId,
        body: sanitized,
        username,
        token,
      }).unwrap()
      resetForm()
    } catch (err) {
      setFieldError('body', t('chat.sendError'))
      console.error(t('chat.sendError'), err)
    } finally {
      setSubmitting(false)
    }
  }

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
          <Formik
            initialValues={{ body: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, values }) => (
              <Form className="py-1 border rounded-2" noValidate>
                <div className="input-group has-validation">
                  <Field
                    innerRef={inputRef}
                    name="body"
                    aria-label={t('chat.form.ariaLabel')}
                    placeholder={t('chat.form.placeholder')}
                    className={
                      `border-0 p-0 ps-2 form-control ${errors.body && touched.body ? 'is-invalid' : ''}`
                    }
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !values.body.trim()}
                    className="btn btn-group-vertical"
                  >
                    <img src="/assets/send.svg" alt="Send" width={20} height={20} />
                    <span className="visually-hidden">{t('chat.form.send')}</span>
                  </button>
                  <ErrorMessage
                    name="body"
                    render={(msg) => (
                      <div className="invalid-feedback d-block">{msg}</div>
                    )}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Messages
