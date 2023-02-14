// Khai bao Angular App
var app = angular.module("myApp", ["ngRoute"]);
// app.config(function ($routeProvider, $locationProvider) {
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "./views/home.html" })
        .when("/news", { templateUrl: "./views/news.html", controller: 'pageNews' })
        .when("/news/:newsId", { templateUrl: "./views/news-detail.html", controller: 'newDetailController' })
        .when("/nobel-prizes", { templateUrl: "./views/nobel-prizes.html", controller: 'pageNobelList' })
        .when("/nobel-prizes/:bioId", { templateUrl: "./views/detail-bio.html", controller: 'detailBio' })
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
        });
    });
});
app.controller('pageNobelList', function ($scope, $http) {
    $http.get("./data/nobellist.json").then(function (resjson) {
        $scope.nobellist = resjson.data.nobellist;
    });
});
app.controller('pageNews', function ($scope, $http) {
    $http.get("./data/news.json").then(function (resjson) {
        $scope.news = resjson.data.news;
    });

});
app.controller('newDetailController', function ($scope, $http, $routeParams) {
    $http.get("./data/news.json").then(function (resjson) {
        $scope.detailnews = resjson.data.news;
        var link = $routeParams.newsId;
        $scope.fullnews = $scope.detailnews.find(function (item) { return item.link === link; });
    });

});