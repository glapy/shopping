window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var icon_l = focus.querySelector('.icon-l');
    var icon_r = focus.querySelector('.icon-r');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');

    // 1. 鼠标经过时显示左右箭头，停止定时器  鼠标离开时隐藏左右箭头，开启定时器
    focus.addEventListener('mouseenter', function() {
        icon_l.style.display = 'block';
        icon_r.style.display = 'block';
        clearInterval(timer);
    })
    focus.addEventListener('mouseleave', function() {
        icon_l.style.display = 'none';
        icon_r.style.display = 'none';
        timer = setInterval(function() {
            icon_r.click();
        }, 2000)
    })

    // 2. 动态生成小圆圈（有多少张轮播图就生成多少个小圆圈）
    for (var i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement('li');
        // 创建小圆圈的同时设置索引号
        li.setAttribute('data-index', i);
        ol.appendChild(li);
        // 3. 鼠标经过小圆圈时，指定的小圆圈变色（排他思想）
        ol.children[i].addEventListener('mouseenter', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';

            // 4. 鼠标经过小圆圈时，实现图片动画切换效果，注意是ul移动，使用动画函数的前提是该元素必须有定位

            // 鼠标经过小圆圈时，获取它的索引号
            var index = this.getAttribute('data-index');

            num = circle = index; //解决第6点出现的bug，当鼠标经过到某个小圆圈时，要把其索引号赋值给num和circle

            var focusWidth = focus.offsetWidth; // 图片的宽度
            // ul移动距离：-小圆圈的索引号 * 图片的宽度，注意要为负值
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';

    // 5. 每点击一次右箭头，图片就切换一张

    // 图片无缝滚动原理：复制第一个li放到最后，当图片滚动到克隆的最后一张图片时（即num == ul.children.length - 1），就让ul快速、不做动画的跳到最左侧（即left：0），同时num=0

    // 复制（克隆）第一个图片放到ul的最后面
    var first_li = ul.children[0].cloneNode(true);
    ul.appendChild(first_li);

    // 声明一个变量num(控制图片)，点击一次，自增1
    // 声明一个变量circle（控制小圆圈），点击一次，自增1
    var num = 0;
    var circle = 0;
    var focusWidth = focus.offsetWidth; // 图片的宽度
    var flag = true; // 节流阀
    icon_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            // 此时ul移动的距离：num * 图片的宽度
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });

            // 6. 点击的同时，小圆圈也要跟着发生变化

            circle++;
            // 当控制小圆圈的circle到复制的那张图片的位置时，就让circle=0
            circle == ol.children.length ? circle = 0 : circle;
            // 调用函数
            controlCircle();
        }
    })

    // 7. 每点击一次左箭头，图片就切换一张
    icon_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                ul.style.left = -(ul.children.length - 1) * focusWidth;
                num = ul.children.length - 1;
            }
            num--;
            // 此时ul移动的距离：num * 图片的宽度
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });

            circle--;
            // 当控制小圆圈的circle为负值时，就让current到最后一个小圆圈上，即circle = ol.children.length - 1
            circle < 0 ? circle = ol.children.length - 1 : circle;
            // 调用函数
            controlCircle();
        }
    })

    function controlCircle() {
        // 清除所有类，再指定添加类（排他思想）
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    // 8. 自动播放轮播图
    var timer = setInterval(function() {
        icon_r.click();
    }, 2000)
})