import React, { useEffect } from 'react';
import useDbState from '../../hooks/useDbState';

const NestedObjectTest = () => {
  const [userProfile, setUserProfile] = useDbState('userProfile', {
    name: 'Alice',
    age: 25,
    address: {
      street: '123 Main St',
      city: 'Springfield',
      country: 'USA',
    },
    preferences: {
      theme: 'dark',
      language: 'en',
    },
  });

  useEffect(() => {
    console.log('User profile loaded:', userProfile);
  }, [userProfile]);

  const updateName = () => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      name: 'Bob',
    }));
  };

  const updateAddress = () => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      address: {
        ...prevProfile.address,
        street: '456 Elm St',
      },
    }));
  };

  const updatePreferences = () => {
    setUserProfile(prevProfile => ({
      ...prevProfile,
      preferences: {
        ...prevProfile.preferences,
        theme: 'light',
      },
    }));
  };

  return (
    <div>
      <h3>ObjectTest Component</h3>
      <div>
        <h4>Profile</h4>
        <p>Name: {userProfile.name}</p>
        <p>Age: {userProfile.age}</p>
        <p>Street: {userProfile.address.street}</p>
        <p>City: {userProfile.address.city}</p>
        <p>Country: {userProfile.address.country}</p>
        <p>Theme: {userProfile.preferences.theme}</p>
        <p>Language: {userProfile.preferences.language}</p>
      </div>
      <button onClick={updateName}>Update Name to Bob</button>
      <button onClick={updateAddress}>Update Street to 456 Elm St</button>
      <button onClick={updatePreferences}>Update Theme to Light</button>
      <br />
      <hr />
      <br />
    </div>
  );
};

export default NestedObjectTest;
