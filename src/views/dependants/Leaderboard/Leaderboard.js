import React, {useEffect, useRef, useState} from 'react';
import { Paper, Typography, Grid, ButtonBase, makeStyles } from '@material-ui/core';
//import { LoginContext } from 'contexts';
//import { Image } from 'components';
import { API } from 'helpers';
import UserDemo from '../../../images/demoUser.png';
import { LoadingScreen } from 'components';
import { EnhancedTable } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export const LeaderBoard = () => {

  const classes = useStyles();
  
  let [isLoading,setIsLoading] = useState(true);
  let records = [];
  const [tableTitle,setTableTitle] = useState('Leaderboard');
  const [battleResults,setBattleResults] = useState(records);

  useEffect(()=>{
    API.getLeaderBoard((res)=>{
      let responseArray = res.data.data.battleResults;
      let arrayTemp=[];

      for(let i=0;i<responseArray.length;i++){
        arrayTemp.push(responseArray[i]);
      }

      setBattleResults(arrayTemp);
      // setBattleResults(res.data);
      setIsLoading(false);
    });
  },[]);
  
  return(<div className={classes.root}>
    {isLoading && <LoadingScreen loadingText="Fetching Your Records"></LoadingScreen>}

    <EnhancedTable data={battleResults} title={tableTitle}></EnhancedTable>
    
  </div>
  );
};
