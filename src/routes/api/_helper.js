const applicationJson = { 'Content-Type': 'application/json' };

function handleError(res, error) {
  if (error.response) {
    const { data } = error.response;
    res.writeHead(data.code, applicationJson);
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(503, applicationJson)
    res.end(JSON.stringify({
      code: 503,
      message: 'Service Unavailable'
    }));
  }
}

function sendJson(res, status, data, headers = {}) {
  res.writeHead(status, { ...applicationJson, ...headers });
  res.end(JSON.stringify(data));
}

function withCookie(req) {
  return {
    headers: {
      'Cookie': req.headers['cookie']
    }
  }
}

function apiUrl(path) {
  const { API_URL } = process.env;
  return API_URL + path;
}

export { handleError, sendJson, withCookie, apiUrl }
