var app = app || {};

app.models.Recipe = Backbone.NestedModel.extend({
    defaults: {
        name: '',
        ingredients: [],
        steps: [],
        created: new Date(),
        tags: [],
    },

    idAttribute: 'id',

    urlRoot: '/recipes',

    events: {
        'change': 'difficulty'
    },

    initialize: function () {
        this.difficulty();
    },

    difficulty: function () {
        var self = this;
        if ((this.get('steps').length + this.get('ingredients').length) < 2) self.set('difficulty', 'easy');
        else self.set('difficulty', 'hard');
    }
});

app.collections.Cookbook = Backbone.Collection.extend({
    model: app.models.Recipe,

    url: '/recipes',

    comparator: function (recipe) {
        return recipe.get('name').toLowerCase();
    }
});
