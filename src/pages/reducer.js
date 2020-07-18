const INITIAL_STATE = {
  logged: false,
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGGED': return {
      ...state,
      logged: true,
    };
    
    case 'LOGGOUT': return {
      ...state,
      logged: false,
    };

    default: return state;
  }
}