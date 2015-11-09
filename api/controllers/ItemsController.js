/**
 * ItemsController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // GET operation - public items + items owned by logged in user
    find: function (req, res) {
        // If not logged in, only show public items
        if (!req.session.authenticated) {
            Items.find({visibility: 'public'}).populate('owner').exec(function (err, items) {
                if (err) {
                    return res.negotiate(err);
                }
                return res.send(items);
            });
        } else {
            // User is logged in, find the public items and the logged in users own
            // items
            Items.find({visibility: 'public'}).populate('owner').exec(function (err, public_items) {
                if (err) {
                    return res.negotiate(err);
                }
                Items.find({owner: req.user.id}).populate('owner').exec(function (err, owner_items) {
                    if (err) {
                        return res.negotiate(err);
                    }
                    // Need to get the union of the public_items and the
                    // owner_items before we return; so let's add public 
                    // items not already present to the owner_items:
                    ids = owner_items.map(function (item) { return item.id; });
                    public_items.forEach(function (item) {
                        if (ids.indexOf(item.id) == -1) {
                            owner_items.push(item);
                        }
                    });

                    return res.send(owner_items);
                });
            });
        }
    },

    // GET item with id:
    findOne: function (req, res) {
        var pk = req.options.id || (req.options.where && req.options.where.id) || req.param('id');
        Items.findOne(pk).populate('owner').exec(function (err, item) {
            if (err) {
                return res.negotiate(err);
            }
            if (item.visibility == 'public') {
                return res.send(item);
            }
            if (req.session.authenticated && req.user.id == item.owner.id) {
                return res.send(item);
            }
        });
    },



    // POST (although not explicitly mapped yet)
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
        var visibility = req.param('visibility');
        var owner = req.user.id;
        var item = {text: text, owner: owner, visibility: visibility};
        if (text && owner) { 
            Items.create(item, function (err, item) {
                if (err) {
                    return res.negotiate(err);
                }
                console.log('Publish Create for item',item);
                Items.publishCreate(item);
                return res.ok();
            });
        }
        return res.ok();
    },
};

