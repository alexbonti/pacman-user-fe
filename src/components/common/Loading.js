import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid, Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'center'
  },
  pacman: {
    position: 'relative'
  },
  pacman___div_nth_child_1: {
    width: '0',
    height: '0',
    border: '37.5px solid #00acc1',
    borderRightColor: 'transparent',
    borderRadius: '50%',
    left: '-20px',
    position: 'relative'
  },
  pacman___div_nth_child_2: {
    marginTop: '-75px'
  },
  pacman___div_nth_child_3: {
    backgroundColor: '#ff9800',
    borderRadius: '50%',
    width: '15px',
    height: '15px',
    position: 'absolute',
    top: '30px',
    left: '55px'
  }
}));
export const LoadingScreen = (props) => {
  let classes = useStyles();
  return (<Grid container spacing={0} direction={'column'} justify="center" alignItems="center" className={classes.root}>
   
    < Grid item className={classes.loadingCircle}>
      <CircularProgress/>
    </Grid>
    <div className={classes.pacman}>
      <div className={classes.pacman___div_nth_child_1}></div>
      <div className={classes.pacman___div_nth_child_2}></div>
      <div className={classes.pacman___div_nth_child_3}></div>
    </div>
  </Grid >);
};

LoadingScreen.propTypes = {
  loadingText: PropTypes.string
};
