import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocationDTO } from '../../services/dto/location.dto';
import LocationAPI from '../../services/services';
import './CardForm.css';

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
      updateLocation();
    }
  };

  const deleteLocation = () => {
    LocationAPI.deleteLocation(location.id);

    navigate('/');
  };

  const isAddForm = (): boolean => {
    return !isEditForm;
  };

  const updateLocation = () => {
    LocationAPI.updateLocation(location.id, location).then(() =>
      navigate(`/locations/${location.id}`)
    );
  };

  const priceFormater = (num: number) => {
    if (Math.round(num).toString().length < 4) {
      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3
      }).format(num);
    } else {
      return num;
    }
  };

  return (
    <div className="display-location">
      <img className="w-full h-80" src={location.picture} alt={location.title} />
      <div className="display-location-content mt-16 mx-20">
        <div className="display-location-details">
          <p className="font-bold font-inter text-stone-600 lg:text-2xl md:text-base sm:text-xs mb-2">
            {location.title}, {location.location}
          </p>
          <p className="font-inter text-gray-700 md:text-base sm:text-xs mb-2 ">
            {location.category.name} &#8226; {location.numberOfRooms} rooms{' '}
          </p>
          <p className="font-inter text-gray-700 md:text-base sm:text-xs max-w-md">
            {location.description}
          </p>
        </div>
        <div className="font-bold font-inter text-stone-600 lg:text-2xl md:text-base sm:text-xs mb-2">
          € {priceFormater(location.price)}{' '}
          <span className="font-inter text-normal font-normal">night</span>
        </div>
        <div className="display-location-edit">
          <form onSubmit={(e) => handleSubmit(e)} className="m-5">
            <p className="font-inter font-bold text-gray-500">Modifier prix</p>
            <div className="flex justify-center flex-col my-5">
              <div className="p-2 ">
                <input
                  id="price"
                  type="number"
                  name="price"
                  className="form-control font-inter shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.price.value}
                  onChange={(e) => handleInputChange(e)}></input>
                {/* error */}
                {form.price.error && (
                  <div className="card-panel red accent-1">{form.price.error}</div>
                )}
              </div>
              {/* button form */}
              <div className="flex justify-around my-5">
                <button
                  onClick={deleteLocation}
                  className="button border text-emerald-200 rounded-3xl  md:text-sm sm:text-xs hover:bg-emerald-400 mx-2 hover:text-white py-2 w-3/6 border-emerald-200">
                  delete
                </button>
                <button
                  className="button text-white md:text-sm sm:text-xs rounded-3xl hover:bg-emerald-400 bg-emerald-200 py-2 w-3/6"
                  type="submit">
                  Valider
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationForm;
