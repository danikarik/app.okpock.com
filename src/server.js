import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import bodyParser from 'body-parser';
import * as sapper from '@sapper/server';

import {
  cookieMiddleware,
  authMiddleware,
  userMiddleware,
  csrfMiddleware,
  redirectMiddleware
} from './middleware';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
  .use(bodyParser.json())
  .use(cookieMiddleware())
  .use(authMiddleware, userMiddleware, csrfMiddleware, redirectMiddleware)
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => ({
        isAuthenticated: req.session.isAuthenticated,
        user: req.session.user
      })
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
