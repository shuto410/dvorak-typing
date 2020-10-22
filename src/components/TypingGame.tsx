import React, { useState, useEffect, useCallback } from 'react';
import VirtualKeyboard from './Keyboard';
import { words } from './Words';
import Switch from './Switch';
import { enableForceDvorakMode, disableForceDvorakMode } from '../lib/KeySwitcher';

/**
 * Get a ramdom word.
 * @param words target words to select ramdomly.
 * @return a ramdom selected word.
 */
const getRandomWord = (words: Array<string>) => {
  return words[Math.floor(Math.random() * words.length)];
}

type GameState = 'playing' | 'paused' | 'end'

const TypingGame: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<string>(' Let\'s Dvorak! Press Space to start!');
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [missCount, setMissCount] = useState<number>(0);
  const timeLimit = 30;
  const [time, setTime] = useState<number>(timeLimit);
  const [gameState, setGameState] = useState<GameState>('paused');
  const [forceDvorakMode, setForceDvorakMode] = useState<boolean>(false);

  /**
   * Initialize typing game.
   */
  const initializeGame = () => {
    setCurrentWord(getRandomWord(words));
    setGameState('playing');
    setTime(timeLimit);
    setScore(0);
    setMissCount(0);
  }

  // Count down timer
  useEffect(() => {
    if (gameState === 'paused' || gameState === 'end') {
      return;
    }
    if (!time) {
      setGameState('end');
      return;
    }
    const intervalId = setInterval(() => {
      setTime(time-1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time, gameState]);

  // Swithing force dvorak mode
  useEffect(() => {
    if (forceDvorakMode) {
      enableForceDvorakMode()
    } else {
      disableForceDvorakMode()
    }
  }, [forceDvorakMode])

  useEffect(() => {
    if (gameState === 'end') {
      const resultMsg = 'Your score: ' + score.toString() + '  Miss: ' + missCount.toString();
      setCurrentWord(' Game End! ' + resultMsg);
    }
  }, [gameState, score, missCount])

  /**
   * Callback to deal with keyboard inputs.
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (gameState === 'paused' || gameState === 'end') {
      // press space to start
      if (event.code === 'Space') {
        initializeGame();
      }
      return;
    }
    if (event.key === currentWord[currentPosition]) {
      const nextPosition = currentPosition + 1;
      let placeholder = '';
      for (let i = 0; i < nextPosition; i++) {
        placeholder += '_';
      }
      // After typing a word to the end, set a next word.
      if (nextPosition === currentWord.length) {
        setCurrentWord(getRandomWord(words));
        setCurrentPosition(0);
        return;
      }
      setScore(score+1);
      setCurrentWord(placeholder + currentWord.substring(nextPosition));
      setCurrentPosition(nextPosition);
    } else {
      setMissCount(missCount+1);
      setScore(score-1);
    }
  }, [gameState, currentWord, currentPosition, score, missCount]);

  // Register callback for keyboard inputs.
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'monospace',
        letterSpacing: '3px',
        height: '100vh'}}
      >
        <h2>Time: {time}</h2>
        <h1>{currentWord}</h1>
        <VirtualKeyboard/>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: '40px',
          width: '350px',
          fontSize: '16px',
          letterSpacing: '1px'}}
        >
          <Switch
            isOn={forceDvorakMode}
            handleToggle={() => setForceDvorakMode(!forceDvorakMode)}
          />
          <div>Switch 'qwerty' to 'dvorak'</div>
        </div>
      </div>
    </div>
  )
}

export default TypingGame
