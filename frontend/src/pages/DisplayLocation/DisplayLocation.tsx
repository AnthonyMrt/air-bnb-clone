import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardForm from '../../components/Forms/CardForm';
import { LocationDTO } from '../../services/dto/location.dto';
import LocationAPI from '../../services/services';

type DisplayLocationPageProps = {};

const DisplayLocationPage: React.FC<DisplayLocationPageProps> = () => {
  const [locations, setLocations] = useState<LocationDTO[]>([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchAllLocation() {
      const resp = await LocationAPI.getAll();

      setLocations(
        resp.filter((location) => {
          return location.id === Number(id);
        })
      );
    }

    fetchAllLocation();
  }, [id]);

  //console.log(locations);
  // Create a function to handle price change and persist it to database

  // Create a function to delete the location and persist it to database

  return (
    <>
      {locations.map((resi) => {
        return <CardForm key={resi.id} location={resi} isEditForm={true} />;
      })}
    </>
  );
};

export default DisplayLocationPage;
