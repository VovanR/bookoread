/**
 * @module PageModel
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
     * @alias module:PageModel
     */
    var PageModel = Backbone.Model.extend({
        defaults: {
            text: '',
            number: 0,
            isCurrent: false,
        },
        urlRoot: '/pages',
        idAttribute: 'file',

        /**
         */
        sync: function (method, model, options) {
            options.dataType = 'text';

            return Backbone.sync(method, model, options);
        },

        /**
         */
        parse: function (data) {
            if (!_.isObject(data)) {
                data = {
                    text: data,
                };
            }

            return data;
        },
    });

    return PageModel;

});
