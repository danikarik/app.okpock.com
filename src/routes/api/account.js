import { handleError, sendJson, newJson, withCookie, apiUrl } from '../../shared/helper';
const axios = require('axios');

export async function get(req, res, next) {
  try {
    const { status, data } = await axios.get(apiUrl('/account'), withCookie(req));

    if (status === 200) {
      req.session.user = newJson(data);
    }

    sendJson(res, status, data);
  } catch (error) {
    handleError(res, error);
  }
}
