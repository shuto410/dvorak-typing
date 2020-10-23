import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { dvorakLayout } from './Layout';
import './Keyboard.css';

const VirtualKeyboard: React.FC<{nextKey: string}> = (props: {nextKey: string}) => {
  const onChange = (input: string) => {
    console.log("Input changed", input);
  }

  const onKeyPress = (button: string) => {
    console.log("Button pressed", button);
  }

  const buttonTheme = [
    {
      class: "next-key",
      buttons: props.nextKey,
    }
  ]

  return (
    <Keyboard
      onChange={onChange}
      onKeyPress={onKeyPress}
      layout={dvorakLayout}
      physicalKeyboardHighlight={true}
      theme={"hg-theme-default hg-layout-default"}
      buttonTheme={buttonTheme}
    />
  );

}

export default VirtualKeyboard;