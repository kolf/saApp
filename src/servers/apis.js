/* eslint-disable import/prefer-default-export */
import http from "./http";

export const confirmBind = params => {
  return http.get("/api/v1/front/dis/confirmBind", params);
};
export const getCuDetail = params => {
  return http.get("/api/v1/front/dis/cuDetail", params);
};
export const getCuList = params => {
  return http.get("/api/v1/front/dis/cuList", params);
};

//顾问列表
export const getadvisersList = params => {
  return http.get("/api/v1/front/fawOrder/advisers", params);
};

//车主试驾
export const customerTestDrive = params => {
  return http.get("/api/v1/front/fawOrder/customerTestDrive", params);
};

//评估顾问确认
export const setEcOrderComplete = params => {
  return http.get("/api/v1/front/fawOrder/ecOrderComplete", params);
};

// 车型列表
export const getCarTypeList = params => {
  return http.get("/api/v1/front/cu/carTypeList", params);
};
//上传AC卡
export const uploadAcCard = params => {
  return http.get("/api/v1/front/fawOrder/uploadAcCard", params);
};

//订单转发
export const setOrderTransfer = params => {
  return http.get("/api/v1/front/fawOrder/orderTransfer", params);
};

// 超时原因
export const setTimeoutReason = params => {
  return http.get("/api/v1/front/fawOrder/timeoutReason", params);
};

// 店总审核
export const examine = params => {
  return http.get("/api/v1/front/dis/examine", params);
};

// 我的积分
export const getMyJF = params => {
  return http.get("/api/v1/front/dis/myJF", params);
};
// 提交至店总
export const submitDZ = params => {
  return http.get("/api/v1/front/dis/submitDZ", params);
};

export const getNewCU = params => {
  return http.get("/api/v1/front/dis/newCUdetail", params);
};
export const getNewCUList = params => {
  return http.get("/api/v1/front/dis/newCUList", params);
};

// /api/v1/front/cu/verificationCode
// 小程序手机号登录或注册获取验证码
export const verificationCode = params => {
  return http.get("/api/v1/front/cu/verificationCode", params);
};

export const getStaff = params => {
  return http.get("/api/v1/front/dis/staffDetail", params);
};

export const getStaffList = params => {
  return http.get("/api/v1/front/dis/staffList", params);
};

export const getNewStaffList = params => {
  return http.get("/api/v1/front/dis/newStaffList", params);
};

export const login = params => {
  return http.get("/api/v1/front/dis/disLogin", params);
};
//获取个人信息
export const getUserInfo = params => {
  return http.get("/api/v1/front/cu/findCUInfo", params);
};

export const getOrderTypeList = params => {
  return http.get(`/api/v1/front/fawOrder/dzOrders`, params);
};

export const getOrderList = (params, userType) => {
  let url = "processedOrder";
  if (userType === "DZ") {
    url = "dzTypeOrders";
  }
  return http.get(`/api/v1/front/fawOrder/${url}`, params);
};

export const getOrder = params => {
  return http.get(`/api/v1/front/fawOrder/detailById`, params);
};
export const logout = params => {
  return http.get("/api/v1/front/dis/logout", params);
};
export const register = params => {
  return http.get("/api/v1/front/dis/register", params);
};

export const updateGender = params => {
  return http.get("/api/v1/front/cu/genderUp", params);
};

export const updateAvatar = params => {
  return http.get("/api/v1/base/upload", params);
};

export const updateBirthday = params => {
  return http.get("/api/v1/front/cu/birthdayUp", params);
};
//birthdayUp

export const updateName = params => {
  return http.get("/api/v1/front/cu/realNameUp", params);
};

export const updatePhone = params => {
  return http.get("/api/v1/front/cu/phoneUp", params);
};
export const updateWorkStart = params => {
  return http.get("/api/v1/front/dis/addWorkStart", params);
};

// 评价详情查询
export const getOrderEvaluationInfos = params => {
  return http.get("/api/v1/front/fawOrderEvaluation/alreadyEvaluation", params);
};

// 成交率
export const dealStatisticsReport = params => {
  return http.get(
    "/api/v1/front/fawOrderStatistics/dealStatisticsReport",
    params
  );
};

// 错误率
export const timeoutDayStatisticsReport = params => {
  return http.get(
    "/api/v1/front/fawOrderStatistics/timeoutDayStatisticsReport",
    params
  );
};

// 成交趋势
export const getStatisticsReport = (params, dateType) => {
  const urlMap = {
    days: "statisticsReportFor7Day",
    weeks: "statisticsReportFor6Week",
    months: "statisticsReportFor6Month"
  };
  return http.get(
    `/api/v1/front/fawOrderStatistics/${urlMap[dateType]}`,
    params
  );
};
// 失败趋势
export const getTimeoutStatisticsReport = (params, dateType) => {
  const urlMap = {
    days: "timeoutStatisticsReportFor7Day",
    weeks: "timeoutStatisticsReportFor6Week",
    months: "timeoutStatisticsReportFor6Month"
  };
  return http.get(
    `/api/v1/front/fawOrderStatistics/${urlMap[dateType]}`,
    params
  );
};
export const getAdvisoryReportYesterday = params => {
  return http.get(
    "/api/v1/front/advisoryReport/getAdvisoryReportYesterday",
    params
  );
};
export const getAdvisoryReportLast7Days = (params, dateType) => {
  const urlMap = {
    days: "getAdvisoryReportLast7Days",
    weeks: "getAdvisoryReportLast6Weeks",
    months: "getAdvisoryReportLast6Months"
  };
  return http.get(`/api/v1/front/advisoryReport/${urlMap[dateType]}`, params);
};
//排行榜二手车列表
export const getescstatistics = params => {
  return http.get("/api/v1/front/reportEsc/escStatistics", params);
};
//排行榜二手车趋势列表
export const getesTopTotal = params => {
  return http.get("/api/v1/front/reportEsc/escTopTotal", params);
};
//排行榜销售排行
export const getxsTopTotal = params => {
  return http.get("/api/v1/front/reportXS/xsTopTotal", params);
};
//排行榜销趋势售排行
export const getxsTrend = params => {
  return http.get("/api/v1/front/reportXS/xsTrend", params);
};
//排行榜服务顾问趋势排行
export const getsaStatistics = params => {
  return http.get("/api/v1/front/reportSa/saStatistics", params);
};
//排行榜服务顾问排行
export const getsaTopTotal = params => {
  return http.get("/api/v1/front/reportSa/saTopTotal", params);
};
//查询积分规则详情
export const getActivityList = params => {
  return http.get("/api/v1/bg/activityPlan/getActivityPlanListPage", params);
};
//查询问题类型
export const getMessageTypeList = params => {
  return http.get("/api/v1/front/fawMessageBoard/findParam", params);
};
//提交问题
export const putMessageBoard = params => {
  return http.post("/api/v1/front/fawMessageBoard/add", params);
};
//查询问题
export const getMessageBoardList = params => {
  return http.get("/api/v1/front/fawMessageBoard/list", params);
};
// /api/v1/bg/iocr/getVinCodeByImg
// /行驶证VIN码识别
export const getVinCodeByImg = params => {
  return http.post("/api/v1/bg/iocr/getVinCodeByImg", params);
};

export const addGiftOrder = params => {
  return http.post("/api/v1/front/fawCommodityOrder/add", params);
};

export const getGiftOrder = params => {
  return http.get("/api/v1/front/fawCommodityOrder/detail", params);
};

export const getGiftOrderList = params => {
  return http.get("/api/v1/front/fawCommodityOrder/list", params);
};

export const getGiftList = params => {
  return http.get("/api/v1/front/fawCommodity/list", params);
};
export const getScore = params => {
  return http.get("/api/v1/front/fawCommodityOrder/myScore", params);
};

export const getCreditStatus = params => {
  return http.post("/api/v1/front/fawCommodity/creditStatus", params);
};

// api/v1/front/fawCommodityOrder/myScore
// /api/v1/front/fawCommodity/list
