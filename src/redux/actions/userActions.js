import axios from 'axios';
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const EDIT_USER = 'EDIT_USER';



export const fetchUsers = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
      });
  };
};




export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

export const deleteUser = (userId) => {
  return {
    type: DELETE_USER,
    payload: userId,
  };
};

export const editUser = (user) => {
    return {
      type: EDIT_USER,
      payload: user,
    };
  };
  
