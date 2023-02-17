// Danh
// Khai bao Angular App
var app = angular.module("myApp", ["ngRoute"]);
// app.config(function ($routeProvider, $locationProvider) {
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "./views/home.html" })
        .when("/news", { templateUrl: "./views/news.html", controller: 'pageNews' })
        .when("/news/:newsId", { templateUrl: "./views/news-detail.html", controller: 'newDetaile' })
        .when("/nobel-prizes", { templateUrl: "./views/nobel-prizes.html", controller: 'pageNobelList' })
        .when("/nobel-prizes/:bioId", { templateUrl: "./views/detail-bio.html", controller: 'bioDetaile' })
        .when("/about-us", { templateUrl: "./views/about-us.html", controller: 'pageAboutUs' })
        .when("/contact", { templateUrl: "./views/contact.html", controller: 'pageContact' })
        .otherwise({ redirectTo: '/' })
    // $locationProvider.html5Mode(true);
});

app.run(function ($rootScope, $anchorScroll) {
    $rootScope.scrollTo = function (id) { $anchorScroll(id); };
    $rootScope.scrollFunction = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            document.getElementById("backToTop").style.cssText = "display: grid; animation-name: fadeIn";
        } else {
            document.getElementById("backToTop").style.cssText = "display: none; animation-name: fadeOut";
        }
    };
    window.onscroll = $rootScope.scrollFunction;
});

app.controller('pageHome', function ($scope, $http) {
    $http.get("./data/homepage.json").then(function (resjson) {
        $scope.sliders = resjson.data.sliders;
        $scope.cta = resjson.data.callToAction;
        $scope.topNews = resjson.data.topNews;
        // $scope.topNews.forEach(function (mysrc) {
        //     if (mysrc.typeMedia == "video") {
        //         mysrc.embedUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + mysrc.scrMedia);
        //     }
        // });
    });
});
app.controller('pageNobelList', function ($scope, $http, $location) {
    $http.get("./data/nobellist.json").then(function (resjson) {
        $scope.nobellist = resjson.data.nobellist;

    });
    // let searchParams = $location.search();
    // var keywords = searchParams.keywords;
});
app.controller('bioDetaile', function ($scope, $http, $routeParams) {
    $http.get("./data/nobellist.json").then(function (resjson) {
        $scope.detailbio = resjson.data.nobellist;
        var link = $routeParams.bioId;
        $scope.fullinfo = $scope.detailbio.find(function (item) { return item.link === link; });
        // $scope.scrollTo = function (id) { $anchorScroll(id); };
    });
});
app.controller('pageNews', function ($scope, $http) {
    $http.get("./data/news.json").then(function (resjson) {
        $scope.news = resjson.data.news;
    });

});
app.controller('newDetaile', function ($scope, $http, $routeParams) {
    $http.get("./data/news.json").then(function (resjson) {
        $scope.detailnews = resjson.data.news;
        var link = $routeParams.newsId;
        $scope.fullnews = $scope.detailnews.find(function (item) { return item.link === link; });
    });
});

app.controller('pageAboutUs', function ($scope, $http) {
    $http.get("./data/aboutus.json").then(function (resjson) {
        $scope.aboutus = resjson.data;
    });
});

app.filter('convert', function ($sce) { return $sce.trustAsHtml; });
app.filter('embed', function ($sce) { return function (url) { return $sce.trustAsResourceUrl(url); }; });
