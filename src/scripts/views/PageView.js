/**
 * @module PageView
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
     * @alias module:PageView
     */
    var PageView = Backbone.View.extend({
        className: 'book-page',

        /**
         * @param {Object} o Options
         * @param {PageModel} o.model
         */
        initialize: function (o) {
            this.listenTo(this.model, 'change:isCurrent', this._onCurrentChange);
            this.listenTo(this.model, 'destroy', this.destroy);
        },

        /**
         * @return {jQuery}
         */
        render: function () {
            this.$el.html(marked(this.model.get('text')));

            return this.$el;
        },

        /**
         */
        destroy: function () {
            this.undelegateEvents();
            this.remove();
        },

        /**
         * @private
         */
        _onCurrentChange: function () {
            if (!this.model.get('isCurrent')) {
                this.destroy();
            }
        },
    });

    return PageView;

});
