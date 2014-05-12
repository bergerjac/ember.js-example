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

console.log("}app.js");
