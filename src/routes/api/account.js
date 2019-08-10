import { handleError, sendJson, withCookie, apiUrl } from './_helper';
const axios = require('axios');

export async function get(req, res, next) {
  try {
    const { status, data } = await axios.get(apiUrl('/account'), withCookie(req));

    sendJson(res, status, data);
  } catch (error) {
    handleError(res, error);
  }
}
