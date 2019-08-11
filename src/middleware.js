import cookieSession from 'cookie-session';

const { SERVER_SECRET, DEBUG } = process.env;

const notAuthenticatedUrls = [
  '/',
  '/login',
  '/register',
  '/recover',
  '/reset'
];

const authenticatedUrls = [
  '/account'
];

function isNullOrUndefined(val) {
  if (val === null || val === undefined) {
    return true;
  }
  return false;
}

function debug() {
  if (!isNullOrUndefined(DEBUG)) {
    return DEBUG === 'true';
  }
  return false;
}

function cookieMiddleware() {
  let opts = {
    name: 'okpock',
    domain: '.okpock.com',
    keys: [SERVER_SECRET],
    maxAge: 6 * 24 * 60 * 60 * 1000, // 6 days
    secure: true,
    httpOnly: true
  };

  if (debug()) {
    opts.domain = '';
    opts.secure = false;
  }

  return cookieSession(opts);
}

function authMiddleware(req, res, next) {
  if (isNullOrUndefined(req.session.isAuthenticated)) {
    req.session.isAuthenticated = false;
  }
  next();
}

function userMiddleware(req, res, next) {
  if (isNullOrUndefined(req.session.user)) {
    req.session.user = false;
  }
  next();
}

function csrfMiddleware(req, res, next) {
  if (isNullOrUndefined(req.session.csrfToken)) {
    req.session.csrfToken = '';
  }
  next();
}

function redirectMiddleware(req, res, next) {
  if (!isNullOrUndefined(req.session.isAuthenticated)) {
    if (req.session.isAuthenticated && notAuthenticatedUrls.includes(req.path)) {
      console.log(req.path);
      res.writeHead(301, {'Location': '/account'});
      res.end();
    }
    if (!req.session.isAuthenticated && authenticatedUrls.includes(req.path)) {
      res.writeHead(301, {'Location': '/login'});
      res.end();
    }
  }
  next();
}

export {
  cookieMiddleware,
  authMiddleware,
  userMiddleware,
  csrfMiddleware,
  redirectMiddleware
};
