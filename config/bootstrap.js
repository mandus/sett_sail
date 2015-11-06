/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // Turn on passport before bootstrap, in order to enable 
  // auth:
  sails.services.passport.loadStrategies();
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();

//  // Let's bootstrap by adding a few things:
//  // But now it will do this every time - we probably doesn't want that...
//  Items.create([{
//      text: 'This is a first item'
//  }, {
//      text: 'This is a second item'
//  }]).exec({
//      error: function (err) {
//          console.log('Unable to add first items to db', err);
//          cb(err);
//      },
//
//      success: function(result) {
//          console.log('Everything is fine in init - moving on');
//          cb();
//      }
//  });
};
