$(function () {
    //给去注册注册点击事件
    $('#loginID').on("click", function () {
        $('.reg').show();
        $('.login').hide();
    })
    //给去登陆注册点击事件
    $('#regID').on("click", function () {
        $('.login').show();
        $('.reg').hide();
    })
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码不能出现空格，且必须在6-12位之内!"],
        repwd: function (value) {
            var pwd = $('.reg [name=pwd]').val();
            if (pwd !== value) { return "两次输入的密码不一致!" }
        }
    })
    //监听注册表单提交事件    
    $('#reg_form').on('submit', function (e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        //获取数据
        var data = {
            username: $('.reg [name=username]').val(),
            password: $('.reg [name=pwd]').val()
        }
        console.log(data);
        //发起ajax Post请求实现注册行为
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) return layui.layer.msg(res.message);
            layui.layer.msg("注册成功!");
            $('.login [name=username]').val($('.reg [name=username]').val());
            $('.login [name=password]').val($('.reg [name=pwd]').val());
            $('#regID').click();
        })
    })
    //监听登录表单提交事件
    $('#login_form').submit(function (e) {
        console.log($(this).serialize());
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("登录成功!");
                // console.log(res);
                localStorage.setItem(res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })

    })
})