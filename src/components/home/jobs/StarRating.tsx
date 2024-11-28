'use client';
import React, { useState } from 'react';
import RatingStar from './RatingStar';

const StarRating: React.FC<any> = ({ rating = 0, className, ...props }) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const [hoverRating, setHoverRating] = useState(rating);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => {
            setCurrentRating(star);
          }}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          {...props}
        >
          <RatingStar
            className={className}
            fill={`${currentRating >= star ? '#197CC0' : hoverRating >= star ? '#166194' : 'none'}`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
