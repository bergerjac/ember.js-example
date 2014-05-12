Flint.ContactsIndexController = Ember.Controller.extend(
    {
        contactName: "Harry Potter",
        avatar: 'images/contacts/patty.png',
        open: function()
        {
            var day = (new Date()).getDay();
            if (day === 0)
            {
                return "closed on sundays";
            }
            return "open";

        }.property()
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
            return this.store.find('contact', routeParams.contact_id);
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
        id: 1,
        name: 'Giamia',
        about: 'Although Giamia came from a humble spark of lightning, he quickly grew to be a great craftsman, providing all the warming instruments needed by those close to him.',
        avatar: 'images/contacts/giamia.png',
        products: [1]
    },
    {
        id: 2,
        name: 'Anostagia',
        about: 'Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.',
        avatar: 'images/contacts/anostagia.png',
        products: [2]
    }
];
