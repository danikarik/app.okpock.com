import { handleError, sendJson, apiUrl } from '../../shared/helper';
const axios = require('axios');

export async function post(req, res, next) {
  const { email } = req.body;

  try {
    const { status, data } = await axios.post(apiUrl('/recover'), {
      email: email
    });

    sendJson(res, status, data);
  } catch (error) {
    handleError(res, error);
  }
}
