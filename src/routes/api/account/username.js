import { handleError, sendJson, newJson, withCookie, apiUrl } from '../../../shared/helper';
const axios = require('axios');

export async function put(req, res, next) {
  const { username } = req.body;

  try {
    const { status, data } = await axios.put(apiUrl('/account/username'), {
      username: username
    }, withCookie(req));

    if (status === 200) {
      const payload = newJson(data);
      req.session.user.username = payload.username;
    }

    sendJson(res, status, data);
  } catch (error) {
    handleError(res, error);
  }
}
