var app = {
    models: {},
    collections: {},
    views: {},
    init: function () {
        var cookbook = new app.views.Cookbook(recipesData);
    }
};
