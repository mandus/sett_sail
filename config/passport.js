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
      consumerKey: 'gFrSvjbnntHLPKCLyZjj7w',
      consumerSecret: '7PNHZxIcHDpT1oSWj5cnBfjPSXLq4xF0r5TpEYL4iE'
    }
  },

  github: {
    name: 'GitHub',
    protocol: 'oauth2',
    strategy: require('passport-github').Strategy,
    options: {
      clientID: 'ce3a5ea51d03f622d8bb',
      clientSecret: '0673dc762187d9b88c99844d579996e01427f8c0'
    }
  },

  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options: {
      clientID: '871961309586742',
      clientSecret: '91609d8bbbb4564a38b837725335d613',
      scope: ['email'] /* email is necessary for login behavior */
    }
  },

  google: {
    name: 'Google',
    protocol: 'oauth2',
    strategy: require('passport-google-oauth').OAuth2Strategy,
    options: {
      clientID: '146042990330-69o0uert57a1eamh7thp4kkt6jbca817.apps.googleusercontent.com',
      clientSecret: 'BHYHYbzp25Jj3dEusaCLBJ8Q'
    }
  }

};
