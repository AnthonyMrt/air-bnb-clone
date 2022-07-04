import React, { FunctionComponent, useState } from 'react';
import './CreateLocation.css';
//import CardForm from '../../components/Forms/CardForm';
//import Location from '../../models/location';
import Location from '../../models/location';
import LocationAPI from '../../services/services';
import { useNavigate } from 'react-router-dom';

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  title: Field;
  description: Field;
  location: Field;
  picture: Field;
  stars: Field;
  numberOfRooms: Field;
  price: Field;
  categoryId: Field;
};

const CreateLocationPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const [id] = useState<number>(Math.floor(Math.random() * 100));
  const [location] = useState<Location>(new Location(id));
  const [form, setForm] = useState<Form>({
    picture: { value: location.picture },
    title: { value: location.title, isValid: true },
    description: { value: location.description, isValid: true },
    location: { value: location.location, isValid: true },
    stars: { value: location.stars, isValid: true },
    numberOfRooms: { value: location.numberOfRooms, isValid: true },
    price: { value: location.price, isValid: true },
    categoryId: { value: location.categoryId, isValid: true }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
  };

  const validateForm = () => {
    let newForm: Form = form;

    // Validator url

    if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(form.picture.value)) {
      const errorMsg: string = "L'url n'est pas valide.";
      const newField: Field = {
        value: form.picture.value,
        error: errorMsg,
        isValid: false
      };
      newForm = { ...newForm, ...{ picture: newField } };
    } else {
      const newField: Field = {
        value: form.picture.value,
        error: '',
        isValid: true
      };
      newForm = { ...newForm, ...{ picture: newField } };
    }

    if (!/^[a-zA-Zàéè ]{3,150}$/.test(form.title.value)) {
      const errorMsg: string = 'Le titre de la location est compris entre 3 et 150 charactères';
      const newField: Field = {
        value: form.title.value,
        error: errorMsg,
        isValid: false
      };
      newForm = { ...newForm, ...{ title: newField } };
    } else {
      const newField: Field = {
        value: form.title.value,
        error: '',
        isValid: true
      };
      newForm = { ...newForm, ...{ title: newField } };
    }

    //validator price
    if (!/^[0-9999999]{1,10}$/.test(form.price.value)) {
      const errorMsg: string = 'Entrez un prix correct';
      const newField: Field = {
        value: form.price.value,
        error: errorMsg,
        isValid: false
      };
      newForm = { ...newForm, ...{ price: newField } };
    } else {
      const newField: Field = {
        value: form.price.value,
        error: '',
        isValid: true
      };
      newForm = { ...newForm, ...{ price: newField } };
    }

    console.log(newForm);
    setForm(newForm);
    return newForm.price.isValid && newForm.title.isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      location.picture = form.picture.value;
      location.title = form.title.value;
      location.description = form.description.value;
      location.location = form.location.value;
      location.stars = form.stars.value;
      location.numberOfRooms = form.numberOfRooms.value;
      location.price = form.price.value;
      location.categoryId = form.categoryId.value;
      addLocation();
    }
  };

  const addLocation = () => {
    LocationAPI.addLocation(location).then(() => navigate(`/locations/create`));
  };

  return (
    <div className="row">
      <h2 className="font-bold flex justify-center text-3xl text-emerald-300 font-inter m-5">
        Ajouter une location
      </h2>
      <div className="border rounded md:mt-0 md:col-span-2 m-14">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="location-details-inputs mt-3">
            <div className="details-section1">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Titre
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Titre"
                  value={form.title.value}
                  onChange={(e) => handleInputChange(e)}
                />
                {/* error */}
                {form.title.error && (
                  <div className="card-panel red accent-1">{form.title.error}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={form.description.value}
                  onChange={(e) => handleInputChange(e)}
                />
                {/* error */}
                {form.description.error && (
                  <div className="card-panel red accent-1">{form.description.error}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                  Location
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="location"
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={form.location.value}
                  onChange={(e) => handleInputChange(e)}
                />
                {/* error */}
                {form.location.error && (
                  <div className="card-panel red accent-1">{form.location.error}</div>
                )}
              </div>

              <div className="picture mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="picture">
                  Photo
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Picture"
                  type="text"
                  placeholder="Photo"
                  name="picture"
                  value={form.picture.value}
                  onChange={(e) => handleInputChange(e)}
                />
                {/* error */}
                {form.picture.error && (
                  <div className="card-panel red accent-1">{form.picture.error}</div>
                )}
              </div>
            </div>
            <div className="details-section2">
              <div className="stars mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stars">
                  Note
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="stars"
                  type="number"
                  placeholder="Note"
                  value={form.stars.value}
                  name="stars"
                  onChange={(e) => handleInputChange(e)}
                />
                {/* error */}
                {form.stars.error && (
                  <div className="card-panel red accent-1">{form.stars.error}</div>
                )}
              </div>
              <div className="numberOfRooms mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="numberOfRooms">
                  N° chambres
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="numbersOfRooms"
                  type="number"
                  placeholder="Nombres de chambres"
                  name="numberOfRooms"
                  value={form.numberOfRooms.value}
                  onChange={(e) => handleInputChange(e)}
                />
                {/* error */}
                {form.numberOfRooms.error && (
                  <div className="card-panel red accent-1">{form.numberOfRooms.error}</div>
                )}
              </div>
              <div className="price mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Prix
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="number"
                  placeholder="Prix"
                  name="price"
                  value={form.price.value}
                  onChange={(e) => handleInputChange(e)}
                />
                {/* error */}
                {form.price.error && (
                  <div className="card-panel red accent-1">{form.price.error}</div>
                )}
              </div>
              <div className="category mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Categorie
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="categoryId"
                  type="number"
                  placeholder="Categorie"
                  name="categoryId"
                  value={form.categoryId.value}
                  onChange={(e) => handleInputChange(e)}
                />
                {/* error */}
                {form.categoryId.error && (
                  <div className="card-panel red accent-1">{form.categoryId.error}</div>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-300 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLocationPage;
