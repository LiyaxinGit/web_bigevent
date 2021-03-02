$(function () {
    //获取用户基本信息
    getUserInfo()
    //实现退出功能
    $('#call-go').on("click", function () {
        //eg1
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空localStorage里面的tocken
            localStorage.removeItem("token");
            //2.跳转到登录页面
            location.href="/login.html"
            layer.close(index);
        });
    })
})
function getUserInfo() {
    //发起ajax请求获取用户信息
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            console.log(res);
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data);
        }
    });
}
//渲染用户头像
function renderAvatar(user) {
    //获取用户的名字
    var name = user.nickname || user.username;
    //渲染欢迎文本
    $('.userinfo #welcome').html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic == null) {
        //渲染文本头像
        $('.userinfo .layui-nav-img').hide();
        $('.userinfo .text-avatar').show().html(name[0].toUpperCase());
    } else {
        //渲染图片头像
        $('.userinfo .text-avatar').hide();
        $('.userinfo .layui-nav-img').attr("src", user.user_pic).show();
    }

}