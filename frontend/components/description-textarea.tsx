import React from 'react';

const DescriptionTextarea = ({ value, onChange, name, maxLength, error }: { value: string, onChange: any, name: string, maxLength: number, error: string | undefined }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>Description</label>
      <textarea id={name} name={name} value={value} onChange={onChange} maxLength={maxLength}></textarea>
      {error && <span className='error'>{error}</span>}
    </div>
  );
};

export default DescriptionTextarea;
