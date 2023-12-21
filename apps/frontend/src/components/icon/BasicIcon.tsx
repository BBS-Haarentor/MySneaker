import React from 'react';
import * as Icons from 'assets';

interface BasicIconProps {
  iconName: keyof typeof Icons;
  className?: string;
}

const BasicIcon: React.FC<BasicIconProps> = ({ iconName, className }) => {
  const SelectedIcon = Icons[iconName];

  if (!SelectedIcon) {
    console.error(`Icon '${iconName}' not found`);
    return null;
  }

  return <SelectedIcon className={`w-5 h-5 ${className}`} />;
};

export default BasicIcon;