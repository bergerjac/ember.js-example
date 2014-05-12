// Provide a model for the ContactsIndex Route which will provide just one model –
// the contact for Anostagia. You can look this contact up by ID.

// update the contactName property to use an Ember computed alias

Flint.ContactsIndexController = Ember.ObjectController.extend(
    {
        contactName: Ember.computed.alias('name')
    }
);

Flint.ContactsIndexRoute = Ember.Route.extend(
    {
        model: function()
        {
            return this.store.find('contact', 201);
        }
    }
);

Flint.ContactsRoute = Ember.Route.extend(
    {
        model: function()
        {
            return this.store.findAll('contact');
        }
    }
);
Flint.ContactRoute = Ember.Route.extend(
    {
        model: function(routeParams)
        {
            return this.store.find('contact', { order: 'name' });
        }
    }
);

Flint.Contact = DS.Model.extend(
    {
        name: DS.attr('string'),
        avatar: DS.attr('string'),
        about: DS.attr('string'),
        products: DS.hasMany('product', { async: true })
    }
);

Flint.Contact.FIXTURES = [
    {
        id: 200,
        name: 'Giamia',
        about: 'Although Giamia came from a humble spark of lightning, he quickly grew to be a great craftsman, providing all the warming instruments needed by those close to him.',
        avatar: 'images/contacts/giamia.png',
        products: [1]
    },
    {
        id: 201,
        name: 'Anostagia',
        about: 'Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.',
        avatar: 'images/contacts/anostagia.png',
        products: [2]
    }
];

Flint.ContactsController = Ember.ArrayController.extend(
    {
        sortProperties: ['name']
    }
);
