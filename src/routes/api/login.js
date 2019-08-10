import { handleError, sendJson, apiUrl } from './_helper';
const axios = require('axios');

export async function post(req, res, next) {
  const { username, password } = req.body;

  try {
    const { status, data, headers } = await axios.post(apiUrl('/login'), {
      username: username,
      password: password
    });

    if (status === 200) {
      req.session.isAuthenticated = true;
      req.session.csrfToken = headers['x-xsrf-token'];
    }

    sendJson(res, status, data, headers);
  } catch (error) {
    handleError(res, error);
  }
}
