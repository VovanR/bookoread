/**
 * @module PagerView
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
    'jquery',
    'lodash',
    'backbone',
    'text!templates/PagerTemplate.html'
], function (
    $,
    _,
    Backbone,
    PagerTemplate
) {

    'use strict';

    /**
     * @alias module:PagerView
     */
    var PagerView = Backbone.View.extend({
        el: '#book-pager',
        template: _.template(PagerTemplate),

        /**
         * @param {Object} o Options
         * @param {CurrentPageModel} o.currentPageModel
         * @param {BookCollection} o.collection
         */
        initialize: function (o) {
            this._current = o.currentPageModel;

            this.listenTo(this._current, 'change:current', this._onChangeCurrent);

            this.render();
        },

        /**
         */
        render: function () {
            this.$el.html(this.template());

            this._$prevWrap = this.$('.js-book-pager__prev-wrap');
            this._$nextWrap = this.$('.js-book-pager__next-wrap');
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
         * @private
         */
        _onChangeCurrent: function () {
            var current = this._current.getCurrent().get('number');
            var count = this.collection.length;

            this._$prevWrap.removeClass('disabled');
            this._$nextWrap.removeClass('disabled');

            if (current === 1) {
                this._$prevWrap.addClass('disabled');
            } else if (current === count) {
                this._$nextWrap.addClass('disabled');
            }
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
