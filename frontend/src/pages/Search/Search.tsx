import React, { useEffect, useState } from 'react';
import { LocationDTO } from '../../services/dto/location.dto';
import LocationAPI from '../../services/services';
import './Search.css';
import Card from '../../components/Card/Card';

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {
  const [locations, setLocations] = useState<LocationDTO[]>([]);
  const [orderBy, setOrderBy] = useState<String>('');

  const tableHeader = ['Categorie', 'Chambres', 'Prix'];

  useEffect(() => {
    async function fetchAllLocation() {
      const resp = await LocationAPI.getAll();

      setLocations(resp);
    }

    fetchAllLocation();
  }, []);

  // Create a function to sort locations by categories & by number of rooms
  const handleLocationSorted = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const button: HTMLInputElement = e.currentTarget;
    setOrderBy(button.id);
    console.log(e.currentTarget);
    if (orderBy === button.id) {
      setOrderBy(button.id + 'reverse');
    } else {
      setOrderBy(button.id);
    }
  };

  // Bonus: Create a search function linked to the search input in the header

  return (
    <div className="search">
      <section className="m-2 border-b ">
        <ul className="flex justify-around ">
          {tableHeader.map((el) => (
            <li key={el} className=" m-2 rounded-md">
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
      <div className="grid grid-cols-4">
        {locations
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
