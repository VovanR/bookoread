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

        initialize: function (o) {
            this.collection = o.collection;
            var _this = this;

            this.collection.fetch()
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
            return this.collection.get(this.get('current'));
        },

        /**
         * @param {Number} number
         * @public
         */
        setCurrent: function (number) {
            var _this = this;

            var currentId = this.get('current');
            if (!_.isNull(currentId)) {
                this.collection.get(currentId).set('isCurrent', false);
                this.set('current', null);
            }

            var current = this.collection.findWhere({
                number: number,
            });
            if (current) {
                current.set('isCurrent', true);
                current.fetch()
                    .done(function () {
                        _this.set('current', current.id);
                    })
            }
        },
    });

    return CurrentPageModel;

});
