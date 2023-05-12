import React, { useState, useEffect } from 'react';

const Age = () => {
  const [age, setAge] = useState();

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24; // ms in an average year
    const birthTime = new Date('2023-05-12T05:00:00');
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
    label: 'Days since website was last updated',
    value: <Age />,
  },
  {
    key: 'technical',
    label: 'Technical skills',
    value: 'Python, Java, C++, C, JavaScript, SQL, MongoDB, Neo4j, Jira',
  },
];

export default data;
