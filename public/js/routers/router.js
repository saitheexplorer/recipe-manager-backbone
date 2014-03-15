var app = {
    models: {},
    collections: {},
    views: {},
    routers: {},
    init: function () {
        app.cookbook = new app.collections.Cookbook(recipesData);
        app.router = new app.routers.Router();
        Backbone.history.start();

        $('h1').on('click', function () {
            app.router.navigate('#', {trigger: true});
        });
    }
};

app.routers.Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'create': 'createRecipe',
        'recipe/:_id': 'recipeDetail',
        'edit/:_id': 'editRecipe'
    },

    index: function () {
        var index = new app.views.Index();
    },

    createRecipe: function () {
        var form = new app.views.CreateRecipe();
    },

    editRecipe: function (_id) {
        new app.views.EditRecipe({
            model: app.cookbook.get(_id)
        });
    },

    recipeDetail: function (_id) {
        new app.views.RecipeDetail({
            model: app.cookbook.get(_id)
        });
    }
});
