import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import AccountBox from '@material-ui/icons/AccountBox';
import CloudIcon from '@material-ui/icons/Cloud';
import FormControl from '@material-ui/core/FormControl';
import { InputAdornment } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    button: {
      '& > *': {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
      }
    }
  })
});

const Setting: React.FC = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [rankingServerUrl, setRankingServerUrl] = useState('');

  useEffect(() => {
    const loadSettings = () => {
      const uname: string | null = localStorage.getItem('username');
      const rsurl: string | null  = localStorage.getItem('rankingServerUrl');
      if (uname !== null) {
        setUsername(uname);
      }
      if (rsurl !== null) {
        setRankingServerUrl(rsurl);
      }
    }
    loadSettings();
  }, []);

  const saveSettings = () => {
    localStorage.setItem('username', username);
    localStorage.setItem('rankingServerUrl', rankingServerUrl);
  }

  const clearSettings = () => {
    setUsername('');
    setRankingServerUrl('');
    localStorage.clear();
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value);
  }

  return (
    <Container maxWidth='lg'>
      <h1>Setting</h1>
      <FormControl fullWidth>
        <InputLabel htmlFor="input-with-icon-adornment">username</InputLabel>
        <Input
          value={username}
          onChange={(e) => handleChange(e, setUsername)}
          startAdornment={
            <InputAdornment position="start">
              <AccountBox />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="input-with-icon-adornment">server-url</InputLabel>
        <Input
          value={rankingServerUrl}
          onChange={(e) => handleChange(e, setRankingServerUrl)}
          startAdornment={
            <InputAdornment position="start">
              <CloudIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <div className={classes.button}>
      <Button
        size='small'
        variant="outlined"
        onClick={saveSettings}
      >
        Save
      </Button>
      <Button
        size='small'
        variant="outlined"
        onClick={clearSettings}
      >
        Clear
      </Button>
      </div>
    </Container>
  )
}

export default Setting
