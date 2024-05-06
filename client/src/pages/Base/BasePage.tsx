import React, { ReactNode } from 'react';
import { baseBackgroundImageUrl } from '@/constants/assetPaths';

export const BasePage: React.FC<{ children: ReactNode; className?: string }> = ({children, className}) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-start ${className}`.trim()} 
    style={{
        backgroundImage: `url(${baseBackgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }}
    >
        {children}
    </div>
  )
}
