import React from 'react';
import {XPProvider} from './context/XPContext';

export function Root({children}: {children: React.ReactNode}) {
  return (
    <XPProvider>
      {children}
    </XPProvider>
  );
}
