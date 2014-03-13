var app = app || {};

app.views.Index = Backbone.View.extend({
    tagName: 'div',

    el: $('body'),

    attributes: {id: 'tools'},

    template: _.template($('#index-tools').html()),

    events: {
        'click h1': 'home'
    },

    initialize: function () {
        $('#wrapper').empty();
        this.render();
    },

    render: function () {
        $('#wrapper').html(this.template());
        return this;
    },

    home: function () {
        app.router.navigate('#', true);
    }
});
