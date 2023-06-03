import { useState, useEffect, useRef } from 'react';
export const useLanguageDropdown = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return { isDropdownVisible, setIsDropdownVisible, dropdownRef };
};
