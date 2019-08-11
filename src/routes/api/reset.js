import { handleError, sendJson, apiUrl } from '../../shared/helper';
const axios = require('axios');

export async function post(req, res, next) {
  const { type, token, password } = req.body;

  try {
    const { status, data } = await axios.post(apiUrl('/reset'), {
      type: type,
      token: token,
      password: password
    });

    sendJson(res, status, data);
  } catch (error) {
    handleError(res, error);
  }
}
