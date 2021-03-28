const Config = () => {
  if (process.env.NODE_ENV === 'production') {
    // production
    return {
      restful: {
        apiKey: process.env.REACT_APP_X_API_KEY,
        apiURL: process.env.REACT_APP_API_PD_URL,
        apiPrefURL: process.env.REACT_APP_API_PD_PREF_URL,
      },
    };
  }
  // development
  return {
    restful: {
      apiKey: process.env.REACT_APP_API_KEY,
      apiURL: process.env.REACT_APP_API_URL,
      apiPrefURL: process.env.REACT_APP_API_PREF_URL,
    },
  };
};
export const restfulApiConfig = Config().restful;
