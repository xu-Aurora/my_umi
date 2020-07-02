
/**  localStorage设置值
 * @param { string } key  属性
 * @param { string } value 值
 */
const localStorageSet = (key: string, value: any) => {
  if (typeof (value) === 'object') {
    value = JSON.stringify(value)
  };
  localStorage.setItem(key, value)
};

/** localStorage获取值
 * @param { string } key  属性
 */
const localStorageGet = (key: string) => {
  return localStorage.getItem(key)
};



export {
  localStorageSet,
  localStorageGet,
}