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
                        this.resource('product', { path: '/:title' });
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

console.log("}app.js");
