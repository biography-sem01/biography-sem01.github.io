// Khai bao Angular App
var app = angular.module("myApp", ["ngRoute"]);
// app.config(function ($routeProvider, $locationProvider) {
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "./views/home.html" })
        .when("/bio", { templateUrl: "./views/detail-biography.html" })
        .otherwise({ redirectTo: '/' })
    // $locationProvider.html5Mode(true);
});

app.controller('pageHome', function ($scope, $http, $sce) {
    $http.get("./data/homepage.json").then(function (resjson) {
        $scope.sliders = resjson.data.sliders;
        $scope.cta = resjson.data.callToAction;
        $scope.topNews = resjson.data.topNews;
        $scope.topNews.forEach(function (mysrc) {
            if (mysrc.typeMedia == "video") {
                mysrc.embedUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + mysrc.scrMedia);
            }
            console.log(mysrc);
        });
    });
});

app.controller('pagePrizes', function ($scope, $http) {


});