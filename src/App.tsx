import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import TypingGame from './components/TypingGame';
import Ranking from './components/Ranking';
import Setting from './components/Setting';
import {
  AppBar,
  Toolbar,
  Button,
} from '@material-ui/core';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const THEME = createMuiTheme({
  typography: {
    'fontSize': 18,
    'fontWeightLight': 300,
    'fontWeightRegular': 400,
    'fontWeightMedium': 500,
  }
});

const useStyles = makeStyles({
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  tabButton: {
    border: 0,
    borderRadius: 0,
    focusVisible: {},
    paddingTop: 12,
    paddingBottom: 12,
    textTransform: 'none',
    boxShadow: 'none',
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <MuiThemeProvider theme={THEME}>
        <BrowserRouter>
          <AppBar
            position='static'
            color='default'
            style={{
              boxShadow: 'none',
            }}
          >
            <Toolbar
              variant='dense'
            >
              <Button color='inherit'
                component={Link}
                to='/'
                className={classes.tabButton}
                startIcon={<KeyboardIcon />}
              >
                Dvorak-Typing
              </Button>
              <section className={classes.rightToolbar}>
                <Button color='inherit'
                  component={Link}
                  to='/ranking'
                  className={classes.tabButton}
                  disableElevation
                >
                  Ranking
                </Button>
                <Button color='inherit'
                  component={Link}
                  to='/setting'
                  className={classes.tabButton}
                  disableElevation
                >
                  Setting
                </Button>
              </section>
            </Toolbar>
          </AppBar>
          <div>
            <Route exact path='/' component={TypingGame} />
            <Route exact path='/ranking' component={Ranking} />
            <Route exact path='/setting' component={Setting} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
