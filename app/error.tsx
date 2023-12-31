/** @format */

'use client';

import { useEffect } from 'react';
import EmptyState from './components/EmptyState';

interface IError {
  error: Error;
}

const Error: React.FC<IError> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <EmptyState title='Uh Oh' subtitle='Something went wrong!' />;
};

export default Error;
