import React from 'react';

const ErrorMessage: React.FC<{ text: string }> = ({ text }) => {
  return <p className="mt-1 text-xs text-error">{text}</p>;
};

export default ErrorMessage;
