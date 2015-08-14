/**
 * @module AppRouter
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
     * @alias module:AppRouter
     */
    var AppRouter = Backbone.Router.extend({
        /**
         */
        initialize: function (o) {
            this._current = o.currentPageModel;
        },

        routes: {
            'page/:query': 'page',
        },

        /**
         * @param {Number} page
         * @public
         */
        page: function (page) {
            this._current.setCurrent(parseInt(page, 10));
        },
    });

    return AppRouter;

});
