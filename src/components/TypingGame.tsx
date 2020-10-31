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

type GameState = 'ready' | 'playing' | 'end' | 'restart' ;

const TypingGame: React.FC = () => {
  const initialMessage = ' Let\'s Dvorak! Press Space to start!';
  const [currentWord, setCurrentWord] = useState<string>(initialMessage);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [missCount, setMissCount] = useState<number>(0);
  const timeLimit = 30;
  const [time, setTime] = useState<number>(timeLimit);
  const [gameState, setGameState] = useState<GameState>('ready');
  const [forceDvorakMode, setForceDvorakMode] = useState<boolean>(false);
  const [nextKey, setNextKey] = useState<string>('Space');

  /**
   * get new word and update current word and next key
   * Update current word and next key to type.
   * @param word: word to set
   * @param position: next position of word to type
   */
  const updateWordToType = (word: string, position: number) => {
    setCurrentWord(word);
    setNextKey(word[position]);
    setCurrentPosition(position);
  }

  /**
   * Initialize typing game.
   * Reset bellow states.
   *   - time
   *   - score
   *   - missCount
   *   - currentWord: => Initial message.
   *   - nextKey => empty
   */
  const initializeGame = useCallback(() => {
    setTime(timeLimit);
    setScore(0);
    setMissCount(0);
    setCurrentWord(initialMessage);
    // Set the key that doesn't exist
    // to avoid warning that ocuur when tyring to set empty string.
    setNextKey('NoneKey');
  }, []);

  /**
   * Start typing game.
   */
  const startGame = useCallback(() => {
    const word = getRandomWord(words);
    updateWordToType(word, 0);
    setGameState('playing');
  }, []);

  /**
   * Finish game and show results.
   */
  const finishGame = useCallback(() => {
    const resultMsg = 'Your score: ' + score.toString() + '  Miss: ' + missCount.toString();
    setCurrentWord(' Game End! ' + resultMsg);
    setNextKey('NoneKey');
  }, [score, missCount]);

  /**
   * Count down timer.
   * Count time only while game state is 'playing'.
   * when the remaining time runs out, game state is set to be 'end'.
   */
  useEffect(() => {
    if (gameState !== 'playing') {
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

  /**
   * Switch force dvorak mode.
   */
  useEffect(() => {
    if (forceDvorakMode) {
      enableForceDvorakMode()
    } else {
      disableForceDvorakMode()
    }
  }, [forceDvorakMode])

  /**
   * Manage the progress of the game.
   */
  useEffect(() => {
    if (gameState === 'playing') {
      ;
    } else if (gameState === 'ready') {
      initializeGame();
    } else if (gameState === 'end') {
      finishGame();
    } else if (gameState === 'restart') {
      initializeGame();
      startGame();
    }
  }, [gameState, initializeGame, finishGame, startGame])

  /**
   * handler used when game is 'playing'
   *
   * Special key:
   *   - Esc: stop the game and return to the beggining.
   */
  const handleKeyDownOnPlaying = useCallback((event: KeyboardEvent) => {
    // Press escape key to stop the game and return to the beggining.
    if (event.code === 'Escape') {
      setGameState('ready');
      return;
    }
    if (event.key === currentWord[currentPosition]) {
      const nextPosition = currentPosition + 1;
      // When finished typing a word to the end, set the next word.
      if (nextPosition === currentWord.length) {
        const nextWord = getRandomWord(words);
        updateWordToType(nextWord, 0);
        return;
      }
      const placeholder = '_'.repeat(nextPosition);
      const nextWord = placeholder + currentWord.substring(nextPosition);
      updateWordToType(nextWord, nextPosition);
      setScore(score => score+1);
    } else {
      setScore(score => score-1);
      setMissCount(missCount => missCount+1);
    }
  }, [currentWord, currentPosition]);

  /**
   * handler used when game is not 'playing'
   *
   * Special key:
   *   - Space: restart the game
   *   - Esc: stop the game and return to the beggining.
   */
  const handleKeyDownOnNotPlaying = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Space') {
      setGameState('restart');
    } else if (event.code === 'Escape') {
      setGameState('ready');
    }
  }, []);

  /**
   * Register callback for keyboard event.
   * Switch the handler to be registered depending on the game state.
   */
  useEffect(() => {
    if (gameState === 'playing') {
      window.addEventListener('keydown', handleKeyDownOnPlaying);
      return () => window.removeEventListener('keydown', handleKeyDownOnPlaying);
    } else {
      window.addEventListener('keydown', handleKeyDownOnNotPlaying);
      return () => window.removeEventListener('keydown', handleKeyDownOnNotPlaying);
    }
  }, [gameState, handleKeyDownOnPlaying, handleKeyDownOnNotPlaying]);

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
        <VirtualKeyboard nextKey={nextKey}/>
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
