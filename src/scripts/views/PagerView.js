/**
 * @module PagerView
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
    'jquery',
    'lodash',
    'backbone',
    'marked',
], function (
    $,
    _,
    Backbone,
    marked
) {

    'use strict';

    /**
     * @alias module:PagerView
     */
    var PagerView = Backbone.View.extend({
        el: '#book-pager',

        /**
         * @param {Oblect} o Options
         * @param {CurrentPageModel} o.currentPageModel
         */
        initialize: function (o) {
            this._current = o.currentPageModel;
        },

        events: {
            /**
             */
            'click .js-book-pager__prev': function (e) {
                this._setPrev();

                e.preventDefault();
            },

            /**
             */
            'click .js-book-pager__next': function (e) {
                this._setNext();

                e.preventDefault();
            },
        },

        /**
         * @private
         */
        _setPrev: function () {
            var current = this._current.getCurrent().get('number');
            this._current.setCurrent(--current);
        },

        /**
         * @private
         */
        _setNext: function () {
            var current = this._current.getCurrent().get('number');
            this._current.setCurrent(++current);
        },

        /**
         */
        destroy: function () {
            this.undelegateEvents();
            this.remove();
        },
    });

    return PagerView;

});
