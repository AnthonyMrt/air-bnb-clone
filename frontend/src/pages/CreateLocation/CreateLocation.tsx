import React, { FunctionComponent, useState } from 'react';
import CardForm from '../../components/Forms/CardForm';
import Location from '../../models/location';

const CreateLocationPage: FunctionComponent = () => {
  const [id] = useState<number>(Math.ceil(Math.random() * 1000));
  const [title] = useState<string>('');
  const [description] = useState<string>('');
  const [location] = useState<string>('');
  const [picture] = useState<string>('');
  const [stars] = useState<number>(0);
  const [numberOfRooms] = useState<number>(0);
  const [price] = useState<number>(0);
  const [categoryId] = useState<number>(4);
  const [category] = useState<any>([]);
  const [loca] = useState<Location>(
    new Location(
      id,
      title,
      description,
      location,
      picture,
      stars,
      numberOfRooms,
      price,
      categoryId,
      category
    )
  );

  return (
    <div className="row">
      <h2 className="header center">Ajouter une location</h2>
      <CardForm location={loca} isEditForm={false}></CardForm>
    </div>
  );
};

export default CreateLocationPage;
