/**
 * @module BookView
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
    'jquery',
    'lodash',
    'backbone',
    'views/PageView',
], function (
    $,
    _,
    Backbone,
    PageView
) {

    'use strict';

    /**
     * @alias module:BookView
     */
    var BookView = Backbone.View.extend({
        el: '#book-container',

        /**
         * @param {Oblect} o Options
         * @param {CurrentPageModel} o.currentPageModel
         * @param {BookCollection} o.collection
         */
        initialize: function (o) {
            this._current = o.currentPageModel;

            this.listenTo(this._current, 'change', this.render);
        },

        /**
         * @return {jQuery}
         */
        render: function () {
            console.log('BookView render');

            this.$el.empty();

            var current = this.collection.getCurrent()

            if (!current) {
                return;
            }

            console.log('render');

            var page = new PageView({
                model: this.collection.getCurrent(),
            });

            this.$el.html(page.render());
        },
    });

    return BookView;

});
