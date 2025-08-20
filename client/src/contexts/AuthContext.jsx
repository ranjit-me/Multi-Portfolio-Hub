import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  profile: null,
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  SET_PROFILE: 'SET_PROFILE',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        profile: action.payload.profile || null,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        profile: null,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AUTH_ACTIONS.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');
    
    if (token && username) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user: { username },
          token,
          profile: JSON.parse(localStorage.getItem('profile') || 'null'),
        },
      });
    } else {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Login function
  const login = (loginResponse) => {
    const { accessToken, username, profile } = loginResponse;
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('username', username);
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    }
    
    dispatch({
      type: AUTH_ACTIONS.LOGIN_SUCCESS,
      payload: {
        user: { username },
        token: accessToken,
        profile,
      },
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('profile');
    
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Update profile function
  const updateProfile = (profile) => {
    localStorage.setItem('profile', JSON.stringify(profile));
    dispatch({ type: AUTH_ACTIONS.SET_PROFILE, payload: profile });
  };

  const value = {
    ...state,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
