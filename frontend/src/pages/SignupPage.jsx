import React, { useRef } from 'react';
import {
  Form, Button, Card, Row, Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('signup.errors.minMax', { min: 3, max: 20 }))
      .max(20, t('signup.errors.minMax', { min: 3, max: 20 }))
      .matches(/^[\wа-яА-Я]+$/, t('signup.errors.required'))
      .required(t('signup.errors.required')),
    password: Yup.string()
      .min(6, t('signup.errors.passMin'))
      .required(t('signup.errors.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signup.errors.passMatch'))
      .required(t('signup.errors.required')),
  });

  return (
    <Row className="justify-content-center align-items-center h-100">
      <Col xs={12} md={6} lg={4}>
        <Card>
          <Card.Body>
            <h1 className="text-center mb-4">{t('signup.header')}</h1>
            <Formik
              initialValues={{
                username: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={
                async (values, { setSubmitting, setErrors }) => {
                  try {
                    await axios.post('/api/v1/signup', {
                      username: values.username,
                      password: values.password,
                    });
                    navigate('/');
                  } catch (error) {
                    if (error.response?.status === 409) {
                      setErrors({ username: t('signup.errors.userExists') });
                    } else {
                      setErrors({ username: t('signup.errorSignup') });
                    }
                  } finally {
                    setSubmitting(false);
                  }
                }
              }
            >
              {({
                errors, touched, isSubmitting, handleSubmit,
              }) => (
                <FormikForm noValidate onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>{t('signup.fieldUsername')}</Form.Label>
                    <Field
                      as={Form.Control}
                      type="text"
                      name="username"
                      innerRef={inputRef}
                      placeholder={t('signup.fieldUsername')}
                      isInvalid={!!errors.username && touched.username}
                    />
                    <ErrorMessage name="username" component={Form.Control.Feedback} type="invalid" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>{t('signup.fieldPassword')}</Form.Label>
                    <Field
                      as={Form.Control}
                      type="password"
                      name="password"
                      placeholder={t('signup.fieldPassword')}
                      isInvalid={!!errors.password && touched.password}
                    />
                    <ErrorMessage name="password" component={Form.Control.Feedback} type="invalid" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>{t('signup.fieldConfirmPassword')}</Form.Label>
                    <Field
                      as={Form.Control}
                      type="password"
                      name="confirmPassword"
                      placeholder={t('signup.fieldConfirmPassword')}
                      isInvalid={!!errors.confirmPassword && touched.confirmPassword}
                    />
                    <ErrorMessage name="confirmPassword" component={Form.Control.Feedback} type="invalid" />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
                    {t('signup.buttonSubmit')}
                  </Button>
                </FormikForm>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Signup;
