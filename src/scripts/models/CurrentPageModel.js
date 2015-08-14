/**
 * @module CurrentPageModel
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
     * @alias module:CurrentPageModel
     */
    var CurrentPageModel = Backbone.Model.extend({
        defaults: {
            current: null,
        },

        /**
         * @param {Object} o Options
         * @param {BookCollection} o.collection
         */
        initialize: function (o) {
            this.collection = o.collection;
        },

        /**
         * @return {PageModel}
         * @public
         */
        getCurrent: function () {
            return this.collection.get(this.get('current'));
        },

        /**
         * @param {Number} number
         * @public
         */
        setCurrent: function (number) {
            var _this = this;

            var oldCurrentId = this.get('current');

            var current = this.collection.findWhere({
                number: number,
            });

            if (current) {
                current.set('isCurrent', true);
                current.fetch()
                    .done(function () {
                        if (!_.isNull(oldCurrentId)) {
                            _this.collection.get(oldCurrentId).set('isCurrent', false);
                        }
                        _this.set('current', current.id);
                    });
            }
        },
    });

    return CurrentPageModel;

});
