import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboardVisible = (): boolean => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', () =>
      setKeyboardVisible(true)
    );
    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};
