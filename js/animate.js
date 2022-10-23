// 封装函数，便于多次调用
function animate(obj, target, callback) { // obj目标对象  target目标位置  time延时时间
    // 当我们不断的点击按钮，这个元素的速度会越来越快，因为开启了太多的定时器
    // 解决方案：让元素只有一个定时器执行，即先清除所有定时器，再开启定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 实现缓动效果：让下面固定的值“1”变为不定值，缓动动画公式：（目标值-当前位置）/10
        var step = (target - obj.offsetLeft) / 10;
        if (step >= 0) {
            step = Math.ceil(step); // 大于0向上取整
        } else {
            step = Math.floor(step); // 小于0向下取整
        }
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if (callback) {
            //     callback();
            // }
            callback && callback(); // 逻辑中断
        } else {
            obj.style.left = obj.offsetLeft + step + 'px';
            // obj.style.left = obj.offsetLeft + 1 + 'px';
        }
    }, 15)
}