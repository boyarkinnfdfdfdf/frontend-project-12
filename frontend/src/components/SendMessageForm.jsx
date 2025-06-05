import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRef, useEffect } from 'react'
import leoProfanity from 'leo-profanity'
import { useTranslation } from 'react-i18next'

const SendMessageForm = ({
  username, token, currentChannelId, sendMessage, isSubmitting: parentIsSubmitting
}) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)

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
              className={`border-0 p-0 ps-2 form-control ${errors.body && touched.body ? 'is-invalid' : ''}`}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isSubmitting || parentIsSubmitting || !values.body.trim()}
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
  )
}

export default SendMessageForm
