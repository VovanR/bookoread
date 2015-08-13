define([
    'jquery',
    'lodash',
    'backbone',
    'collections/BookCollection',
    'models/CurrentPageModel',
    'views/BookView',
    'views/PagerView',
], function (
    $,
    _,
    Backbone,
    BookCollection,
    CurrentPageModel,
    BookView,
    PagerView
) {

    'use strict';

    /**
     */
    var initialize = function () {
        window.book = new BookCollection();
        window.currentPage = new CurrentPageModel({
            collection: book,
        });
        window.boov = new BookView({
            collection: book,
            currentPageModel: currentPage,
        });
        window.pager = new PagerView({
            currentPageModel: currentPage,
        });
    };

    return {
        initialize: initialize,
    };

});
