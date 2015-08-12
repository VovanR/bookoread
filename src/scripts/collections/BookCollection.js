/**
 * @module BookCollection
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

define([
    'jquery',
    'lodash',
    'backbone',
    'models/PageModel',
], function (
    $,
    _,
    Backbone,
    PageModel
) {

    'use strict';

    /**
     * @alias module:BookCollection
     */
    var BookCollection = Backbone.Collection.extend({
        model: PageModel,
        url: '/pages.json',
        _current: null,

        /**
         * @param {Object} o
         * @param {CurrentPageModel} o.currentPageModel
         */
        initialize: function (o) {
            this._current = o.currentPageModel;

            var _this = this;

            this.fetch()
                .done(function() {
                    _this.setCurrent(1);
                })
                .fail(function() {
                    console.warn('fail');
                });
        },

        /**
         * @return {PageModel}
         * @public
         */
        getCurrent: function () {
            return this.get(this._current.get('current'));
        },

        /**
         * @param {Number} number
         * @public
         */
        setCurrent: function (number) {
            var _this = this;

            if (!_.isNull(this._current.get('current'))) {
                this.get(this._current.get('current')).set('isCurrent', false);
                this._current.set('current', null);
            }

            var current = this.findWhere({
                number: number,
            });
            if (current) {
                current.set('isCurrent', false);
                current.fetch()
                    .done(function () {
                        _this._current.set('current', current.id);
                    })
            }
        },
    });

    return BookCollection;

});
