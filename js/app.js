var App = Ember.Application.create(
    {
        LOG_TRANSITIONS: true
    }
);
App.Router.map(
    function()
    {
        this.route('about');
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
        avatar: 'images/avatar.png',
        open: function()
        {
            return ((new Date()).getDay() === 0) ? "Closed" : "Open";
        }.property()
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
        }.property('model'),
        ratings: [1, 2, 3, 4, 5],
        selectedRating: 5,
        actions: {
            createReview: function()
            {
                var controller = this;
                var review = this.get('review');
                review.set('reviewedAt', new Date());
                review.get('review').save().then(
                    function()
                    {
                        controller.set('text', '');
                        controller.get('model.reviews').addObject(review);
                    }
                );
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
App.IndexRoute = Ember.Route.extend(
    {
        model: function()
        {
            return this.store.findAll('product');
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

App.ProductView = Ember.View.extend(
    {
        isOnSale: Ember.computed.alias('controller.isOnSale'),
        classNameBindings: ['isOnSale']
    }
);

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
App.Review.FIXTURES = [
    {
        id: 100,
        text: "Started a fire in no time!"
    },
    {
        id: 101,
        text: "Not the brightest flame, but warm!"
    }
];
