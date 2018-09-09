/**
 * Created by Administrator on 2018/8/31 0031.
 */
//获取cookie、
export function getCookie(name) {
  //var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  //if (arr = document.cookie.match(reg))
  //  return (arr[2]);
  //else
  //  return null;
  var strcookie = document.cookie;//获取cookie字符串
  var arrcookie = strcookie.split("; ");//分割
//遍历匹配
  for ( var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split("=");
    if (arr[0] == name){
      return arr[1];
    }
  }
  return "";
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
