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
        className: 'page',

        /**
         * @param {Oblect} o Options
         * @param {PageModel} o.model
         */
        initialize: function () {
            // this.listenTo(this.model, 'change:isCurrent', this._onCurrentChange);
            console.log('1');
            // this.listenTo(this.model, 'destroy', this.destroy);

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
        _onCurrentChange: function (a) {
            console.log(a);
        },
    });

    return PageView;

});
