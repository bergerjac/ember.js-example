// contains code from previous exercises

Flint.FlintIndexController = Ember.Controller.extend(
    {
        productsCount: 6,
        logo: 'images/logo-small.png',
        time: function()
        {
            return (new Date()).toDateString();
        }.property()
    }
);

Flint.FlintAboutController = Ember.Controller.extend(
    {
        contactName: "Harry Potter",
        avatar: 'images/avatar.png',
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
Flint.PRODUCTS = [
    {
        title: 'Flint',
        price: 99,
        description: 'Flint is…',
        isOnSale: true,
        image: 'flint.png'
    },
    {
        title: 'Kindling',
        price: 249,
        description: 'Easily…',
        isOnSale: false,
        image: 'kindling.png'
    }
];
Flint.ProductsRoute = Ember.Route.extend(
    {
        model: function()
        {
            return  Flint.PRODUCTS
        }
    }
);

Flint.ContactsRoute = Ember.Route.extend(
    {
        model: function()
        {
            return Flint.CONTACTS;
        }
    }
);

Flint.CONTACTS = [
    {
        name: "gia mia",
        avatar: 'images/contacts/giamia.png',
        about: "this girl"
    },
    {
        name: "gia mia",
        avatar: 'images/contacts/anostagia.png',
        about: "this girl"
    }
];
