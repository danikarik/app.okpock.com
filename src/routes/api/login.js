const axios = require('axios');

export async function post(req, res, next) {
  const { API_URL } = process.env;

  const { username, password } = req.body;

  let responseHeaders = {
    'Content-Type': 'application/json'
  }

  try {
    const { status, data, headers } = await axios.post(API_URL + '/login', {
      username: username,
      password: password
    });

    if (status === 200) {
      req.session.isAuthenticated = true;
      req.session.csrfToken = headers['x-xsrf-token'];
      responseHeaders['Set-Cookie'] = headers['set-cookie'];
    }

    res.writeHead(status, responseHeaders);
    res.end(JSON.stringify(data));
  } catch (error) {
    const { data } = error.response;
    res.writeHead(data.code, responseHeaders);
    res.end(JSON.stringify(data));
  }
}
