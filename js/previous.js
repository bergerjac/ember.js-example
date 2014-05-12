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

Flint.Product.FIXTURES = [
    {
        id: 1,
        title: 'Flint',
        price: 99,
        description: 'Flint is…',
        isOnSale: true,
        image: 'images/products/flint.png'
    },
    {
        id: 2,
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
            return this.store.findAll('product');
        }
    }
);
Flint.ProductRoute = Ember.Route.extend(
    {
        model: function(routeParams)
        {
            console.log(routeParams.title);
            return  this.store.find('product', routeParams.product_id);
        }
    }
);

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
            return Flint.CONTACTS;
        }
    }
);

Flint.CONTACTS = [
    {
        name: "gia mia",
        avatar: 'images/contacts/adam.png',
        about: "this girl"
    },
    {
        name: "helo there",
        avatar: 'images/contacts/martin.png',
        about: "that girl 2"
    }
];
Flint.ContactRoute = Ember.Route.extend(
    {
        model: function(routeParams)
        {
            console.log(routeParams.title);
            return  Flint.CONTACTS.findBy('name', routeParams.name);
        }
    }
);


