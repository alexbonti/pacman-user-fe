import { AccessToken, logout } from 'contexts/helpers'
import { notify } from 'components'
import { axiosInstance } from '../index';
/**
 *  @errorHelper :  Function to return error StatusText.
 */
const errorHelper = (error, variant) => {
  if (error.response === undefined) {
    notify("Network Error");
    return false;
  }
  if (error.response.statusCode === 401) {
    if (variant === "login")
      return notify("Invalid Credentials");

    if (variant === "register")
      return notify("Issues in Registeration process completion");
    notify("You may have been logged out");
    logout();
    return false;

  }
  if (error.response.data.statusCode === 401) {
    if (variant === "login")
      return notify("Invalid Credentials");

    if(variant === "register")
      return notify("Issues in  Registeration");

    notify("You may have been logged out");
    logout();
    return false;
  }


  if (error.response.status === 401) {
    if (variant === "login")
      return notify("Invalid Credentials");

    if (variant === "register")
      return notify("Issues in Registeration completion");

    notify("You may have been logged out");
    logout();
    return false;
  }


  if (error.response.data.message !== "") {
    notify(error.response.data.message);
    return false;
  }
  if (error.response.statusText !== "") {
    notify(error.response.statusText);
    return false;
  }
}

const performCallback = (callback, data) => {
  if (callback instanceof Function) {
    if (data !== undefined)
      return callback(data);
    callback();
  }
};

class API {
  displayAccessToken = () => {
    console.log(AccessToken)
  }

  login = (data, callback) => {
    axiosInstance.post('user/login', data).then(response => {
      //return performCallback(callback, true)
      callback(response,data);
    }).catch(error => {
      errorHelper(error, "login")
    })
  }

  registerUser = (data,callback) =>{
    axiosInstance.post('user/register' ,data).then(res =>{
       callback(res);
    }).catch(error => {
      errorHelper(error, "register");
    })
  }

  //Update User to add the models
  updateUser = (data,callback) =>{
    axiosInstance.post('user/updateProfile' ,data, {
      headers : {
        authorization: "Bearer " + AccessToken
      }
    }).then(res =>{
       callback(res);
    }).catch(error => {
      errorHelper(error);
    })
  }

  //To Start the Game Code
  startGame = (data,callback) =>{
       axiosInstance.post("user/startGame", data, {headers : {
        authorization: "Bearer " + AccessToken
      }}
      ).then(res => callback(res))
       .catch(error => errorHelper(error));
  }

  //Upload Document
  uploadDocument = (data,callback) =>{
    axiosInstance.post('upload/uploadDocument' ,data,{
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res =>{
      callback(res);
    }).catch(error =>{
      errorHelper(error)
    })
  }

  accessTokenLogin = (callback) => {
    axiosInstance.post('accessTokenLogin', {}, {
      headers: {
        authorization: "Bearer " + AccessToken
      }
    }).then(response => performCallback(callback, AccessToken)).catch(error => errorHelper(error));
  }

  getUserDetails = (callback) =>{
    axiosInstance.post('user/getProfile', {} , {
      headers : {
        authorization: "Bearer " + AccessToken
      }
    }).then(response => performCallback(callback, response)).catch(error => errorHelper(error));
  }

  getLeaderBoard = (callback) =>{
    axiosInstance.get('user/getLeaderBoard').then(response => performCallback(callback, response)).catch(error => errorHelper(error));
  }

  logoutUser = (callback) => {
    logout();
    performCallback(callback);
  }
}
const instance = new API();
export default instance;
