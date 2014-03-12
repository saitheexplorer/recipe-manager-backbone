var app = app || {};

app.models.Recipe = Backbone.NestedModel.extend({
    defaults: {
        name: '',
        ingredients: [],
        steps: [],
        created: new Date(),
        tags: [],
    },

    initialize: function () {
        var self = this;
        if (this.get('steps').length < 4) self.set('difficulty', 'easy');
        else self.set('difficulty', 'hard');
    }
});

app.collections.Cookbook = Backbone.Collection.extend({
    model: app.models.Recipe,

    comparator: function (recipe) {
        return recipe.get('name');
    }
});


