// Khai bao Angular App
var app = angular.module("myApp", ["ngRoute"]);
// app.config(function ($routeProvider, $locationProvider) {
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "./views/home.html", controller: "myControll" })
        .when("/bio", { templateUrl: "./views/detail-biography.html", controller: "myControll" })
        .otherwise({ redirectTo: '/' })
    // $locationProvider.html5Mode(true);
});

app.controller('myControll', function ($scope, $http) {


});