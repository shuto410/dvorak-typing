import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Button,
  CircularProgress,
  Container,
  Paper,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: blueGrey[800],
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 16,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

interface ScoreData {
  uuid: string,
  timestamp: string,
  name: string,
  score: string,
}

/**
 * 得点の高い順にソートし、各ユーザの最高点データのみを返す。
 * @param scores
 * @return uniqueScores: 各ユーザの最高得点順が高い順にソートしたスコア
 */
const sortRanking = (scores: Array<ScoreData>) => {
  scores.sort((a, b) => Number(a.score) > Number(b.score) ? -1 : 1);
  const names = new Set();
  const uniqueScores: Array<ScoreData> = [];
  scores.forEach((score: any) => {
    if (!names.has(score.name)) {
      uniqueScores.push(score);
      names.add(score.name);
    }
  })
  return uniqueScores;
}

const ScoreBoard: React.FC<{data: Array<ScoreData>}> = ({data}) => {
  return (
    <Paper variant='outlined' square>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align='right'>Rank</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align='right'>Score</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((d: ScoreData, index: number) => (
              <StyledTableRow key={index}>
                <StyledTableCell style={{width: '10%'}} align="right">{index+1}</StyledTableCell>
                <StyledTableCell style={{width: '60%'}}>{d.name}</StyledTableCell>
                <StyledTableCell style={{width: '20%'}} align="right">{d.score}</StyledTableCell>
                <StyledTableCell style={{width: '10%'}} align="right">{d.timestamp.slice(0, 8)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

const ReloadButton: React.FC<{onClick: () => void}> = ({onClick}) => {
  return (
    <Button
      variant='outlined'
      size='small'
      color="primary"
      startIcon={<RefreshIcon/>}
      onClick={onClick}
    >
      Reload
    </Button>
  )
}

const Ranking: React.FC = () => {
  const [data, setData] = useState<Array<ScoreData>>([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('')
  const [errMsg, setErrMsg] = useState('');

  const startLoading = () => {
    setLoading(true);
  }

  /**
   * localStorageからurlを読み出し、urlが空でなければfetch処理をtrigger
   */
  const startFetchingScores = () => {
    const rsUrl: string | null = localStorage.getItem('rankingServerUrl');
    if (!rsUrl) {
      setLoading(false);
      return;
    }
    setUrl(rsUrl);
    setLoading(true);
  }

  useEffect(() => {
    startFetchingScores();
  }, []);

  useEffect(() => {
    // To avoid 'Warning: Can't perform a React state update on an unmounted component.'
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
    let isMounted = true;
    if (!url) {
      return;
    }
    axios({
      method: 'get',
      url: url,
      timeout: 4000,
    })
      .then(response => {
        const scores: Array<ScoreData> = response.data;
        const uniqueScores = sortRanking(scores);
        if (isMounted) {
          setData([...uniqueScores]);
          setLoading(false);
          setErrMsg('');
        }
      })
      .catch(error => {
        setErrMsg('Error! Please confirm setting.');
        setLoading(false);
      })
    return () => { isMounted = false };
  }, [url]);

  return (
    <Container maxWidth='md'>
      <h1>Ranking</h1>
      {url ? (
        <ReloadButton onClick={startLoading} />
      ) : (
        <h3>Please set score-board endpoint from setting.</h3>
      )}
      <h2>{errMsg}</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <ScoreBoard data={data} />
      )}
    </Container>
  )
}

export default Ranking
