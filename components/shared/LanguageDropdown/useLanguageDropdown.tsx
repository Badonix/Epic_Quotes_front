import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
export const useLanguageDropdown = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
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
  const { locale } = router;
  const handleLanguageChange = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };
  return {
    isDropdownVisible,
    setIsDropdownVisible,
    dropdownRef,
    handleLanguageChange,
    locale,
  };
};
