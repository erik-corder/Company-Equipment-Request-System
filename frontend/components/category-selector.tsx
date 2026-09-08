import React from 'react';

const categories = ['laptops', 'monitors', 'keyboards', 'software licenses', 'accessories'];

const CategorySelector = ({ value, onChange, name, error }: { value: string, onChange: any, name: string, error: string | undefined }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>Category</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        <option value='' disabled>Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      {error && <span className='error'>{error}</span>}
    </div>
  );
};

export default CategorySelector;
