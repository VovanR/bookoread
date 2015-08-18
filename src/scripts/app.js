define([
    'jquery',
    'lodash',
    'backbone',
    'collections/BookCollection',
    'models/CurrentPageModel',
    'views/BookView',
    'views/BookTitleView',
    'views/PagerView',
    'routers/AppRouter',
], function (
    $,
    _,
    Backbone,
    BookCollection,
    CurrentPageModel,
    BookView,
    BookTitleView,
    PagerView,
    AppRouter
) {

    'use strict';

    /**
     */
    var initialize = function () {
        var book = new BookCollection();
        var currentPage = new CurrentPageModel({
            collection: book,
        });
        book.fetch()
            .done(function () {
                if (!Backbone.history.start()) {
                    currentPage.setCurrent(1);
                }
            })
            .fail(function () {
                console.warn('fail');
            });
        var boov = new BookView({
            collection: book,
            currentPageModel: currentPage,
        });
        var bookTitle = new BookTitleView({
            collection: book,
        });
        var pager = new PagerView({
            collection: book,
            currentPageModel: currentPage,
        });
        var router = new AppRouter({
            currentPageModel: currentPage,
        });

        currentPage.on('change:current', function () {
            router.navigate('page/' + currentPage.getCurrent().get('number'), {
                trigger: false,
            });
        });
    };

    return {
        initialize: initialize,
    };

});
