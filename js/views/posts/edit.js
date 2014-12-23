define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/posts/edit.mustache',
    'models/post',
    'tinymce'
], function(
    $,
    _,
    Backbone,
    Mustache,
    editTemplate,
    PostModel,
    tinymce
){
    var PostEditView = Backbone.View.extend({
        el: $('.main'),
        initialize: function() {
            this.model = new PostModel({title: 'Test', slug: 'test'});
        },

        events: {
            'submit #post-edit': 'save'
        },

        render: function() {
            var compiledTemplate = Mustache.render(
                    editTemplate,
                    {item: this.model.toJSON()}
            );

            this.$el.html(compiledTemplate)

            for (var i = 0; i < tinymce.editors.length; i++) {
                tinymce.editors[i].remove()
            };
            tinymce.init({
                selector : "textarea#post-content",
                theme: "modern",
                menubar: false,
                statusbar: false,
                plugins: [
                     "advlist autolink link image lists charmap preview hr anchor pagebreak spellchecker",
                     "visualblocks visualchars code fullscreen media nonbreaking",
                     "table directionality paste"
               ],
               toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | preview media fullpage",
            });
        },
        save: function(e) {
            e.preventDefault();
            var form = $(e.currentTarget);

            this.model.setAttributes(form.serialize(), 'post');
            this.model.save();
            console.log(this.model);


        }
    });

    return PostEditView;
});
