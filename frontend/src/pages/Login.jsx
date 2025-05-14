import React from 'react';
import { Formik, Form, Field } from 'formik';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <div>
            <label htmlFor="username">Username</label>
            <Field name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
