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
                this.route('credits', { path: '/thank-you' });
                this.resource(
                    'products', function()
                    {// /products/example-product
                        this.resource('product', { path: '/:product_id' });
                    }
                );
                this.resource(
                    'contacts', function()
                    {// /contacts/example-contact
                        this.resource('contact', { path: '/:name' });
                    }
                );
            }
        );
    }
);

Flint.ApplicationAdapter = DS.FixtureAdapter.extend();

Flint.Product = DS.Model.extend(
    {
        title: DS.attr('string'),
        price: DS.attr('number'),
        description: DS.attr('string'),
        isOnSale: DS.attr('boolean'),
        image: DS.attr('string')
    }
);

console.log("}app.js");
