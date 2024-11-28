import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = ({ color = '#fff', size = 18 }) => {
  return <ClipLoader color={color} size={size} />;
};

export default Loading;
