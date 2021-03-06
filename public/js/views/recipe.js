var app = app || {};

app.views.Recipe = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#recipe-list-element').html()),

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
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
        $('#count').html(this.collection.models.length + ' results');
        return this;
    },

    renderRecipe: function (recipe) {
        var newRecipe = new app.views.Recipe({ model: recipe });
        $('#recipes_ul').append(newRecipe.render().el);
    },

    searchFilter: function (e) {
        this.searchFilter = e.target.value;
        this.trigger('change:searchFilter');
    },

    filterBySearch: function () {
        this.collection.reset(app.cookbook.models, {silent: true});
        var filterString = this.searchFilter;
        var filtered = _.filter(this.collection.models, function (item) {
            return item.get('name').toLowerCase().indexOf(filterString.toLowerCase()) !== -1;
        });
        this.collection.reset(filtered);
    }
});

app.views.RecipeDetail = Backbone.View.extend({
    el: '#wrapper',

    template: _.template($('#recipe-detail').html()),

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

app.views.CreateRecipe = Backbone.View.extend({
    el: '#wrapper',

    template: _.template($('#create-recipe-form').html()),

    events: {
        'click #save': 'save'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.template(new app.models.Recipe().toJSON()));
        return this;
    },

    save: function (e) {
        e.preventDefault();

        var newRecipe = new app.models.Recipe({
            name: $('#recipe-name').val(),
            ingredients: $('#recipe-ingredients').val().split('\n'),
            steps: $('#recipe-steps').val().split('\n')
        });

        newRecipe.save();
        app.cookbook.fetch();

        this.$el.unbind();
        this.$el.empty();

        app.router.navigate('#', true);

        return false;
    }
});

app.views.EditRecipe = Backbone.View.extend({
    el: '#wrapper',

    template: _.template($('#create-recipe-form').html()),

    events: {
        'click #save': 'save'
    },

    initialize: function (recipe) {
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    save: function (e) {
        e.preventDefault();

        this.model.set({
            name: $('#recipe-name').val(),
            ingredients: $('#recipe-ingredients').val().split('\n'),
            steps: $('#recipe-steps').val().split('\n')
        });

        this.model.save();
        app.cookbook.fetch();

        this.$el.unbind();
        this.$el.empty();

        app.router.navigate('#', {trigger: true});

        return false;
    }
});
