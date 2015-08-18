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
        url: 'book.json',

        /**
         */
        parse: function (response) {
            this.trigger('collection:updated', {
                title: response.title,
            });

            return response.pages;
        },
    });

    return BookCollection;

});
