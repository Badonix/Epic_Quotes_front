import React from 'react';
import { Dropdown } from '@/components/icons';
import { useLanguageDropdown } from './useLanguageDropdown';
const LanguageDropdown: React.FC = () => {
  const {
    dropdownRef,
    setIsDropdownVisible,
    isDropdownVisible,
    handleLanguageChange,
    locale,
  } = useLanguageDropdown();
  return (
    <div
      ref={dropdownRef}
      onClick={() => setIsDropdownVisible((prev: boolean) => !prev)}
      className='select-none text-white relative hidden lg:flex items-center gap-2 cursor-pointer'
    >
      <p>{locale == 'en' ? 'ENG' : 'KA'}</p>
      <div className={`${isDropdownVisible && 'rotate-180'} `}>
        <Dropdown />
      </div>
      {isDropdownVisible && (
        <div className='absolute -bottom-14'>
          <p onClick={() => handleLanguageChange('en')}>ENG</p>
          <p onClick={() => handleLanguageChange('ka')}>KA</p>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
