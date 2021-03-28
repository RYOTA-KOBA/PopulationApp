const Config = () => {
  if (process.env.NODE_ENV === 'production') {
    // production
    return {
      restful: {
        apiKey: process.env.REACT_APP_X_API_KEY,
      },
    };
  }
  // development
  return {
    restful: {
      apiKey: process.env.REACT_APP_API_KEY,
    },
  };
};
export const restfulApiConfig = Config().restful;
