import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CustomAvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="bg-primary-100 text-primary-600 font-medium">
        {initials || alt.substring(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
