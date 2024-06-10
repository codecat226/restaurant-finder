import React from 'react';

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return <p>{error}</p>;
};

export default ErrorMessage;