import Taro from "@tarojs/taro";
import { AtTabBar } from "taro-ui";
import "./index.scss";

import userUrl from "../../assets/images/user2x.png";
import userActiveUrl from "../../assets/images/user_active2x.png";
import noteUrl from "../../assets/images/note2x.png";
import noteActiveUrl from "../../assets/images/note_active2x.png";
import ownerUrl from "../../assets/images/owner2x.png";
import ownerActiveUrl from "../../assets/images/owner_active2x.png";
import dataUrl from "../../assets/images/data2x.png";
import dataActiveUrl from "../../assets/images/data_active2x.png";

const allTabList = [
  {
    key: "my-owner",
    title: "客户列表",
    image: ownerUrl,
    selectedImage: ownerActiveUrl
  },
  {
    key: "my-order",
    title: "我的业绩",
    image: noteUrl,
    selectedImage: noteActiveUrl
  },
  {
    key: "my-profile",
    title: "信息展示墙",
    image: userUrl,
    selectedImage: userActiveUrl
  },
  {
    key: "my-employees",
    title: "员工列表",
    image: ownerUrl,
    selectedImage: ownerActiveUrl
  },
  {
    key: "report",
    title: "报表",
    image: dataUrl,
    selectedImage: dataActiveUrl
  },
  {
    key: "all-order",
    title: "订单",
    image: noteUrl,
    selectedImage: noteActiveUrl
  },
  {
    key: "admin-profile",
    title: "我的",
    image: userUrl,
    selectedImage: userActiveUrl
  }
];

function Index({ activeKey, tabKeys, onClick }) {
  if (!tabKeys) {
    return;
  }
  const tabList = allTabList.filter(tab => tabKeys.includes(tab.key));

  const goTo = page => {
    Taro.redirectTo({
      url: `/pages/${page}/index`
    });
  };

  const handleClick = index => {
    goTo(tabList[index].key);
  };

  return (
    <AtTabBar
      fixed
      tabList={tabList}
      onClick={onClick || handleClick}
      current={activeKey}
    />
  );
}

export default Index;
