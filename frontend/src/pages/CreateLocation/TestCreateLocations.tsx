/* eslint-disable no-unused-vars */
import React, { FunctionComponent, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { CategoriesInt } from '../../interfaces/categories.interface';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import LocationAPI from '../../services/services';
import Location from '../../models/location';
import { useNavigate } from 'react-router-dom';

const TestCreateLocationPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoriesInt[]>([]);
  const [id] = useState<number>(Math.floor(Math.random() * 100));
  const [location, setLocation] = useState<Location>(new Location(id));
  const [form, setForm] = useState({
    picture: { value: location.picture },
    title: { value: location.title, isValid: true },
    description: { value: location.description, isValid: true },
    location: { value: location.location, isValid: true },
    stars: { value: location.stars, isValid: true },
    numberOfRooms: { value: location.numberOfRooms, isValid: true },
    price: { value: location.price, isValid: true },
    categoryId: { value: location.categoryId, isValid: true },
    category: { value: '' }
  });
  const [countries, setCountries] = useState<any>([]);

  useEffect(() => {
    async function fetchAllCategories() {
      const cat = await LocationAPI.getCategories();

      setCategories(cat);
    }

    async function fetchCountries() {
      const pays = await LocationAPI.fetchCountries();

      setCountries(pays);
    }

    fetchCountries();
    fetchAllCategories();

    console.log(categories);
    console.log(countries);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
  };

  const handleFormSubmit = (
    e: FormikHelpers<{
      title: string;
      description: string;
      location: string;
      picture: string;
      stars: string;
      numberOfRooms: string;
      price: string;
      category: string;
    }>
  ) => {
    location.picture = form.picture.value;
    location.title = form.title.value;
    location.description = form.description.value;
    location.location = form.location.value;
    location.stars = form.stars.value;
    location.numberOfRooms = form.numberOfRooms.value;
    location.price = form.price.value;
    location.categoryId = form.categoryId.value;
    location.category = [id, form.category.value, 'new description'];
    addLocation();
  };

  const addLocation = () => {
    console.log(location);
    let token = localStorage.getItem('token');
    LocationAPI.addLocation(location, token).then(() => navigate(`/locations/create`));
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'le titre doit contenir minimum 3 caractères')
      .max(150, 'le titre doit contenir maximum 150 caractères')
      .matches(/^[a-zA-Zaéèù0-9!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]*$/)
      .required('Ce champs est obligatoire.'),
    picture: Yup.string().matches(
      /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/,
      "l'url de photo doit etre de type: jpq, gif ou png"
    ),
    stars: Yup.string()
      .min(0)
      .max(5, "le nombre maximum d'étoiles est 5")
      .matches(/^[0-5]{1,2}$/, 'Veuillez entrez une note valide'),
    numberOfRooms: Yup.string()
      .min(1, 'minimum 1 chambre')
      .matches(/^[0-9]{1,3}$/, 'renseigner le nombre de chambres'),
    price: Yup.string()
      .min(0)
      .max(10, 'votre prix est excessif')
      .matches(/^[0-9]{1,10}$/, 'Renseigner un prix valide'),
    category: Yup.string()
      .min(2, 'le nom de la catégorie doit contenir minimum 2 caractères')
      .max(15, 'le nom de la categorie doit contenir maximum 15 caractères')
      .matches(/^[a-zA-Zàéèù ]{2,15}$/)
      .required('Veuillez choisir une catégorie pour la location')
  });

  return (
    <div className="row">
      <h2 className="font-bold flex justify-center text-3xl text-vert font-inter m-5">
        Ajouter une location
      </h2>
      <Formik
        initialValues={{
          title: '',
          description: '',
          location: '',
          picture: '',
          stars: '',
          numberOfRooms: '',
          price: '',
          category: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, e) => {
          handleFormSubmit(e);
        }}>
        {({ errors, touched, handleChange }) => (
          <Form>
            <label htmlFor="title">Titre</label>
            <Field
              id="title"
              name="title"
              placeholder="Titre"
              value={form.title.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />
            <ErrorMessage name="title" />

            <label htmlFor="description">Description</label>
            <Field
              id="description"
              name="description"
              placeholder="Description"
              value={form.description.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />

            <label htmlFor="location">Localisation</label>
            <Field
              id="location"
              name="location"
              placeholder="Localisation"
              list="countryList"
              value={form.location.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />
            <datalist id="countryList">
              {countries.map((countries: any) => {
                return (
                  <option key={countries.name.common} value={countries.translations.fra.common}>
                    {countries.translations.fra.common}
                  </option>
                );
              })}
            </datalist>

            <label htmlFor="picture">Photo</label>
            <Field
              id="picture"
              name="picture"
              placeholder="Photo"
              value={form.picture.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />
            <ErrorMessage name="picture" />

            <label htmlFor="stars">Notes</label>
            <Field
              id="stars"
              name="stars"
              placeholder="Notes"
              value={form.stars.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />

            <label htmlFor="numberOfRooms">Nb Chambres</label>
            <Field
              id="numberOfRooms"
              name="numberOfRooms"
              placeholder="Nb de chambres"
              value={form.numberOfRooms.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />

            <label htmlFor="price">Prix</label>
            <Field
              id="price"
              name="price"
              placeholder="Prix de la location"
              value={form.price.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />

            <label htmlFor="category">Categorie</label>
            <Field
              id="category"
              name="category"
              placeholder="type de résidence"
              list="categoryList"
              value={form.category.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleInputChange(e);
              }}
            />
            <datalist id="categoryList">
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </datalist>
            <ErrorMessage name="category" />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TestCreateLocationPage;
