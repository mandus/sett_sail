/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and where you
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
  twitter: {
    name: 'Twitter',
    protocol: 'oauth',
    strategy: require('passport-twitter').Strategy,
    options: {
      consumerKey: process.env.TW_CKEY,
      consumerSecret: process.env.TW_CSEC,
      callbackUrl: 'http://localhost:1337/auth/twitter/callback'
    }
  },

  github: {
    name: 'GitHub',
    protocol: 'oauth2',
    strategy: require('passport-github').Strategy,
    options: {
      clientID: process.env.GH_CID,
      clientSecret: process.env.GH_CSEC,
      callbackURL: 'http://localhost:1337/auth/github/callback'
    }
  },

  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options: {
      clientID: process.env.FB_CID,
      clientSecret: process.env.FB_CSEC,
      callbackURL: 'http://localhost:1337/auth/facebook/callback',
      scope: ['email'] /* email is necessary for login behavior */
    }
  },

  google: {
    name: 'Google',
    protocol: 'oauth2',
    strategy: require('passport-google-oauth').OAuth2Strategy,
    options: {
      clientID: process.env.GOO_CID,
      clientSecret: process.env.GOO_CSEC,
      callbackURL: 'http://localhost:1337/auth/google/callback',
      scope: ['email']
    }
  }
};
