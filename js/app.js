var App = Ember.Application.create(
    {
        LOG_TRANSITIONS: true
    }
);

App.Router.map(
    function()
    {
        this.resource('products', function()
                      {
                          this.resource('product', { path: '/:product_id' });
                          this.route('onsale');
                          this.route('deals');
                      }
        );
        this.resource('contacts', function()
                      {
                          this.resource('contact', { path: '/:contact_id' });
                      }
        );
    }
);

// models
App.ApplicationAdapter = DS.RESTAdapter.extend();
App.Product = DS.Model.extend(
    {
        title: DS.attr('string'),
        price: DS.attr('number'),
        description: DS.attr('string'),
        isOnSale: DS.attr('boolean'),
        image: DS.attr('string'),
        reviews: DS.hasMany('review', { async: true }),
        crafter: DS.belongsTo('contact', { async: true }),
        ratings: DS.attr(),
        rating: function()
        {
            return this.get('ratings').reduce(
                function(previousValue, rating)
                {
                    return previousValue + rating;
                },
                0) / this.get('ratings').length;
        }.property('ratings.@each')
    }
);

App.Contact = DS.Model.extend(
    {
        name: DS.attr('string'),
        about: DS.attr('string'),
        avatar: DS.attr('string'),
        products: DS.hasMany('product', { async: true })
    }
);

App.Review = DS.Model.extend(
    {
        text: DS.attr('string'),
        reviewedAt: DS.attr('date'),
        product: DS.belongsTo('product')
    }
);

// controllers
App.IndexController = Ember.ArrayController.extend(
    {
        productsCount: Ember.computed.alias('length'),
        logo: 'images/logo.icon.png',
        time: function()
        {
            return (new Date()).toDateString();
        }.property(),
        onSale: function()
        {
            return this.filterBy('isOnSale').slice(0, 3);
        }.property('@each.isOnSale')
    }
);
App.ContactsIndexController = Ember.Controller.extend(
    {
        contactName: 'Anostagia',
        avatar: 'images/contacts/patty.png'
    }
);
App.ProductsController = Ember.ArrayController.extend(
    {
        sortProperties: ['title']
    }
);
App.ContactsController = Ember.ArrayController.extend(
    {
        sortProperties: ['name'],
        contactsCount: Ember.computed.alias('length')
    }
);
App.ReviewsController = Ember.ArrayController.extend(
    {
        sortProperties: ['reviewedAt'],
        sortAscending: false
    }
);
App.ContactProductsController = Ember.ArrayController.extend(
    {
        sortProperties: ['title']
    }
);
App.ProductController = Ember.ObjectController.extend(
    {
        isNotReviewed: Ember.computed.alias('review.isNew'),
        review: function()
        {
            return this.store.createRecord(
                'review',
                {
                    product: this.get('model')
                }
            );
        }.property('model'),// on model changed
        ratings: [1, 2, 3, 4, 5],
        selectedRating: 5,
        actions: {
            createReview: function()
            {
                var controller = this;
                var review = this.get('review');
                review.set('reviewedAt', new Date());
                controller.set('text', '');
                controller.get('model.reviews').addObject(review);
            },
            createRating: function()
            {
                var product = this.get('model');
                var selectedRating = this.get('selectedRating');
                product.get('ratings').addObject(selectedRating);
                product.save();
            }
        }
    }
);

// routes
App.IndexRoute = Ember.Route.extend(
    {
        model: function()
        {
            return this.store.findAll('product');
        }
    }
);
App.ProductsRoute = Ember.Route.extend(
    {
        model: function()
        {
            return this.store.findAll('product');
        }
    }
);
App.ContactsRoute = Ember.Route.extend(
    {
        model: function()
        {
            return this.store.findAll('contact');
        }
    }
);
App.ProductsIndexRoute = Ember.Route.extend(
    {
        model: function()
        {
            return this.store.findAll('product');
        }
    }
);
App.ProductsOnsaleRoute = Ember.Route.extend(
    {
        model: function()
        {
            return this.modelFor('products').filterBy('isOnSale');
        }
    }
);
App.ProductsDealsRoute = Ember.Route.extend(
    {
        model: function()
        {
            return this.modelFor('products').filter(
                function(product)
                {
                    return product.get('price') < 500;
                }
            );
        }
    }
);

// components
App.ProductDetailsComponent = Ember.Component.extend(
    {
        reviewsCount: Ember.computed.alias('product.reviews.length'),
        hasReviews: function()
        {
            return this.get('reviewsCount') > 0;
        }.property('reviewsCount')
    }
);
App.ContactDetailsComponent = Ember.Component.extend(
    {
        productsCount: Ember.computed.alias('contact.products.length'),
        isProductive: function()
        {
            return this.get('productsCount') > 3;
        }.property('productsCount')
    }
);

// views
App.ReviewView = Ember.View.extend(
    {
        readMore: Ember.computed.gt('length', 140),
        isExpanded: false,
        classNameBindings: ['isExpanded', 'readMore'],
        click: function(e)
        {
            this.toggleProperty('isExpanded');
        }
    }
);

// helpers

Ember.Handlebars.registerBoundHelper(
    'markdown', function(text)
    {
        return new Handlebars.SafeString(markdown.toHTML(text));
    }
);
