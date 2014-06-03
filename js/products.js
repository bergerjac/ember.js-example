App.Product = DS.Model.extend(
    {
        title: DS.attr('string'),
        price: DS.attr('number'),
        description: DS.attr('string'),
        isOnSale: DS.attr('boolean'),
        image: DS.attr('string'),
        reviews: DS.hasMany('review', { async: true }),
        crafter: DS.belongsTo('contact', { async: true })
    }
);

App.ProductRoute = Ember.Route.extend(
    {
        model: function(routeParams)
        {
            console.log(routeParams.title);
            return  this.store.find('product', routeParams.product_id);
        }
    }
);

App.ProductsRoute = Ember.Route.extend(
    {
        model: function()
        {
            return this.store.find('product', { order: 'title' });
        }
    }
);
App.ProductsController = Ember.ArrayController.extend(
    {
        sortProperties: ['title']
    }
);

App.Review = DS.Model.extend(
    {
        text: DS.attr('string'),
        reviewedAt: DS.attr('number'),
        product: DS.belongsTo('product')
    }
);
