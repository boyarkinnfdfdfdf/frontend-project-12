import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import leoProfanity from 'leo-profanity';

const RenameChannelModal = ({
  show, onHide, onRename, channels, currentChannel,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    if (show) {
      inputRef.current?.focus();
    }
  }, [show]);

  const existingNames = channels
    .map((ch) => ch.name)
    .filter((n) => n !== currentChannel.name);

  const RenameSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, t('modals.errors.channelNameMinMax', { min: 3, max: 20 }))
      .max(20, t('modals.errors.channelNameMinMax', { min: 3, max: 20 }))
      .notOneOf(existingNames, t('modals.errors.channelExists'))
      .required(t('modals.errors.required')),
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: currentChannel.name }}
        validationSchema={RenameSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            constcleanedName = leoProfanity.clean(values.name.trim());
            await onRename({ id: currentChannel.id, name: cleanedName });
            onHide();
          } catch (e) {
            setErrors({ name: t('modals.errors.renameError') });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          errors, touched, isSubmitting, handleSubmit,
        }) => (
          <FormikForm noValidate onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="renameChannelName">
                <Form.Label className="visually-hidden">{t('modals.channelName')}</Form.Label>
                <Field
                  as={Form.Control}
                  name="name"
                  type="text"
                  innerRef={inputRef}
                  placeholder={t('modals.channelName')}
                  isInvalid={touched.name && !!errors.name}
                  autoFocus
                />
                <ErrorMessage name="name" component={Form.Control.Feedback} type="invalid" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
                {t('modals.cancel')}
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {t('modals.send')}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default RenameChannelModal;
