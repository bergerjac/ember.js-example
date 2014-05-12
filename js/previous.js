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
        image: 'images/products/flint.png'
    },
    {
        title: 'Kindling',
        price: 249,
        description: 'Easily…',
        isOnSale: false,
        image: 'images/products/kindling.png'
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
        name: "helo there",
        avatar: 'images/contacts/anostagia.png',
        about: "that girl 2"
    }
];

Flint.ProductRoute = Ember.Route.extend(
    {
        model: function(routeParams)
        {
            console.log(routeParams.title);
            var product = Flint.PRODUCTS.findBy('title', routeParams.title);
            console.log(product);
            return  product;
        }
    }
);

Flint.ContactRoute = Ember.Route.extend(
    {
        model: function(routeParams)
        {
            console.log(routeParams.title);
            return  Flint.CONTACTS.findBy('name', routeParams.name);
        }
    }
);
