
/*
*存储
*/
export function saveToLocal(id, key, value) {
  let seller = window.localStorage._seller_
  if (!seller) {
    seller = {}
    seller[id] = {}
    seller[id][key] = value
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage._seller_ = JSON.stringify(seller)
}


/*
*读取
*/
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage._seller_
  if (!seller) { // 如果没有缓存
    return def //返回传入的默认值
  } else {
    seller = JSON.parse(seller)[id] // 如果缓存里不存在该id
    if (!seller) {
      return def //返回传入的默认值
    } else {
      let ret = seller[key]
      return ret || def
    }
  }
}