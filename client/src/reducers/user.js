import axios from 'axios';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const VALIDATE_TOKEN   ='VALIDATE_TOKEN';

export const validateToken = (callBack = f => f) => {
  return dispatch => {
    dispatch({ type: VALIDATE_TOKEN }); 
    const headers = axios.defaults.headers.common;
      axios.get('/api/auth/validate_token', headers)
      .then(res => {
        const user =res.data.data;
        dispatch({ type: LOGIN, user, headers: res.headers })
        callBack()
      }).catch(() => callBack())
  }
}

export const handleRegister = (user, history) => {
  return(dispatch) => {
    axios.post('/api/auth', user)
    .then(res => {
      dispatch({ type: LOGIN, user: res.data.data, headers: res.headers });
      history.push('/');
    })
    .catch( res => {
      console.log(res);
    });
  }
}

export const handleLogout = (history) => {
  return(dispatch) => {
    axios.delete('/api/auth/sign_out')
      .then(res => {
        dispatch({ type: LOGOUT });
        history.push('/login');
      })
      .catch(res => {
        console.log(res);
      });
  }
}

export const handleLogin = (user, history) => {
  return(dispatch) => {
    axios.post('/api/auth/sign_in', user)
    .then(res => {
      dispatch({ type: LOGIN, user: res.data.data, headers: res.headers });
      history.push('/')
    })
    .catch( res => {
      console.log(res)
    });
  }
}


export default (state = {}, action ) => {
  switch(action.type ) {
    case LOGIN:
     return action.user;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
