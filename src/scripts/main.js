define('jquery', [], function () { return window.jQuery; });
define('lodash', [], function () { return window._; });
define('handlebars', [], function () { return window.Handlebars; });
define('backbone', [], function () { return window.Backbone; });
define('tinycolor', [], function () { return window.tinycolor; });

require([
    'app',
], function (
    App
) {

    'use strict';

    App.initialize();

});
