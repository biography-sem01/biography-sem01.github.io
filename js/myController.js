// Danh
// Khai bao Angular App
var app = angular.module("myApp", ["ngRoute"]);
// app.config(function ($routeProvider, $locationProvider) {
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "/views/home.html" })
        .when("/404", { templateUrl: "/views/404.html" })
        .when("/sitemap", { templateUrl: "/views/sitemap.html" })
        .when("/news", { templateUrl: "/views/news.html", controller: 'pageNews' })
        .when("/news/:newsId", { templateUrl: "/views/news-detail.html", controller: 'newDetaile' })
        .when("/nobel-prizes", { templateUrl: "/views/nobel-prizes.html", controller: 'pageNobelList' })
        .when("/nobel-prizes/:bioId", { templateUrl: "./views/detail-bio.html", controller: 'bioDetaile' })
        .when("/about-us", { templateUrl: "/views/about-us.html", controller: 'pageAboutUs' })
        .when("/contact", { templateUrl: "/views/contact.html", controller: 'pageContact' })
        .when("/user", { templateUrl: "/views/user.html", controller: 'pageUser' })
        .when("/gallery", { templateUrl: "/views/gallery.html", controller: 'pageGallery' })
        .otherwise({ redirectTo: '/404' })
    // $locationProvider.html5Mode(true);
});

app.run(function ($rootScope, $anchorScroll, $location, $interval) {
    $rootScope.scrollTo = function (id) { $anchorScroll(id); };
    $rootScope.scrollFunction = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            document.getElementById("backToTop").style.cssText = "display: grid; animation-name: fadeIn";
        } else {
            document.getElementById("backToTop").style.cssText = "display: none; animation-name: fadeOut";
        }
    };
    window.onscroll = $rootScope.scrollFunction;
    // Check path = add class
    $rootScope.isActive = function (route) {
        return route === $location.path();
    };
    $rootScope.visitorData = JSON.parse(localStorage.getItem('visitorData')) || [];

    // Do action when router change success .
    $rootScope.$on('$routeChangeSuccess', function () {
        // Back To Top when ...
        $rootScope.scrollTo();
        // Visitor count by path
        var item = $rootScope.visitorData.find(function (item) {
            return item.path === $location.path();
        });
        if (item) {
            item.visitor++;
        } else {
            $rootScope.visitorData.push({ path: $location.path(), visitor: 1 });
        }
        localStorage.setItem('visitorData', JSON.stringify($rootScope.visitorData));
        $rootScope.showDataVisitor = $rootScope.visitorData.find(function (item) {
            return item.path === $location.path();
        });

        $rootScope.showOffcanvas = false;
    });
    $interval(function () { $rootScope.timenow = new Date() }, 1000);
    $rootScope.showTime = true;
    $rootScope.showVisitor = true;
});
app.controller('pageHome', function ($scope, $http) {
    $http.get("./data/homepage.json").then(function (resjson) {
        $scope.sliders = resjson.data.sliders;
        $scope.cta = resjson.data.callToAction;
        $scope.topNews = resjson.data.topNews;
        // Optimized use filter
        // $scope.topNews.forEach(function (mysrc) {
        //     if (mysrc.typeMedia == "video") {
        //         mysrc.embedUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + mysrc.scrMedia);
        //     }
        // });
    });
});
app.controller('pageNobelList', function ($scope, $http) {
    $http.get("./data/nobellist.json").then(function (resjson) {
        $scope.nobellist = resjson.data.nobellist;
        // simple pagination page
        $scope.pageSize = 10;
        $scope.totalPages = Math.ceil($scope.nobellist.length / $scope.pageSize);
        $scope.currentPage = 0;
        $scope.setDefaule = function () {
            $scope.selectedCategory = "";
            $scope.selectedYear = "";
        }
        // Random 4 post
        var postRD = [];
        while (postRD.length < 4) {
            let randomNum = Math.floor(Math.random() * $scope.nobellist.length); // generates a random number between 0 and scope.nobellist.length
            if (!postRD.includes(randomNum)) {
                postRD.push(randomNum); // adds the random number to the array
            }
        }
        // console.log(postRD);
        $scope.postRandom = [];
        for (var i = 0; i < postRD.length; i++) {
            $scope.postRandom.push(angular.copy($scope.nobellist[postRD[i]]));
        }
    });
});
app.controller('bioDetaile', function ($scope, $http, $routeParams) {
    $http.get("./data/nobellist.json").then(function (resjson) {
        $scope.detailbio = resjson.data.nobellist;
        var link = $routeParams.bioId;
        $scope.fullinfo = $scope.detailbio.find(function (item) { return item.link === link; });
        // Optimized
        // $scope.scrollTo = function (id) { $anchorScroll(id); };
        // $rootScope.scrollTo();
    });
});
app.controller('pageNews', function ($scope, $http) {
    $http.get("./data/news.json").then(function (resjson) {
        $scope.news = resjson.data.news;
        $scope.news.forEach(function (news) {
            news.datetime = new Date(news.datetime);
        });
        $scope.pageSize = 10;
        $scope.totalPages = Math.ceil($scope.news.length / $scope.pageSize);
        $scope.currentPage = 0;
    });
});
app.controller('newDetaile', function ($scope, $http, $routeParams) {
    $http.get("./data/news.json").then(function (resjson) {
        $scope.detailnews = resjson.data.news;
        var link = $routeParams.newsId;
        $scope.fullnews = $scope.detailnews.find(function (item) { return item.link === link; });
        // Optimized
        // $rootScope.scrollTo();
    });
});
// $sce is "Strict Contextual Escaping" /
app.filter('convert', function ($sce) { return $sce.trustAsHtml; });
app.filter('embed', function ($sce) { return function (url) { return $sce.trustAsResourceUrl(url); }; });

// Luan

app.controller("pageAboutUs", function ($scope, $http) {
    $scope.inFors = "";
    $http.get("./data/aboutus.json").then(function (response) {
        $scope.inFors = response.data;
    })
});
app.controller("pageContact", function ($scope, $http) {
    $scope.inFors = "";
    $http.get("./data/contact.json").then(function (response) {
        $scope.inFors = response.data;
    });
    $scope.submitForm = function (isValid) {
        if (isValid) {
            alert("Your message has been sent successfully!");
        }
    };
});

app.controller("pageGallery", function ($scope, $http) {
    $http.get("/data/gallery.json").then(function (response) {
        // Gallery
        $scope.images = response.data;
        // Active When Page is reloaded
        $scope.filterImages();
    });

    // Popup Function
    $scope.showPopup = function (image) {
        $scope.selectedImage = image;
        $scope.show = true;
    };

    // Hide Popup Function
    $scope.hidePopup = function () {
        $scope.show = false;
    };

    // Start of Filter Gallery
    $scope.filter = "all";

    $scope.setFilter = function (filter) {
        $scope.filter = filter;
    };

    $scope.filterImages = function () {
        if ($scope.filter === "all") {
            $scope.filteredImages = $scope.images;
        } else {
            $scope.filteredImages = $scope.images.filter(function (image) {
                return image.filter === $scope.filter;
            });
        }
    };

    $scope.$watch("filter", function () {
        $scope.filterImages();
    });
    // End of Filter Gallery
});


// Tuan


app.controller("pageUser", function ($scope) {
    $scope.clickReg = function () {
        document.getElementById("pills-home").style.display = "none";
        document.getElementById("pills-profile").style.display = "block";
    }

    $scope.clickLogin = function () {
        document.getElementById("pills-home").style.display = "block";
        document.getElementById("pills-profile").style.display = "none";
    }

    const inputs = document.querySelectorAll('input');

    const patterns = {
        username: /^[a-z\d]{5,12}$/i,
        username1: /^[a-z\d]{5,12}$/i,
        password1: /^[\d\w@-]{8,20}$/i,
        password: /^[\d\w@-]{8,20}$/i,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        phone: /^\d{3}-\d{3}-\d{4}$/,
        confirmpassword: /^[\d\w@-]{8,20}$/i
    };

    inputs.forEach((input) => {
        input.addEventListener('keyup', (e) => {
            validate(e.target, patterns[e.target.attributes.id.value]);
        });
    });

    function validate(field, regex) {
        if (regex.test(field.value)) {
            field.className = 'form-control valid';
            return true;
        } else {
            field.className = 'form-control invalid';
            return false;
        }
    }

    const confirmpasswordInput = document.getElementById('confirmpassword');
    confirmpasswordInput.addEventListener('keyup', (e) => {
        if (e.target.value === password1Input.value) {
            validate(e.target, patterns.confirm);
        } else {
            e.target.className = 'form-control invalid';
        }
    });



    var userData = [
        { username: "admin123", password: "Admin123" },
        { username: "user2", password: "pass2" },
        { username: "user3", password: "pass3" },
    ];



    $scope.submit1 = function () {
        var username = $scope.username;
        var password = $scope.password;

        var isUsernameValid = validate(document.getElementById("username"), patterns.username);
        var isPasswordValid = validate(document.getElementById("password"), patterns.password);

        if (username && password && isUsernameValid && isPasswordValid) {
            // Username and password are valid
            var match = false;
            for (var i = 0; i < userData.length; i++) {
                if (userData[i].username === username && userData[i].password === password) {
                    match = true;
                    break;
                }
            }

            // Show alert based on match status
            if (match) {
                alert("Logged in successfully!");
            } else {
                alert("Username or password is not correct");
                location.reload();
            }
        } else {
            // Username or password is not valid
            alert("Please fill in all fields correctly.");
            location.reload();
        }
    };


    $scope.submit2 = function () {
        var isUsernameValid1 = validate(document.getElementById("username1"), patterns.username1);
        var isPasswordValid1 = validate(document.getElementById("password1"), patterns.password);
        var isConfirmPasswordValid = validate(document.getElementById("confirmpassword"), patterns.password);
        var isEmailValid = validate(document.getElementById("email"), patterns.email);

        if ($scope.username1 && $scope.password1 && $scope.confirmpassword && $scope.email && isUsernameValid1 && isPasswordValid1 && isConfirmPasswordValid && isEmailValid) {
            if ($scope.password1 === $scope.confirmpassword) {
                alert("Registered successfully!");
            } else {
                $scope.password1 = '';
                $scope.confirmpassword = '';
                alert("Passwords do not match.");
            }
        } else {
            $scope.username1 = '';
            $scope.password1 = '';
            $scope.confirmpassword = '';
            $scope.email = '';
            alert("Please fill in all fields correctly.");
        }
    };

});
