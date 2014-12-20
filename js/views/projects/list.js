define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/projects/list.mustache',
    'collections/projects'
], function(
    $,
    _,
    Backbone,
    Mustache,
    listTemplate,
    ProjectsCollection
){
    var ProjectsListView = Backbone.View.extend({
        el: $('.main'),
        initialize: function() {

            this.collection = new ProjectsCollection();

            this.collection.add({title: 'New Project', id: 1});
            this.collection.add({title: 'New Project 2', id: 2});
        },

        render: function() {
            var compiledTemplate = Mustache.render(listTemplate, {items: this.collection.toJSON()});

            this.$el.html(compiledTemplate);

        }
    });

    return ProjectsListView;
});
