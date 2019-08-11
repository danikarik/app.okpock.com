import { handleError, sendJson, apiUrl } from '../../shared/helper';
const axios = require('axios');

export async function post(req, res, next) {
  const { username, email, password } = req.body;

  try {
    const { status, data, headers } = await axios.post(apiUrl('/register'), {
      username: username,
      email: email,
      password: password
    });

    sendJson(res, status, data, headers);
  } catch (error) {
    handleError(res, error);
  }
}
