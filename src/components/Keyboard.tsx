import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const VirtualKeyboard: React.FC = () => {
  const onChange = (input: string) => {
    console.log("Input changed", input);
  }

  const onKeyPress = (button: string) => {
    console.log("Button pressed", button);
  }

  return (
    <Keyboard
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );

}

export default VirtualKeyboard;