import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineGlobeAlt, HiSearch } from 'react-icons/hi';
import './Header.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/HolisBnb.png';
import LocationAPI from '../../services/services';
import { LocationDTO } from '../../services/dto/location.dto';

type HeaderProps = {
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = () => {
  const [term, setTerm] = useState<string>('');
  const [locations, setLocations] = useState<LocationDTO[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);

    if (term.length <= 1) {
      setLocations([]);
      return;
    } else {
      setTerm(term.charAt(0).toUpperCase() + term.slice(1).toLocaleLowerCase());
    }

    LocationAPI.searchLocation(term).then((locations) => setLocations(locations));
    console.log(locations);
  };

  return (
    <div className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={Logo} alt="" />
        </Link>

        <div className="header__center">
          <input
            type="text"
            placeholder="Search a destination"
            value={term}
            onChange={(e) => handleInputChange(e)}
          />
          <div className="search-button">
            <HiSearch />
          </div>
        </div>
        <div className="header__right">
          <p>Become a host</p>
          <HiOutlineGlobeAlt />
          <HiOutlineMenu />
        </div>
      </div>
      <div className="header-container">
        {locations.map((location) => (
          <Link key={location.id} to={`/locations/${location.id}`}>
            {location.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
