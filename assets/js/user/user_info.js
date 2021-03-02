$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！';
            }
        }
    })
    initUserInfo()
    //初始化用户的基本信息
    function initUserInfo() {
        //发起ajax请求获取用户信息
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if(res.status!==0){
                return layui.layer.msg("获取用户信息失败!");
                }
                // 调用 form.val() 快速为表单赋值
                form.val("formUserInfo",res.data)
            }
        });
    }
    //重置表单的数据
    $('#btnReset').on("click",function(e){
      //阻止表单的默认重置行为
      e.preventDefault();
        initUserInfo();
    })
    //监听表单的提交事件
    $('.layui-form').on("submit",function(e){
        //阻止表单的默认提交行为
        e.preventDefault();
        // console.log($(this).serialize());
        //发起ajax请求
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data:$(this).serialize(),
            success: function (res) {
                console.log(res);
                if(res.status!==0){
                    return layui.layer.msg("更新用户失败");
                }
                //更新用户成功
                layui.layer.msg("更新用户成功!");
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            }
        });
    })
})