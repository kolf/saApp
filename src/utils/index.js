import Taro from "@tarojs/taro";
import moment from "moment";

export function spliceUrl(data) {
  let searchUrl = "?";
  Object.keys(data).forEach(key => {
    searchUrl += key + "=" + data[key] + "&";
  });
  return searchUrl;
}

export function goTo(pathName, data, isNew) {
  Taro[isNew === false ? "redirectTo" : "navigateTo"]({
    url: `${pathName}/index${data ? spliceUrl(data) : ""}`
  });
}

export function getCityName(city, province) {
  if (!city) {
    return "";
  }
  return `${city} ${province}`;
}

export function getDownTime(startTime) {
  const df = moment().diff(moment(startTime));
  const d = moment.duration(df);
  return [d.days(), d.hours(), d.minutes(), d.seconds()];
}

export function toPercentage(floatNumber = 0) {
  return parseInt(floatNumber * 100) + "%";
}
