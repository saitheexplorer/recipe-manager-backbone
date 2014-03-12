var app = app || {};

app.views.Recipe = Backbone.View.extend({
    tagName: 'li',

    attributes: function () {
        return {
            class: 'recipe ' + this.model.get('difficulty')
        };
    },

    events: {
        'click .title': 'showDetails'
    },

    template: _.template($('#recipe-list-element').html()),

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    showDetails: function (e) {
        $(e.target).siblings('.details').slideToggle('fast');
    }
});

app.views.Cookbook = Backbone.View.extend({
    el: '#wrapper',

    events: {
        'keyup #search': 'searchFilter'
    },

    initialize: function (data) {
        this.collection = new app.collections.Cookbook(data);
        this.render();

        this.on('change:searchFilter', this.filterBySearch, this);
        this.collection.on('reset', this.render, this);
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
    },

    searchFilter: function (e) {
        this.searchFilter = e.target.value;
        this.trigger('change:searchFilter');
    },

    filterBySearch: function () {
        this.collection.reset(recipesData, {silent: true});
        var filterString = this.searchFilter;
        var filtered = _.filter(this.collection.models, function (item) {
            return item.get('name').toLowerCase().indexOf(filterString.toLowerCase()) !== -1;
        });
        this.collection.reset(filtered);
    }
});
