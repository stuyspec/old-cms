import {
  SET_LANGUAGE,
  REFRESH_WINDOW_DIMENSIONS,
  OPEN_APP_MENU,
  CLOSE_APP_MENU, CREATE_SESSION, DELETE_SESSION
} from './actionTypes'

// getWindowWidth & getWindowHeight was
// adapted from http://stackoverflow.com/a/8876069/1291659
const getViewportWidth = function() {
  return Math.max(
    window.document.documentElement.clientWidth,
    window.innerWidth || 0
  );
};

const getViewportHeight = function() {
  return Math.max(
    window.document.documentElement.clientHeight,
    window.innerHeight || 0
  );
};

const initialState = {
  viewportWidth: getViewportWidth(),
  viewportHeight: getViewportHeight(),
  session: null
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return Object.assign({ ...state }, { language: action.payload.language });
    case REFRESH_WINDOW_DIMENSIONS:
      let viewportWidth = getViewportWidth(),
        viewportHeight = getViewportHeight();

      if (
        state.viewportWidth !== viewportWidth ||
        state.viewportHeight !== viewportHeight
      ) {
        // override width/height which will refresh app view
        return Object.assign({ ...state }, { viewportWidth, viewportHeight });
      } else return state; //otherwise do not mutate
    case CREATE_SESSION:
      return {...state, session: action.payload }
    case DELETE_SESSION:
      return {...state, session: null }
    default:
      break;
  }

  return state;
};

export default reducer;
