import React from 'react'
import usePersistentState from '../usePersistentState';

const MyForm = () => {
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

      const [formValues, setFormValues] = usePersistentState('formData', initialValues)

    const handleChange = (fieldName, value) => {
        setFormValues({
            ...formValues,
            [fieldName]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formValues);
        setFormValues(initialValues);
    }
    return (
        <form onSubmit={handleSubmit}>
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
    )
}

export default MyForm


