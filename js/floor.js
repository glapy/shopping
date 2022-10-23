$(function() {
    var flag = true; // 节流阀（互斥锁）
    $(window).scroll(function() {
        if ($(document).scrollTop() >= $(".recommend").offset().top) {
            $(".fix").fadeIn();
        } else {
            $(".fix").fadeOut();
        }
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fix ul li").eq(i).addClass("click").siblings().removeClass("click");
                }
            })
        }
    });
    $(".fix ul li").click(function() {
        flag = false;
        // $("html").scrollTop($(".floor>div").eq($(this).index()).offset().top); // 没有动画效果
        $(this).addClass("click").siblings().removeClass("click");
        $("html").animate({
            scrollTop: $(".floor>div").eq($(this).index()).offset().top
        }, function() {
            flag = true;
        })
    })
})