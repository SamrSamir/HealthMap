// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', "firebase", 'starter.controllers', 'starter.directives', 'chart.js', 'ionic-material', 'ionMdInput'])
    .value('report', {})
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
.config(function($sceDelegateProvider)
{
    $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'AppCtrl'
    })

    .state('activity', {
        url: '/activity',

                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
    })




    .state('profile', {
        url: '/profile',
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
    })

        .state('map', {
            url: '/map',
                    templateUrl: 'templates/map.html',
                    controller: 'MapCtrl'

        })

        .state('status', {
            url: '/status',
                    templateUrl: 'templates/status.html',
                    controller: 'StatusCtrl'
        })

        .state('symptom', {
            url: '/symptom',
                    templateUrl: 'templates/symptom.html',
                    controller: 'SymptomCtrl'
        })
        .state('ListSymptom', {
            url: '/ListSymptom',
            templateUrl: 'templates/KnowSymptom.html',
            controller: 'ListSymptomCtrl'
        })


        .state('disease', {
            url: '/disease',
                    templateUrl: 'templates/disease.html',
                    controller: 'DiseaseCtrl'
        })

        .state('reportMap', {
            url: '/reportMap',
            templateUrl: 'templates/reportMap.html',
            controller: 'ReportMapCtrl'

        })
        .state('report', {
            url: '/report',
            templateUrl: 'templates/report.html',
            controller: 'ReportCtrl'

        })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/main');
});
