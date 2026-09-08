import React from 'react';

const ConfirmationMessage = ({ message }: { message: string }) => {
  const isSuccess = !message.includes('Failed');

  return (
    <div className={`confirmation-message ${isSuccess ? 'success' : 'error'}`}>{message}</div>
  );
};

export default ConfirmationMessage;
