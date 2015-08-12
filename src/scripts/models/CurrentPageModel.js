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
    });

    return CurrentPageModel;

});
