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
                        this.resource('contact', { path: '/:contact_id' });
                    }
                );
            }
        );
    }
);

Flint.ApplicationAdapter = DS.FixtureAdapter.extend();

Flint.FlintIndexController = Ember.ArrayController.extend(
    {
        productsCount: Ember.computed.alias('length'),
        logo: 'images/logo-small.png',
        time: function()
        {
            return (new Date()).toDateString();
        }.property()
    }
);

Flint.IndexRoute = Ember.Route.extend(
    {
        model: function()
        {
            return this.store.findAll('product');
        }
    }
);

console.log("}app.js");
