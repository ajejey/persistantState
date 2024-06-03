// UserForm.js
import React from 'react';
import usePersistentState from './usePersistentState';

const UserForm = () => {
  const dbName = 'userDatabase';
  const storeName = 'userData';
  const fields = ['name', 'email', 'phone', 'address', 'subscribe'];
  
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
    subscribe: false,
  };

  const getFieldKey = (fieldName) => `${fieldName}_field`;

  // const [formValues, setFormValues] = usePersistentState(dbName, storeName, 'formData', initialValues);
  const [formValues, setFormValues] = usePersistentState('formData', initialValues);

  const handleChange = (fieldName, value) => {
    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
  };

  return (
    <form>
      <label>
        Name:
        <input
          type="text"
          value={formValues.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={formValues.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </label>

      <label>
        Phone:
        <input
          type="tel"
          value={formValues.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </label>

      <label>
        Address:
        <textarea
          value={formValues.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />
      </label>

      <label>
        Subscribe to newsletter:
        <input
          type="checkbox"
          checked={formValues.subscribe}
          onChange={(e) => handleChange('subscribe', e.target.checked)}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
