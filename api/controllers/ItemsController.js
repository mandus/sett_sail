/**
 * ItemsController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: function (req, res) {

        if (!req.session.authenticated) {
            console.log('Not authenticated; not allowed to create item');
            return res.forbidden();
        }
        console.log('User is authenticated, and will create an item', req.user.username);
        console.log('Method is ', req.method);
        if (!(req.method === 'POST')) {
            console.log('We only allow POST creates');
            return res.forbidden();
        }
        var text = req.param('text');
        var owner = req.user.id;
        var item = {text: text, owner: owner};
        if (text && owner) { 
            console.log("We're going to create ", item);
            Items.create(item, function (err, item) {
                if (err) {
                    return res.negotiate(err);
                }
                Items.publishCreate(item);
                return res.ok();
            });
        }
        return res.ok();
    },
};

