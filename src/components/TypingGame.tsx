import React, { useState, useEffect, useCallback } from 'react';
import VirtualKeyboard from './Keyboard';
import { englishWords, japaneseWords, Word } from './Words';
import Switch from './Switch';
import { enableForceDvorakMode, disableForceDvorakMode } from '../lib/KeySwitcher';
import { typingOption, saveForceDvorakModeOption } from '../lib/Options';

/**
 * Get a ramdom word.
 * @param words target words to select ramdomly.
 * @return a ramdom selected word.
 */
const getRandomWord = (words: Array<Word>) => {
  return words[Math.floor(Math.random() * words.length)];
}

type GameState = 'playing' | 'paused' | 'end'

const TypingGame: React.FC<{options: typingOption}> = ({options}) => {
  const [currentWord, setCurrentWord] = useState<string>(' Let\'s Dvorak! Press Space to start!');
  const [currentWordLabel, setCurrentWordLabel] = useState<string>('');
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [missCount, setMissCount] = useState<number>(0);
  const timeLimit = 30;
  const [time, setTime] = useState<number>(timeLimit);
  const [gameState, setGameState] = useState<GameState>('paused');
  const [forceDvorakMode, setForceDvorakMode] = useState<boolean>(options.forceDvorakMode);
  const [nextKey, setNextKey] = useState<string>('Space');
  const [languageMode] = useState<string>('Japanese');

  /**
   * get new word and update current word and next key
   */
  const setNewWord = useCallback(() => {
    const words = (languageMode === 'English') ? englishWords : japaneseWords;
    const nextWord = getRandomWord(words);
    setCurrentWord(nextWord.letter);
    setCurrentWordLabel(nextWord.label);
    setNextKey(nextWord.letter[0]);
  }, [languageMode]);

  /**
   * Initialize typing game.
   */
  const initializeGame = useCallback(() => {
    setNewWord();
    setTime(timeLimit);
    setGameState('playing');
    setScore(0);
    setMissCount(0);
    setCurrentPosition(0);
  }, [setNewWord]);

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
    saveForceDvorakModeOption(forceDvorakMode);
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
        setCurrentPosition(0);
        setNewWord();
        return;
      }
      setScore(score+1);
      setCurrentWord(placeholder + currentWord.substring(nextPosition));
      setCurrentPosition(nextPosition);
      setNextKey(currentWord[nextPosition]);
    } else {
      setMissCount(missCount+1);
      setScore(score-1);
    }
  }, [gameState, currentWord, currentPosition, score, missCount, initializeGame, setNewWord]);

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
        <h1 style={{margin: '50px 0px 0px 0px'}}>{currentWordLabel}</h1>
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
