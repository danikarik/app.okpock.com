const axios = require('axios');

export async function del(req, res, next) {
  const { API_URL } = process.env;

  try {
    const { status } = await axios.delete(API_URL + '/logout', {});

    if (status === 200) {
      req.session.isAuthenticated = false;
      req.session.user = false;
    }

    res.writeHead(status, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({}));
  } catch (error) {
    const { data } = error.response;
    res.writeHead(data.code, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  }
}
