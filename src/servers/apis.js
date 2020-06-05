/* eslint-disable import/prefer-default-export */
import http from "./http";

export const getBannerList = params => {
  return http.get("/api/v1/front/cu/cuPlan", params);
};
export const getBanner = params => {
  return http.get("/api/v1/front/cu/cuPlanById", params);
};
// 小程序手机号登录或注册获取验证码
export const verificationCode = params => {
  return http.get("/api/v1/front/cu/verificationCode", params);
};
export const phoneLogin = params => {
  return http.get("/api/v1/front/cu/phoneLogin", params);
};
export const getOrderList = params => {
  return http.get("/api/v1/front/fawOrder/cuOrders", params);
};
export const getOrder = params => {
  return http.get("/api/v1/front/fawOrder/detailById", params);
};
export const getConponListTotal = params => {
  return http.get("/api/v1/front/fawCouponRecord/getRecordStatusCount", params);
};
export const getConponList = params => {
  return http.get("/api/v1/front/fawCouponRecord/list", params);
};

export const getConpon = params => {
  return http.get("/api/v1/front/fawCouponRecord/id", params);
};

export const getUserInfo = params => {
  return http.get("/api/v1/front/cu/findCUInfo", params);
};

export const logout = params => {
  return http.get("/api/v1/front/dis/logout", params);
};

export const updateHobby = params => {
  return http.get("/api/v1/front/cu/hobbyUp", params);
};
//getUserInfo
// getConpon
export const receiveConpon = params => {
  return http.post("/api/v1/front/fawCouponRecord/receive", params);
};
// getOrder
export const createOrder = params => {
  return http.get("/api/v1/front/fawOrder/createOrder", params);
};

//createOrder
export const getUserCarOptions = params => {
  return http.get("/api/v1/front/cu/carList", params).then(res => {
    if (res.code !== 200) {
      return [];
    }
    return res.data.map(item => ({
      value: item.id + "",
      label: item.carName
    }));
  });
};
export const getUserCarList = params => {
  return http.get("/api/v1/front/cu/carList", params).then(res => {
    if (res.code !== 200) {
      return [];
    }
    return res.data;
  });
};
export const getUserAdvisor = params => {
  return http.get("/api/v1/front/cu/findMySa", params).then(res => {
    if (res.code !== 200) {
      return {};
    }
    return res.data;
  });
};

export const updateRegion = params => {
  return http.get("/api/v1/front/cu/addressUp", params);
};
export const updatePhone = params => {
  return http.get("/api/v1/front/cu/phoneUp", params);
};
export const wxLogin = params => {
  return http.get("/api/v1/front/cu/wxLogin", params);
};
export const getEvaluation = params => {
  return http.post("/api/v1/front/fawOrderEvaluation/tobeEvaluation", params);
};

export const createEvaluation = (params, body) => {
  return http.post("/api/v1/front/fawOrderEvaluation/evaluation", params, {
    data: body,
    contentType: "application/x-www-form-urlencoded;charset=utf-8"
  });
};

export const updateUserName = async params => {
  try {
    const res1 = await http.get("/api/v1/front/cu/realNameUp", {
      realName: params.realName
    });
    if (res1.code !== 200) {
      return false;
    }
    const res2 = await http.get("/api/v1/front/cu/genderUp", {
      gender: params.gender
    });
    if (res2.code !== 200) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
//birthdayUp
export const updateUserBirthday = params => {
  return http.get(`/api/v1/front/cu/birthdayUp`, params);
};

// getVinCodeByImg
export const getVinCodeByImage = params => {
  return http.post(`/api/v1/bg/iocr/getVinCodeByImg`, params);
};
export const updateUserCar = params => {
  return http.get(
    `/api/v1/front/cu/${params.id ? "updateCarInfo" : "addCarInfo"}`,
    params
  );
};
// findSAbyCode
export const getAdvisorList = params => {
  return http.get(`/api/v1/front/cu/findSAbyCode`, params);
};

//api/v1/front/cu/choiceSa
export const bindUserAdvisor = params => {
  return http.get(`/api/v1/front/cu/choiceSa`, params);
};
// addCarInfo
export const getCarOptions = params => {
  return http.get("/api/v1/front/cu/carTypeList", params).then(res => {
    if (res.code !== 200) {
      return [];
    }
    return res.data.map(item => ({
      value: item.id + "",
      label: item.carName
    }));
  });
};
