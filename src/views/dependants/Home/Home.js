import React, { useEffect, useContext, useState, useRef } from 'react';
import { Grid, Typography, Button, makeStyles } from '@material-ui/core';
import { HeaderElements } from 'components';
import { LayoutContext } from 'contexts';
import FileIcon from '../../../images/file.png';
import { API } from 'helpers/index';
import { notify } from 'components/index';
import { LoadingScreen } from 'components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { LayoutConfig } from "configurations";


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
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
      fontSize: 44,
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


export const Home = () => {
  const classes = useStyles();
  const [documentFile,setDocumentFile] = useState('');
  const [isValid,setIsValid] = useState(true);
  const errorText='or Upload a new Model';
  let fileUrl = useRef('');
  let fileIsValid;
  const [previewUrl,setPreviewUrl] = useState();
  const { setHeaderElements, pageTitle } = useContext(LayoutContext);
  let [isLoading,setIsLoading] = useState(true);
  const model = [];
  const [models,setModels] = useState(model);


  //Select Drop Down
  const [modelSelected, setModelSelected] = useState('');
  const [modelUploaded, setModelUploaded] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setModelSelected(event.target.value);
    console.log(modelSelected+ "is selected by user");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  useEffect(()=>{
    API.getUserDetails((res)=>{
      const modelArray = res.data.data.customerAdditionalData.fileName;
      const modelsTemp = [];
      for(let i=0;i<modelArray.length;i++){
        modelsTemp.push(modelArray[i]);
      }

      setModels(modelsTemp);

      console.log(models);
      setIsLoading(false);
    });
  },[modelUploaded]);

  const startGame = (event) =>{

    if(modelSelected ===''){
      notify('Select a model first to start');
      return;
    }
   
    let userData = { fileUrl: modelSelected};

    API.startGame(userData , (res) =>{
      console.log('Hopeful for a Start of Game'+ res);
      notify('Finding a match');
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
      let data ={fileUrl: res.data.data.documentFileUrl.original, fileName: res.data.data.documentFileUrl.fileName};
      // fileUrl.current = res.data.data.documentFileUrl.original;
      setModelUploaded(res.data.data.documentFilename);
      // console.log(res.data.data.documentFileUrl.fileName);
      API.updateUser(data, (res) =>{
        setPreviewUrl(FileIcon);
        notify('File Uploaded Successfully');
        // window.location.href = "/home";
        setModelUploaded('new');
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
  
  return (  <MuiThemeProvider theme={applicationTheme}>
    {isLoading && <LoadingScreen loadingText="Fetching user models"></LoadingScreen>}
    <Grid container justify='flex-start' direction='column' alignItems='center'>
      <Grid item xs={12} xl={2} lg={4} md={6} sm={8}>
        <Typography variant="h5" align="center">
        Select the Model
        </Typography>
      </Grid>

      <div className={classes.root}>

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

        <form noValidate>  
          {/* Select Drop */}

          <Button className={classes.button} onClick={handleOpen}>
           Select your Model 
          </Button>


          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Model</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={modelSelected}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {models.map((value, index) => {
                return <MenuItem key={index} value={index}>{value}</MenuItem>;
              })}
        
            </Select>
          </FormControl>

          <div>
            <div>
              {previewUrl && <img src={previewUrl} alt="Preview" width="200px" height="200px"/>}
              {!previewUrl && !fileIsValid && <p style={{color:'#ff9800'}}>{errorText}</p>}
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
    </Grid>
  </MuiThemeProvider>);
  
};
