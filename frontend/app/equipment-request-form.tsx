import React, { useState } from 'react';
import CategorySelector from '../components/category-selector';
import DescriptionTextarea from '../components/description-textarea';
import ConfirmationMessage from '../components/confirmation-message';
import useForm from '../hooks/useForm';
import validation from '../utils/validation';
import './equipment-request-form.css';

const EquipmentRequestForm = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const { values, errors, handleChange, handleSubmit } = useForm(
    submitRequest,
    {
      categoryId: '',
      description: '',
    },
    validation.validateEquipmentRequest
  );

  async function submitRequest(data) {
    try {
      const response = await fetch('/api/equipment/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      const result = await response.json();
      setConfirmationMessage(result.message);
      setShowConfirmation(true);
    } catch (err) {
      setConfirmationMessage(err.message);
      setShowConfirmation(true);
    }
  }

  return (
    <div className='equipment-request-form'>
      <h2>Submit Equipment Request</h2>
      <form onSubmit={handleSubmit}>
        <CategorySelector
          name='categoryId'
          value={values.categoryId}
          onChange={handleChange}
          error={errors.categoryId}
          />
        <DescriptionTextarea
          name='description'
          value={values.description}
          onChange={handleChange}
          error={errors.description}
          />
        <button type='submit'>Submit</button>
      </form>
      {showConfirmation && <ConfirmationMessage message={confirmationMessage} />}
    </div>
  );
};

export default EquipmentRequestForm;
