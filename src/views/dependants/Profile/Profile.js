import React, {useEffect,useContext, useRef} from 'react';
import { Paper, Typography, Grid, ButtonBase, makeStyles } from '@material-ui/core';
import { LoginContext } from 'contexts';
import { Image } from 'components';
import { API } from 'helpers';
import UserDemo from '../../../images/demoUser.png';

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

export const Profile = (props) => {

  const classes = useStyles();
  const {accessToken} = useContext(LoginContext);
  const headerRef = useRef();
  const matchesPlayedRef = useRef();
  const matchesWonRef = useRef();
  const highestScoreRef = useRef();

  useEffect(()=>{
     API.getUserDetails((res)=>{
       headerRef.current.innerHTML= res.data.data.customerData.firstName;
       matchesPlayedRef.current.innerHTML = res.data.data.customerAdditionalData.matchesPlayed;
       matchesWonRef.current.innerHTML = res.data.data.customerAdditionalData.matchesWon;
       highestScoreRef.current.innerHTML = res.data.data.customerAdditionalData.highestScore;
     })
  },[]);
  
  return(<div className={classes.root}>
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src={UserDemo} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" ref={headerRef}/>

              <Typography variant="body2" gutterBottom ref={matchesPlayedRef}/>

              <Typography variant="body2" color="textSecondary" ref={matchesWonRef}/>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" ref={highestScoreRef}/>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </div>
);
}
