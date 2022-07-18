import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../../services/authentification.service';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import User from '../../models/user';
import YupPassword from 'yup-password';
YupPassword(Yup); // extend yup

type userFormField = {
  value?: any;
};

type userForm = {
  email: userFormField;
  password: userFormField;
};

const Login: FunctionComponent = () => {
  const [id] = useState<number>(Math.floor(Math.random() * 1000));
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState<User>(new User(id));
  const [form, setForm] = useState<userForm>({
    email: { value: '' },
    password: { value: '' }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
  };

  const handleFormSubmit = () => {
    user.email = form.email.value;
    user.password = form.password.value;
    login();
  };

  const login = () => {
    AuthenticationService.login(user)
      .then((data) => localStorage.setItem('token', data.accessToken))
      .then(() => localStorage.setItem('userStatus', 'connected'));
    navigate('/');
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Veuillez renseigner une adresse mail valide')
      .required('Ce champs est obligatoire.'),
    password: Yup.string().required('veuillez renseigner un mot de passe')
  });

  return (
    <div className="container">
      <h2 className="font-bold flex justify-center text-3xl text-vert font-inter m-5">
        Connectez-vous à votre compte
      </h2>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}>
        {({ handleChange }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="votre adresse mail"
              value={form.email.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />
            <ErrorMessage name="email" />

            <label htmlFor="password">Mot de passe</label>
            <Field
              id="password"
              type="password"
              name="password"
              autoComplete="false"
              placeholder="votre mot de passe"
              value={form.password.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />
            <ErrorMessage name="password" />

            <button type="submit">connexion</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
