Flint.Product = DS.Model.extend(
    {
        title: DS.attr('string'),
        price: DS.attr('number'),
        description: DS.attr('string'),
        isOnSale: DS.attr('boolean'),
        image: DS.attr('string'),
        reviews: DS.hasMany('review', { async: true })
    }
);

Flint.Review = DS.Model.extend(
    {
        text: DS.attr('string'),
        reviewedAt: DS.attr('number'),
        product: DS.belongsTo('product')
    }
);
Flint.Review.FIXTURES = [
    { id: 100, product: 1, text: "Started a fire in no time!"},
    { id: 101, product: 1, text: "Not the brightest flame, but warm!"}
];

Flint.Product.FIXTURES = [
    {
        id: 1,
        title: 'Flint',
        price: 99,
        description: 'Flint is…',
        isOnSale: true,
        image: 'images/products/flint.png',
        reviews: [100, 101]
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