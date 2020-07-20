import api from '../services/api';

export const SignIn = value => {
  if(typeof value === 'object')
    return { type: 'LOGGED', payload: value }
  
  return dispatch => {
    api.get(`/user/${value}`)
      .then(res => {
        const { user } = res.data;
        return dispatch({ type: 'LOGGED', payload: user })
      }).catch(err => console.log(err));
  }
}

export const Loggout = () => ({
  type: 'LOGGOUT',
})