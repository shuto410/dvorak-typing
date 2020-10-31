import React, { useState, useEffect, useCallback } from 'react';
import VirtualKeyboard from './Keyboard';
import { words } from './Words';
import Switch from '@material-ui/core/Switch';
import { enableForceDvorakMode, disableForceDvorakMode } from '../lib/KeySwitcher';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

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
  const [nextKey, setNextKey] = useState<string>('Space');

  /**
   * get new word and update current word and next key
   */
  const setNewWord = useCallback(() => {
    const nextWord = getRandomWord(words);
    setCurrentWord(nextWord);
    setNextKey(nextWord[0]);
  }, []);

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

  const submitResult = () => {
    const uname = localStorage.getItem('username');
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const rsurl = localStorage.getItem('rankingServerUrl');
    if (!uname || !rsurl) {
      window.confirm('Please set username and server url.')
      setGameState('paused');
      return;
    }
    const params = new URLSearchParams();
    params.append('name', uname);
    params.append('score', score.toString());
    axios
      .post(CORS_PROXY + rsurl, params)
      .then(response => {
        // setGameState('ready'); // まだ'ready'実装ブランチがmergeされていない
        setGameState('paused');
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <Container>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems="center"
        fontFamily='monospace'
        letterSpacing='3px'
        height='100vh'
      >
        <h2>Time: {time}</h2>
        <h1>{currentWord}</h1>
        {gameState === 'end' ? (
          <Button
            variant="outlined"
            size='small'
            color="primary"
            onClick={submitResult}
          >
            Submit
          </Button>
        ) : (
          <></>
        )}
        <VirtualKeyboard nextKey={nextKey}/>
        <Box
          display='flex'
          alignItems='center'
          fontSize='16px'
          letterSpacing='1px'
        >
          <Switch
            checked={forceDvorakMode}
            onChange={() => setForceDvorakMode(!forceDvorakMode)}
            color='primary'
          />
          <div>Switch 'qwerty' to 'dvorak'</div>
        </Box>
      </Box>
    </Container>
  )
}

export default TypingGame
