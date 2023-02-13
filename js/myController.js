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

app.controller('pageHome', function ($scope, $http) {
    $http.get("./data/homepage.json").then(function (resjson) {
        $scope.sliders = resjson.data.sliders;
        $scope.cta = resjson.data.callToAction;
        $scope.topNews = resjson.data.topNews;
        $scope.topNews.forEach(function (mysrc) {
            if (mysrc.typeMedia == "video") {
                mysrc.mediaContent = '<iframe width="100%" height="350" src="' + mysrc.scrMedia + '"title="Nobel Minds 2022" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in- picture; web-share" allowfullscreen></iframe>';
            } else if (mysrc.typeMedia == "photo") {
                mysrc.mediaContent = '<img src="' + mysrc.scrMedia + '" alt="">';
            }
            console.log(mysrc);
        });
    });
});

app.controller('pagePrizes', function ($scope, $http) {


});