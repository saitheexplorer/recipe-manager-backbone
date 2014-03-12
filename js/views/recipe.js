app = app || {};

app.views.Recipe = Backbone.View.extend({
    tagName: 'li',

    attributes: function () {
        return {
            class: this.model.get('difficulty')
        };
    },

    template: _.template($('#recipe-list-element').html()),

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

app.views.Cookbook = Backbone.View.extend({
    el: '#wrapper',

    initialize: function (data) {
        this.collection = new app.collections.Cookbook(data);
        this.render();
    },

    render: function () {
        var self = this;
        $('#recipes_ul').empty();
        _.each(this.collection.models, function (recipe) {
            self.renderRecipe(recipe);
        }, this);
        return this;
    },

    renderRecipe: function (recipe) {
        var newRecipe = new app.views.Recipe({
            model: recipe
        });
        $('#recipes_ul').append(newRecipe.render().el);
    }
});
