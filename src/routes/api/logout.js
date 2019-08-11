import { handleError, sendJson, apiUrl } from '../../shared/helper';
const axios = require('axios');

export async function del(req, res, next) {
  try {
    const { status } = await axios.delete(apiUrl('/logout'), {});

    if (status === 200) {
      req.session.isAuthenticated = false;
      req.session.user = false;
    }

    sendJson(res, status, {});
  } catch (error) {
    handleError(res, error);
  }
}
