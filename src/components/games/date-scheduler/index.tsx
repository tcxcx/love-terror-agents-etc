'use client';

import React from 'react';

interface DateSchedulerProps {
  location?: string;
  details?: string;
  calendlyLink?: string;
}

export const DateScheduler: React.FC<DateSchedulerProps> = ({
  location,
  details,
  calendlyLink
}) => {
  return (
    <div className="p-6 bg-pink-500/10 rounded-lg tool-content">
      <h3 className="text-xl font-bold mb-4 text-pink-400">Your Special Date</h3>
      
      {location && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Location</h4>
          <p className="text-pink-300">{location}</p>
        </div>
      )}

      {details && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Details</h4>
          <p className="text-pink-300 whitespace-pre-wrap">{details}</p>
        </div>
      )}

      {calendlyLink && (
        <div className="mt-6">
          <a 
            href={calendlyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Schedule Your Date
          </a>
        </div>
      )}
    </div>
  );
};