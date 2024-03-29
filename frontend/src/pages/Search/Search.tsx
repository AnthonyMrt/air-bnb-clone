import React, { useEffect, useState } from 'react';
import { LocationInt } from '../../interfaces/location.interface';
import LocationAPI from '../../services/services';
import './Search.css';
import Card from '../../components/Card/Card';
import { CategoriesInt } from '../../interfaces/categories.interface';

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {
  const [locations, setLocations] = useState<LocationInt[]>([]);
  const [categories, setCategories] = useState<CategoriesInt[]>([]);
  const [orderBy, setOrderBy] = useState<String>('');
  const [orderByCat, setOrderByCat] = useState<String>('');

  const tableHeader = ['Categorie', 'Chambres', 'Prix'];

  useEffect(() => {
    async function fetchAllLocation() {
      const resp = await LocationAPI.getAll();
      const cat = await LocationAPI.getCategories();

      setCategories(cat);
      setLocations(resp);
    }

    fetchAllLocation();
  }, []);

  // Create a function to sort locations by categories & by number of rooms
  const handleLocationSorted = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const button: HTMLInputElement = e.currentTarget;
    setOrderBy(button.id);
    if (orderBy === button.id) {
      setOrderBy(button.id + 'reverse');
    } else {
      setOrderBy(button.id);
    }
  };

  const handleCategoriesSorted = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(value);
    setOrderByCat(value);
  };

  // Bonus: Create a search function linked to the search input in the header

  return (
    <div className="search">
      <section className="m-2 border-b ">
        <ul className="flex justify-around ">
          <li>
            <select
              className="font-inter py-2.5 px-0 w-full text-base text-gray-500 bg-transparent  border-gray-400 appearance-none dark:text-gray-500 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              id="sortCat"
              onChange={handleCategoriesSorted}>
              <option value="">Filtrer par categorie</option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </li>
          {tableHeader.map((el) => (
            <li key={el} className="font-inter m-2 rounded-md">
              <input
                type="radio"
                name="header-el"
                id={el}
                defaultChecked={el === orderBy || el === orderBy + 'reverse' ? true : false}
                onClick={(e) => handleLocationSorted(e)}
              />
              <label
                className="text-vert font-bold tracking-wider uppercase font-inter "
                htmlFor={el}>
                {el}
              </label>
            </li>
          ))}
        </ul>
      </section>
      <div className="cardLocation flex flex-wrap justify-around">
        {locations
          .filter((a) => {
            if (orderByCat !== '') {
              return a.category.name === orderByCat;
            } else return locations;
          })
          .sort((a, b) => {
            switch (orderBy) {
              case 'Categorie':
                return a.categoryId - b.categoryId;
              case 'Chambres':
                return a.numberOfRooms - b.numberOfRooms;
              case 'Prix':
                return a.price - b.price;
              case 'Categoryreverse':
                return b.categoryId - a.categoryId;
              case 'Prixreverse':
                return b.price - a.price;
              case 'Chambrereverse':
                return b.numberOfRooms - a.numberOfRooms;
              default:
                return a.id - b.id;
            }
          })
          .map((location) => {
            return <Card key={location.id} location={location} />;
          })}
      </div>
    </div>
  );
};

export default SearchPage;
