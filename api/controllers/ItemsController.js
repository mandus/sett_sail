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
        if (!(req.method === 'POST')) {
            console.log('We only allow create on POST');
            return res.forbidden();
        }
        var text = req.param('text');
        var owner = req.user.id;
        var item = {text: text, owner: owner};
        if (text && owner) { 
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

