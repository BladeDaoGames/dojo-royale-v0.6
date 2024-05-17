import React, { ReactNode } from 'react';
import { baseBackgroundImageUrl } from '@/constants/assetPaths';
import { Toaster } from 'react-hot-toast';

export const BasePage: React.FC<{ children: ReactNode; className?: string }> = ({children, className}) => {
  return (
    <div className={`min-h-screen h-screen flex flex-col items-center justify-start ${className}`.trim()} 
    style={{
        backgroundImage: `url(${baseBackgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }}
    >
        {children}
        <Toaster position="top-center" toastOptions={{
            success:{
              style:{
                background: "#FEE9D7",
                color: "#34222E",
                border: "2px solid #53C576",
                borderRadius: "0.375rem",
              }
            },
            error:{
              style:{
                background: "#FEE9D7",
                color: "#34222E",
                border: "2px solid #C33030",
                borderRadius: "0.375rem",
              }
            }
          }}/>
    </div>
  )
}
