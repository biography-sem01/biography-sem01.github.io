// Toggle JavaScript
let questions = document.querySelectorAll(".infor-2-2-question");

questions.forEach( (question) => {
    question.addEventListener("click", function(){
        question.classList.toggle("infor-2-2-question_active");

        const nextElement = question.nextElementSibling;
        nextElement.classList.toggle("infor-2-2-panel_active");
    })
})

// Timeline JavaScript - Jquery
$(".step").click(function () {
    $(this).addClass("active").prevAll().addClass("active");
    $(this).nextAll().removeClass("active");
});

$(".step01").click(function () {
    $("#line-progress").css("width", "3%");
    $(".discovery").addClass("active").siblings().removeClass("active");
});

$(".step02").click(function () {
    $("#line-progress").css("width", "25%");
    $(".strategy").addClass("active").siblings().removeClass("active");
});

$(".step03").click(function () {
    $("#line-progress").css("width", "50%");
    $(".creative").addClass("active").siblings().removeClass("active");
});

$(".step04").click(function () {
    $("#line-progress").css("width", "75%");
    $(".production").addClass("active").siblings().removeClass("active");
});

$(".step05").click(function () {
    $("#line-progress").css("width", "100%");
    $(".analysis").addClass("active").siblings().removeClass("active");
});