define([
    'jquery',
    'lodash',
    'backbone',
    'collections/BookCollection',
    'models/CurrentPageModel',
    'views/BookView',
], function (
    $,
    _,
    Backbone,
    BookCollection,
    CurrentPageModel,
    BookView
) {

    'use strict';

    /**
     */
    var initialize = function () {
        var currentPage = new CurrentPageModel();
        window.book = new BookCollection({
            currentPageModel: currentPage,
        });
        window.boov = new BookView({
            collection: book,
            currentPageModel: currentPage,
        });
    };

    return {
        initialize: initialize,
    };

});
