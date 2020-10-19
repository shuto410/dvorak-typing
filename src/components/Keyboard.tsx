import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const layout = {
  default: [
    '` 1 2 3 4 5 6 7 8 9 0 [ ] {bksp}',
    '{tab} \' , . p y f g c r l / = \\',
    '{lock} a o e u i d h t n l - {enter}',
    '{shift} ; q j k x b m w v z {shift}',
    '{space}'
  ],
  shift: [
    '~ ! @ # $ % ^ & * ( ) { } {bksp}',
    '{tab} " < > P Y F G C R L ? + |',
    '{lock} A O E U I D H T L S _ {enter}',
    '{shift} : Q J K X B M W V Z {shift}',
    '{space}'
  ]
}

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
      layout={layout}
    />
  );

}

export default VirtualKeyboard;