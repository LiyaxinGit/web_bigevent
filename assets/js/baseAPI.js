// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$(function(){
    $.ajaxPrefilter(function(options){
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    // console.log(options.url);
    options.url="http://ajax.frontend.itheima.net"+options.url;
    
    //判断如果url地址里以/my/开头的就配置headers
    // console.log(options.url);
    if(options.url.indexOf("/my/")!==-1){
     //headers就是请求头配置对象
     options.headers={
        Authorization:localStorage.getItem("token")||''
      }
    }
    
    //实现页面的拦截功能
    //complate:函数 不论成功还是失败，最终都会调用complate回调函数
    options.complete=function(res){
        // console.log('执行了xomplete回调函数');
        // console.log(res);
        //在complete回调函数中,可以使用res.responeJSON 拿到服务器响应回来的数据
        if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
        //强制清空tocken
        localStorage.removeItem('token');
        //跳转到login页面
        location.href="/login.html"
        }
    }
    }) 
})