/**
 * @module BookTitleView
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
    'jquery',
    'lodash',
    'backbone',
], function (
    $,
    _,
    Backbone
) {

    'use strict';

    /**
     * @alias module:BookTitleView
     */
    var BookTitleView = Backbone.View.extend({
        el: '#book-title',

        /**
         * @param {Object} o Options
         * @param {BookCollection} o.collection
         */
        initialize: function (o) {
            this.collection.on('collection:updated', this.render, this);
        },

        /**
         * @param {Object} o
         * @param {String} o.title
         */
        render: function (o) {
            this.$el.text(o.title);
        },
    });

    return BookTitleView;

});
