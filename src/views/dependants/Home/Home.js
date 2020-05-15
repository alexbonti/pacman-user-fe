import React, { useEffect, useContext, useState, useRef } from 'react';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import { HeaderElements } from 'components';
import { LayoutContext } from 'contexts';
import FileIcon from '../../../images/file.png';
import { API } from 'helpers/index';
import { notify } from 'components/index';

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
  const [documentFile,setDocumentFile] = useState('');
  const [isValid,setIsValid] = useState(true);
  const errorText='Please Pick a Valid File';
  let fileUrl = useRef('');
  let fileIsValid;
  const [previewUrl,setPreviewUrl] = useState();
  const { setHeaderElements, pageTitle } = useContext(LayoutContext);

  const startGame = (event) =>{
    let userData = { fileUrl: fileUrl.current};
    API.startGame(userData , (res) =>{
      console.log('Hopeful for a Start of Game'+ res);
    });
  };

  const imageChangeHandler = (event) =>{
    let pickedFile;
    fileIsValid = isValid;

    if(event.target.files && event.target.files.length === 1){
      pickedFile = event.target.files[0];
      setDocumentFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    }else{
      fileIsValid = false;
    }

  };

  useEffect(()=>{
    if(!documentFile){
      return;
    }
    
    const formData = new FormData();
    formData.append('documentFile',documentFile);

    API.uploadDocument(formData, (res) =>{
      let data ={fileUrl: res.data.data.documentFileUrl.original};
      fileUrl.current = res.data.data.documentFileUrl.original;
      API.updateUser(data, (res) =>{
        setPreviewUrl(FileIcon);
        notify('File Uploaded Successfully');
      });
    });
  },[documentFile]);


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

      <form noValidate>  
        <input accept="file/*" 
          className={classes.input} 
          id="contained-button-file" 
          multiple 
          type="file" 
          required
          description="document file"
          name="documentFile"
          onChange = {imageChangeHandler}
        />

        <div>
          <div>
            {previewUrl && <img src={previewUrl} alt="Preview" width="200px" height="200px"/>}
            {!previewUrl && !fileIsValid && <p>{errorText}</p>}
          </div>

          <label htmlFor="contained-button-file">
            <Button fullWidth variant="contained" color="primary" className={classes.buttons} component="span">
               Upload
            </Button>
          </label>
        </div>
        <br></br>
        <Button fullWidth variant="contained" color="primary" className={classes.buttons} onClick={startGame}>Start</Button>
            
      </form>
    </div>
  </Grid>);
};
