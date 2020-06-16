import React, {useEffect, useRef, useState} from 'react';
import { Paper, Typography, Grid, ButtonBase, makeStyles } from '@material-ui/core';
//import { LoginContext } from 'contexts';
//import { Image } from 'components';
import { API } from 'helpers';
import UserDemo from '../../../images/demoUser.png';
import { LoadingScreen } from 'components';
import { EnhancedTable } from 'components';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { LayoutConfig } from "configurations";

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.dark
    }
  },
  root: {
    flexGrow: 1,
    margin: '20px'
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


let applicationTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main:
        LayoutConfig.theme !== undefined
          ? LayoutConfig.theme.colors !== undefined
            ? LayoutConfig.theme.colors.primary !== undefined
              ? LayoutConfig.theme.colors.primary
              : null
            : null
          : null
    },
    secondary: {
      main:
        LayoutConfig.theme !== undefined
          ? LayoutConfig.theme.colors !== undefined
            ? LayoutConfig.theme.colors.secondary !== undefined
              ? LayoutConfig.theme.colors.secondary
              : null
            : null
          : null
    }
  },
  typography: {
    h6: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 18,
      color: "white"
    },
    body1: {
      fontFamily: "Arial Unicode MS, Helvetica, sans-serif",
      fontSize: 16,
      color: "#d0d0d0"
    },
    body2: { fontFamily: "Helvetica, sans-serif", fontSize: 12 },
    caption: {
      color: "#d0d0d0 ",
      fontSize: "12px ",
      fontFamily: "Helvetica, sans-serif"
    },
    h5: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 21,
      color: "#00acc1"
    },
    subtitle1: {
      fontFamily: "Arial Rounded MT, Helvetica, sans-serif",
      fontWeight: "bold",
      fontSize: 10,
      color: "white"
    }
  }
});


export const Leaderboard = () => {

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


  
  return( <MuiThemeProvider theme={applicationTheme}>
    {isLoading && <LoadingScreen loadingText="Fetching Your Records"></LoadingScreen>}
     
    <div className={classes.root}>    
      <EnhancedTable data={battleResults} title={tableTitle}></EnhancedTable>
    </div>
  </MuiThemeProvider>
  );
};
