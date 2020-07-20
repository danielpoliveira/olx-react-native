const INITIAL_STATE = {
  logged: false,
  user: undefined,
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGGED': return {
      ...state,
      logged: true,
      user: action.payload
    };
    
    case 'LOGGOUT': return {
      ...state,
      logged: false,
    };

    default: return state;
  }
}