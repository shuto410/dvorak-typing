import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { dvorakLayout } from './Layout';


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
      layout={dvorakLayout}
      physicalKeyboardHighlight={true}
    />
  );

}

export default VirtualKeyboard;