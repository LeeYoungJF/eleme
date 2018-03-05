/**
 * 解析url参数 获取商家id
 * @example ?id=123&a=b
 * @return Object {id:123,a:b}
 */
export function urlParse() {

  let url = window.location.search

  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  //?或&后跟着非?或&(一个或多个), =(中间用等号连接), 非?或&(一个或多个), 全局匹配
  let arr = url.match(reg)  
  //匹配到一个数组 ['?id=123', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=') 
      //剔除第一个字符 分离参数名和值 ['id', '123']  ['a', 'b']
      let key = decodeURIComponent(tempArr[0]) 
      let val = decodeURIComponent(tempArr[1]) 
      obj[key] = val //把匹配到的数组转为对象

    })
  }
  // console.log(obj)
  // return obj
  return {'id' : '123'}
   
}