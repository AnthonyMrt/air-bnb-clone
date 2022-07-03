import React from 'react';
import { Link } from 'react-router-dom';
import { LocationDTO } from '../../services/dto/location.dto';

type CardProps = {
  location: LocationDTO;
};

const Card: React.FC<CardProps> = ({ location }) => {
  return (
    <div className="card">
      <ul style={{ listStyle: 'none' }}>
        <li key={location.id}>
          <div className="display-location">
            <img
              src={location.picture}
              alt={location.title}
              style={{ width: '250px', margin: '0 auto' }}></img>
            <Link
              to={`/locations/${location.id}`}
              className="btn btn-floating halfway-fab waves-effect">
              <i className="material-icons">update</i>
            </Link>
            <div className="display-location__content">
              {location.title}
              {location.description}
              {location.categoryId}
              {location.category.name}
              {location.price}
              {location.numberOfRooms}
            </div>

            <div className="display-location__edit">
              {/* price input */}
              {/* price button */}
              {/* delete button */}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Card;
