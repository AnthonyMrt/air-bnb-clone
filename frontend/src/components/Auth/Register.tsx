/* eslint-disable no-unused-vars */
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
  username: userFormField;
  email: userFormField;
  password: userFormField;
};

const Register: FunctionComponent = () => {
  const [id] = useState<number>(Math.floor(Math.random() * 1000));
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(new User(id));
  const [form, setForm] = useState<userForm>({
    username: { value: '' },
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
    let name = form.username.value;
    user.name = name.charAt(0).toUpperCase() + name.slice(1);
    user.username = form.username.value;
    user.email = form.email.value;
    user.password = form.password.value;
    createUser();
  };

  const createUser = () => {
    AuthenticationService.register(user).then(() =>
      setTimeout(() => {
        navigate('/login');
      }, 5000)
    );
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'votre surnom doit contenir minimum 2 caractères')
      .max(30, '30 caractères maximum autorisés')
      .required('Veuillez renseigner un pseudo')
      .test(
        'usernameCheck',
        'cet est identifiant déjà utiliser, veuillez en choisir un autre',
        async (value) => {
          const res = await AuthenticationService.checkUsername(value);
          if (res) {
            return false;
          } else {
            return true;
          }
        }
      ),
    email: Yup.string()
      .email('Veuillez renseigner une adresse mail valide')
      .required('Ce champs est obligatoire.')
      .test(
        'emailCheck',
        'cet est email déjà utiliser, veuillez en choisir un autre',
        async (value) => {
          const res = await AuthenticationService.checkEmail(value);
          if (res) {
            return false;
          } else {
            return true;
          }
        }
      ),
    password: Yup.string()
      .required('Ce champs est obligatoire.')
      .min(
        8,
        'Le mot de passe doit contenir 8 caractères ou plus, dont au moins un de chaque type : majuscule, minuscule, chiffre et spécial.'
      )
      .minLowercase(1, 'le mot de passe doit contenir au moins 1 lettre minuscule')
      .minUppercase(1, 'le mot de passe doit contenir au moins 1 lettre majuscule')
      .minNumbers(1, 'le mot de passe doit contenir au moins 1 chiffre')
      .minSymbols(1, 'le mot de passe doit contenir au moins 1 caractère spécial'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Les mots de passe doivent correspondre'
    )
  });

  return (
    <div className="container">
      <h2 className="font-bold flex justify-center text-3xl text-vert font-inter m-5">
        Connectez-vous à votre compte
      </h2>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          passwordConfirmation: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}>
        {({ handleChange }) => (
          <Form>
            <label htmlFor="username">Identifiant</label>
            <Field
              id="username"
              name="username"
              type="username"
              placeholder="choisir nom d'utilisateur"
              value={form.username.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />
            <ErrorMessage name="username" />
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="votre adresse de couriel"
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
              autoComplete="off"
              placeholder="votre mot de passe"
              value={form.password.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />
            <ErrorMessage name="password" />

            <label htmlFor="passwordConfirmation">Confirmez votre mot de passe</label>
            <Field
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              autoComplete="off"
              placeholder="confirmez votre mot de passe"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />
            <ErrorMessage name="passwordConfirmation" />
            <button type="submit">connexion</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Register;
