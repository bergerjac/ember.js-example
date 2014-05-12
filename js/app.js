console.log("{app.js");

window.Flint = Ember.Application.create(
    {
        LOG_TRANSITIONS: true
        //        namespace: 'app-emberjs'
    }
);

Flint.Router.map(
    function()
    {
        this.resource(
            'flint',
            { path: '/' },
            function()
            {
                this.route('about');
                this.route('credits', { path: '/thank-you' });
                this.resource('products');
                this.resource('product', { path: '/products/:title' });
                this.resource('contacts');
            }
        );
    }
);

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

console.log("}app.js");
