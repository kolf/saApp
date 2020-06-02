import Taro from "@tarojs/taro";
import moment from "moment";

const VALUE = ":storage:value";
const EXPIRE = ":storage:expire";

// 缓存一个有过期时间的键值对。过期时间单位为秒
const set = (key, value, expire = 86400) => {
  try {
    Taro.setStorageSync(`${key}${VALUE}`, value);
    Taro.setStorageSync(`${key}${EXPIRE}`, moment().add(expire, "s"));
  } catch (e) {
    return false;
  }
};

const get = key => {
  try {
    const expiredDate = Taro.getStorageSync(`${key}${EXPIRE}`);

    if (expiredDate) {
      // 如果当前时间在过期时间之前，则数据还未过期
      if (moment().isBefore(expiredDate)) {
        return Taro.getStorageSync(`${key}${VALUE}`);
      }
      // 数据已经过期，清除数据
      remove(`${key}${EXPIRE}`);
      remove(`${key}${VALUE}`);
      return null;
    }
    return null;
  } catch (e) {
    return null;
  }
};

const remove = key => {
  if (get(key)) {
    Taro.removeStorageSync(`${key}${EXPIRE}`);
    Taro.removeStorageSync(`${key}${VALUE}`);
  }
};

const clear = () => {
  Taro.clearStorageSync();
};

export default { set, get, remove, clear };
