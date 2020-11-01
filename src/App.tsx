import React from 'react';
import TypingGame from './components/TypingGame';
import { typingOption, loadForceDvorakModeOption } from './lib/Options';

const App: React.FC = () => {
  const options: typingOption = {
    forceDvorakMode: loadForceDvorakModeOption(),
  }

  return (
    <div>
      <TypingGame options={options}/>
    </div>
  );
}

export default App;
