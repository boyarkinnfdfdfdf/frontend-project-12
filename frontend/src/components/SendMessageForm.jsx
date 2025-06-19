import React, { useRef, useEffect } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';

const SendMessageForm = ({
  onSubmit, parentIsSubmitting, user,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
        const cleanBody = leoProfanity.clean(values.body);
        try {
          await onSubmit({ ...values, body: cleanBody, username: user });
          resetForm();
        } catch (e) {
          setErrors({ body: t('chat.messageSendError') });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        errors, touched, isSubmitting, handleSubmit, values,
      }) => (
        <FormikForm noValidate onSubmit={handleSubmit} className="d-flex">
          <Field
            as={Form.Control}
            name="body"
            ref={inputRef}
            autoFocus
            placeholder={t('chat.messageInputPlaceholder')}
            isInvalid={!!errors.body && touched.body}
            aria-label={t('chat.messageInputLabel')}
            className="me-2"
            autoComplete="off"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || parentIsSubmitting || !values.body.trim()}
          >
            {t('chat.sendButton')}
          </Button>
          <ErrorMessage name="body" component={Form.Control.Feedback} type="invalid" className="d-block" />
        </FormikForm>
      )}
    </Formik>
  );
};

export default SendMessageForm;
