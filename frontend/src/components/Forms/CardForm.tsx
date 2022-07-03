import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocationDTO } from '../../services/dto/location.dto';
import LocationAPI from '../../services/services';

type Props = {
  location: LocationDTO;
  isEditForm: boolean;
};

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
  category: Field;
};

const LocationForm: FunctionComponent<Props> = ({ location, isEditForm }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>({
    picture: { value: location.picture },
    title: { value: location.title, isValid: true },
    description: { value: location.description, isValid: true },
    location: { value: location.location, isValid: true },
    stars: { value: location.stars, isValid: true },
    numberOfRooms: { value: location.numberOfRooms, isValid: true },
    price: { value: location.price, isValid: true },
    categoryId: { value: location.categoryId, isValid: true },
    category: { value: location.category.name, isValid: true }
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
    if (isAddForm()) {
      const start = 'https://assets.location.com/assets/cms2/img/pokedex/detail/';
      const end = '.png';

      if (!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)) {
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
      isEditForm ? updateLocation() : addLocation();
    }
  };

  const deleteLocation = () => {
    LocationAPI.deleteLocation(location.id).then(() => navigate(`/`));
  };

  const isAddForm = (): boolean => {
    return !isEditForm;
  };

  const addLocation = () => {
    LocationAPI.addLocation(location).then(() => navigate(`/locations/create`));
  };

  const updateLocation = () => {
    LocationAPI.updateLocation(location.id, location).then(() =>
      navigate(`/locations/${location.id}`)
    );
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            {isEditForm && (
              <div className="card-image">
                <img
                  src={location.picture}
                  alt={location.title}
                  style={{ width: '250px', margin: '0 auto' }}
                />
                <span className="btn-floating halfway-fab waves-effect waves-light">
                  <i onClick={deleteLocation} className="material-icons">
                    delete
                  </i>
                </span>
              </div>
            )}
            <div className="card-stacked">
              <div className="card-content">
                {/* location picture */}
                {isAddForm() && (
                  <div className="form-group">
                    <label htmlFor="picture">Image</label>
                    <input
                      id="picture"
                      type="text"
                      name="picture"
                      className="form-control"
                      value={form.picture.value}
                      onChange={(e) => handleInputChange(e)}></input>
                    {/* error */}
                    {form.picture.error && (
                      <div className="card-panel red accent-1">{form.picture.error}</div>
                    )}
                  </div>
                )}
                {/* location name */}
                <div className="form-group">
                  <label htmlFor="title">Nom</label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    className="form-control"
                    value={form.title.value}
                    onChange={(e) => handleInputChange(e)}></input>
                  {/* error */}
                  {form.title.error && (
                    <div className="card-panel red accent-1">{form.title.error}</div>
                  )}
                </div>
                {/* location hp */}
                <div className="form-group">
                  <label htmlFor="price">Prix</label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    className="form-control"
                    value={form.price.value}
                    onChange={(e) => handleInputChange(e)}></input>
                  {/* error */}
                  {form.price.error && (
                    <div className="card-panel red accent-1">{form.price.error}</div>
                  )}
                </div>
                {/* location cp */}
                <div className="form-group">
                  <label htmlFor="stars">Stars</label>
                  <input
                    id="stars"
                    type="number"
                    name="stars"
                    min={0}
                    max={5}
                    className="form-control"
                    value={form.stars.value}
                    onChange={(e) => handleInputChange(e)}></input>
                  {/* error */}
                  {form.stars.error && (
                    <div className="card-panel red accent-1">{form.stars.error}</div>
                  )}
                </div>
                {/* location types */}
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LocationForm;
