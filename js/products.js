Flint.Product = DS.Model.extend(
    {
        title: DS.attr('string'),
        price: DS.attr('number'),
        description: DS.attr('string'),
        isOnSale: DS.attr('boolean'),
        image: DS.attr('string')
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
