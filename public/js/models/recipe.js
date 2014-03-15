var app = app || {};

app.models.Recipe = Backbone.NestedModel.extend({
    defaults: {
        name: '',
        ingredients: [],
        steps: [],
        created: new Date(),
        tags: [],
    },

    idAttribute: '_id',

    urlRoot: '/recipes',

    initialize: function () {
        var self = this;
        if ((this.get('steps').length + this.get('ingredients').length) < 8) self.set('difficulty', 'easy');
        else self.set('difficulty', 'hard');
    }
});

app.collections.Cookbook = Backbone.Collection.extend({
    model: app.models.Recipe,

    url: '/books',

    comparator: function (recipe) {
        return recipe.get('name').toLowerCase();
    }
});


