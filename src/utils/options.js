// const roles = [
//   {
//     value: "DZ",
//     label: "店总"
//   },
//   {
//     value: "DZ",
//     label: "店总"
//   },
//   {
//     value: "DZ",
//     label: "店总"
//   },
//   {
//     value: "DZ",
//     label: "店总"
//   }
// ];

const data = {
  roles: [
    {
      value: "DZ",
      label: "店总"
    },
    {
      value: "ESC",
      label: "二手车顾问"
    },
    {
      value: "XS",
      label: "销售顾问"
    },
    {
      value: "FW",
      label: "服务顾问"
    }
  ],
  genders: [
    {
      value: "1",
      label: "男"
    },
    {
      value: "2",
      label: "女"
    }
  ],
  processStatus: [
    {
      value: "WAIT_ESC",
      label: "待SA受理"
    },
    {
      value: "WAIT_ESC",
      label: "待评估顾问受理"
    },
    {
      value: "WAIT_XS_A_CARD",
      label: "A卡待确认"
    },
    {
      value: "WAIT_XS_C_CARD",
      label: "C卡待确认"
    },
    {
      value: "FINISH",
      label: "完成"
    }
  ]
};

export const getOptions = key => {
  return data[key];
};

export const getOptionLabel = (key, value) => {
  const option = getOptions(key).find(option => option.value === value + "");
  return option ? option.label : "无";
};
