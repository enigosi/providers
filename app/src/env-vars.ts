const ENV_VARS = {
  API_URL:
    location.hostname === 'localhost' || location.hostname === '127.0.0.1'
      ? 'http://localhost:5000'
      : 'https://codingchalangeapi.now.sh'
};

export default ENV_VARS;
