import { useState, useRef, useEffect } from 'react';

// Custom hook for managing input focus
const useInputFocus = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    // Focus the input when isFocused state changes to true
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return {
    isFocused,
    inputRef,
    handleInputFocus,
    handleInputBlur,
    focusInput,
  };
};

export default useInputFocus;
