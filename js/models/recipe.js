var app = app || {};

app.Recipe = Backbone.NestedModel.extend({
    defaults: {
        ingredients: [],
        steps: [],
        created: new Date(),
        tags: []
    }
});
