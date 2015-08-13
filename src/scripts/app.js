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
        var book = new BookCollection();
        var currentPage = new CurrentPageModel({
            collection: book,
        });
        var boov = new BookView({
            collection: book,
            currentPageModel: currentPage,
        });
        var pager = new PagerView({
            currentPageModel: currentPage,
        });
    };

    return {
        initialize: initialize,
    };

});
