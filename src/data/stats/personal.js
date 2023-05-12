import React, { useState, useEffect } from 'react';

const Age = () => {
  const [age, setAge] = useState();

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24 * 365.25; // ms in an average year
    const birthTime = new Date('1986-09-12T05:00:00');
    setAge(((Date.now() - birthTime) / divisor).toFixed(11));
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 25);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <>{age}</>;
};

const data = [
  {
    key: 'age',
    label: 'What\'s my age again?',
    value: <Age />,
  },
  {
    key: 'location',
    label: 'Current city',
    value: 'San Diego, California',
  },
  {
    key: 'countries',
    label: 'Countries visited',
    value: 7,
    link:
      'https://www.google.com/maps/d/u/0/edit?mid=1ms8A3SDGwsct3ENuw9SkugYzb1LsNUjG&usp=sharing',
  },
  {
    key: 'device',
    label: 'Favorite gadgets',
    value: 'Roborock vacuum, Steam Deck, Anova sous vide',
  },
  {
    key: 'watching',
    label: 'Currently watching',
    value: 'Reservation Dogs, NBA Playoffs',
  },
  {
    key: 'playing',
    label: 'Currently playing',
    value: 'Hogwarts Legacy, Brotato, Stacklands',
  },
  {
    key: 'listening',
    label: 'Currently listening to',
    value: 'Nation of Languages, Nine Inch Nails, Kino',
  },
  {
    key: 'diapers',
    label: 'Diapers Changed',
    value: 'Integer overflow',
  },
];

export default data;
