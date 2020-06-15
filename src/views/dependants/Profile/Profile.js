import React, {useEffect, useRef, useState} from 'react';
import { Paper, Typography, Grid, ButtonBase, makeStyles } from '@material-ui/core';
//import { LoginContext } from 'contexts';
//import { Image } from 'components';
import { API } from 'helpers';
import UserDemo from '../../../images/demoUser.png';
import { LoadingScreen } from 'components';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { LayoutConfig } from "configurations";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '20px'
  },
  '@global': {
    body: {
      backgroundColor: theme.palette.common.dark
    }
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    backgroundColor: "#242438d4",
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
    body2: { fontFamily: "Helvetica, sans-serif", fontSize: 12, color:'white' },
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


export const Profile = () => {

  const classes = useStyles();
  //const {accessToken} = useContext(LoginContext);
  const headerRef = useRef();
  const matchesPlayedRef = useRef();
  const matchesWonRef = useRef();
  const highestScoreRef = useRef();
  let [isLoading,setIsLoading] = useState(true);
  const [heightContract, setHeightContract] = useState("0vh");
  const [paddingContract, setPaddingContract] = useState("0vh 0vw");
  
  useEffect(()=>{
    API.getUserDetails((res)=>{
      headerRef.current.innerHTML= res.data.data.customerData.firstName;
      matchesPlayedRef.current.innerHTML = res.data.data.customerAdditionalData.matchesPlayed;
      matchesWonRef.current.innerHTML = res.data.data.customerAdditionalData.matchesWon;
      highestScoreRef.current.innerHTML = res.data.data.customerAdditionalData.highestScore;
      setIsLoading(false);
    });
  },[]);
  
  return(<MuiThemeProvider theme={applicationTheme}>
    {isLoading && <LoadingScreen loadingText="Fetching Your Profile"></LoadingScreen>}
    <div className={classes.root}>  
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
       
          <Grid item xs={12} sm container>
            <Grid item xs={4}>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={UserDemo} />
              </ButtonBase>
            </Grid>

            
            {/* <Grid item>
              <Typography variant="subtitle1" ref={highestScoreRef}/>
            </Grid> */}
              

            <Grid item xs={8} sm container direction="column" spacing={2}>
              <Grid item xs container direction="row">
                <Grid item xs={8}>
                  <Typography gutterBottom variant="h5" ref={headerRef}/>
                </Grid>
                <Grid item xs={4}>
                  <Grid item xs container direction="row">
                    <Grid item xs={3}>
                      <AssistantPhotoIcon/>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="h6" ref={highestScoreRef}/>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs container direction="row">
                <Grid item xs={3}>
                  <SportsKabaddiIcon/>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2" gutterBottom ref={matchesPlayedRef}/>
                </Grid>
              </Grid>
            

              <Grid item xs container direction="row">
                <Grid item xs={3}>
                  <EmojiEventsIcon style={{color:'#ff9800'}}/>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2" ref={matchesWonRef}/>
                </Grid>
              </Grid>

            </Grid>

          </Grid>

        </Grid>

        
      </Paper>
    </div>
  </MuiThemeProvider>
  );
};
