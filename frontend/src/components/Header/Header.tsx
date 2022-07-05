import React, { useState } from 'react';
import {
  HiPencilAlt,
  HiOutlineGlobeAlt,
  HiSearch,
  HiStar,
  HiOutlineCurrencyEuro
} from 'react-icons/hi';
import './Header.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/HolisBnb.png';
import LocationAPI from '../../services/services';
import { LocationDTO } from '../../services/dto/location.dto';
import { FaBed } from 'react-icons/fa';
//import { GrCurrency } from 'react-icons/gr';

type HeaderProps = {
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = () => {
  const [term, setTerm] = useState<string>('');
  const [locations, setLocations] = useState<LocationDTO[]>([]);
  const [searchProceed, setSearchProceed] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchProceed(true);
    const term = e.target.value;
    setTerm(term);
    setSearchProceed(true);

    if (term.length <= 1) {
      setLocations([]);
      return;
    }
    LocationAPI.searchLocation(term.toLowerCase()).then((locations) => setLocations(locations));
  };

  const handleGoCreate = (): void => {
    setTerm('');
    setLocations([]);
  };

  const handleClickForDetails = (): void => {
    setTerm('');
    setSearchProceed(false);
  };

  const priceFormater = (num: number) => {
    if (Math.round(num).toString().length < 4) {
      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
      }).format(num);
    } else {
      return num;
    }
  };

  return (
    <div className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={Logo} alt="" />
        </Link>

        <div className="header__center">
          <input
            className="bg-transparent font-inter "
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
          <p className="font-inter">Become a host</p>
          <HiOutlineGlobeAlt />
          <Link onClick={() => handleGoCreate()} to="locations/create">
            <HiPencilAlt />
          </Link>
        </div>
      </div>
      {searchProceed ? (
        <div className="header-result-container flex justify-center m-2">
          <ul className=" font-inter w-72">
            {locations.slice(0, 3).map((location) => (
              <Link
                className=""
                key={location.id}
                to={`/locations/${location.id}`}
                onClick={handleClickForDetails}>
                <li
                  className="bg-gradient-to-r from-emerald-400 m-2 to-emerald-200 rounded-lg"
                  key={location.id}>
                  <>
                    <div className="w-full flex mb-2 m-w-xs items-center justify-around">
                      <img
                        className="m-w-10 max-h-10 rounded-full "
                        src={location.picture}
                        alt="profile"
                      />
                      <p className="font-inter w-5 pr-1  text-xs text-center text-white">
                        {location.title}, {location.location}
                      </p>
                      <div className=" pl-4 mt-2 grid grid-cols-3">
                        <div>
                          <p className="font-inter text-sm text-gray-500">
                            <HiStar />
                          </p>
                          <p className="font-inter  text-sm text-gray-500">{location.stars}</p>
                        </div>
                        <div className="">
                          <p className="font-inter text-sm text-gray-500">
                            <FaBed />
                          </p>
                          <p className="font-inter  text-sm text-gray-500">
                            {location.numberOfRooms}
                          </p>
                        </div>
                        <div className="">
                          <p className="font-inter text-sm text-gray-500">
                            <HiOutlineCurrencyEuro />
                          </p>
                          <p className="font-inter text-sm  text-gray-500">
                            {priceFormater(location.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                  {/* <div className="w-full flex items-center justify-center">
                    <div className=" max-h-48 xl:w-2/4 sm:w-1/3 w-full 2xl:w-full flex flex-col items-center md:py-5 bg-gradient-to-r from-emerald-400 to-emerald-200 rounded-lg">
                      <div className="w-full flex items-center justify-center">
                        <div className="flex h flex-col items-center ">
                          <img
                            className="w-3/6 max-h-8 rounded-full "
                            src={location.picture}
                            alt="profile"
                          />
                          <p className="font-inter mt-2 text-xs sm:text-sm md:text-sm font-semibold text-center text-white">
                            {location.title}, {location.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex mx-5">
                        <div className="">
                          <p className="font-inter text-sm text-gray-500">Notations</p>
                          <p className="font-inter mt-2 text-center text-sm sm:text-sm md:text-sm 2xl:text-base text-gray-50">
                            {location.stars}
                          </p>
                        </div>
                        <div className="ml-12">
                          <p className="font-inter text-sm text-gray-500">chambres</p>
                          <p className="font-inter mt-2 text-base sm:text-lg md:text-sm 2xl:text-base text-gray-50">
                            {location.numberOfRooms} rooms
                          </p>
                        </div>
                        <div className="ml-12">
                          <p className="font-inter text-sm text-gray-500">prix</p>
                          <p className="font-inter mt-2 text-base sm:text-sm md:text-sm 2xl:text-base text-gray-50">
                            € {priceFormater(location.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
