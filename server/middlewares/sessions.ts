import {Express} from 'express'
const session = require('express-session');

module.exports = function(app : Express) {
    app.use(
        session({
          name: 'sid',
          saveUninitialized: false,
          resave: false,
          secret: 'sssh, quiet! it\'s a secret!',
          cookie: {
            maxAge: 1000 * 60 * 60 * 2,
            sameSite: true,
            secure: process.env.NODE_ENV === 'production'
          }
        })
    )
}
