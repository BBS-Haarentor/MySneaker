import { NavLink } from 'react-router-dom';
import BasicIcon from '../icon/BasicIcon';
import React from 'react';
import * as Icons from 'assets';

interface BasicItemsProps {
  title: string;
  to: string;
  iconName: keyof typeof Icons;
  className?: string;
}

const BasicItems: React.FC<BasicItemsProps> = ({title, to, className, iconName}) => {
  return (
    <>
      <NavLink
        end
        className={isActive => (isActive.isActive ? `flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200` : `flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`) + ` ${className} my-2`}
        to={to}>
        <BasicIcon iconName={iconName} className="dark:fill-gray-200 fill-gray-700"/>
        <span className='mx-4 font-medium'>{title}</span>
      </NavLink>
    </>
  )
}

export default BasicItems;