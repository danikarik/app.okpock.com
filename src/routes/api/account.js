const axios = require('axios');

export async function get(req, res, next) {
  const { API_URL } = process.env;

  try {
    const { status, data } = await axios.get(API_URL + '/account', {
      headers: {
        'Cookie': req.headers['cookie']
      }
    });

    res.writeHead(status, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  } catch (error) {
    const { data } = error.response;
    res.writeHead(data.code, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  }
}
