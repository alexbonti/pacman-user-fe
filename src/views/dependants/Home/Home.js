import React, { useEffect, useContext } from 'react';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import { HeaderElements } from 'components';
import { LayoutContext } from 'contexts';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));


export const Home = () => {
  const classes = useStyles();
  const { setHeaderElements, pageTitle } = useContext(LayoutContext);
  useEffect(() => {
    setHeaderElements(<HeaderElements>
      <Typography>
        {pageTitle}
      </Typography>
    </HeaderElements>);
  }, [pageTitle, setHeaderElements]);
  
  return (<Grid container justify='flex-start' direction='column' alignItems='center'>
    <Grid item xs={12} xl={2} lg={4} md={6} sm={8}>
      <Typography variant="h2" align="center">
        Select the Mode
      </Typography>
     </Grid>

     <div className={classes.root}>
      <input
        accept="file/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  </Grid>);
};
