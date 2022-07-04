import React from 'react';
import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { LocationDTO } from '../../services/dto/location.dto';

type CardProps = {
  location: LocationDTO;
};

const Card: React.FC<CardProps> = ({ location }) => {
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
    <div className="max-w-xs lg:w-52 md:32  rounded m-1">
      <ul style={{ listStyle: 'none' }}>
        <li key={location.id}>
          <div className="rounded overflow-hidden ">
            <Link to={`./locations/${location.id}`}>
              <img className="w-full rounded h-32" src={location.picture} alt={location.title} />
            </Link>
            <div className="py-4 ">
              <div className="font-bold text-stone-700 text-xl  mb-2 truncate ... hover:overflow-visible ">
                {location.title}, {location.location}
              </div>
              <p className="text-gray-700 text-sm md:text-sm sm:text-xs truncate ... hover:overflow-visible">
                {location.description}
              </p>
              <p className="text-gray-700 text-sm md:text-sm sm:text-xs truncate ... hover:overflow-visible">
                {location.category.name}
              </p>{' '}
              <p className="text-gray-700 text-sm  md:text-base sm:text-xs truncate ... hover:overflow-visible">
                {location.numberOfRooms} rooms
              </p>
              <p className="text-xl text-stone-700 font-bold md:text-base sm:text-xs truncate ... hover:overflow-visible">
                € {priceFormater(location.price).toLocaleString()}
                <span className="text-normal font-normal"> night</span>
              </p>
            </div>
            <div className="px-6 pt-4 pb-2"></div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Card;
