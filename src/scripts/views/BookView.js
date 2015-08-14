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
         * @param {Object} o Options
         * @param {CurrentPageModel} o.currentPageModel
         * @param {BookCollection} o.collection
         */
        initialize: function (o) {
            this._current = o.currentPageModel;

            this.listenTo(this._current, 'change', this.render);
        },

        /**
         */
        render: function () {
            this.$el.empty();

            var current = this._current.getCurrent();

            if (!current) {
                return;
            }

            var page = new PageView({
                model: current,
            });

            this.$el.html(page.render());
        },
    });

    return BookView;

});
