import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton, AtList, AtListItem } from "../../npm/taro-ui/dist";
import "./index.scss";

import defaultAvatarUrl from "../../assets/images/default-avatar.png";

import { getStaff, examine } from "../../servers/apis";
import { getOptionLabel } from "../../utils/options";

class Index extends Component {
  config = {
    navigationBarTitleText: "员工详情"
  };

  state = {
    data: null
  };

  componentDidShow() {
    this.loadData();
  }

  handleSubmit = status => {
    const { id } = this.$router.params;
    examine({
      id: id,
      status
    }).then(res => {
      Taro.navigateBack({
        delta: 1
      });
    });
  };

  loadData = () => {
    const { id } = this.$router.params;
    getStaff({ id: id }).then(res => {
      this.setState({
        data: {
          ...res.data,
          avatarUrl: res.data.avatarUrl || defaultAvatarUrl
        }
      });
    });
  };

  openAvater = url => {
    Taro.previewImage({
      current: url,
      urls: [url]
    });
  };

  render() {
    const { isNew } = this.$router.params;
    const { data } = this.state;

    if (!data) {
      return null;
    }

    return (
      <View className='page bg-gray'>
        <View className='owner-details__body'>
          <View className='owner-details__heading'>
            <Image
              className='img'
              src={data.avatarUrl}
              mode='aspectFill'
              style='width:120px;height:120px'
              onClick={this.openAvater.bind(this, data.avatarUrl)}
            />
          </View>
          <AtList>
            <AtListItem title='姓名' extraText={data.realName} />
            <AtListItem
              title='性别'
              extraText={getOptionLabel("genders", data.gender)}
            />
            <AtListItem title='手机号' extraText={data.phone} />
            <AtListItem title='工作开始时间' extraText={data.workStart} />
            <AtListItem title='门店名称' extraText={data.disName} />
            <AtListItem title='所在部门' extraText={data.departName} />
            <AtListItem title='职位' extraText={data.positionName} />
          </AtList>
        </View>

        <View className='submit-button-wrap'>
          {isNew === "1" && (
            <AtButton
              type='primary'
              onClick={this.handleSubmit.bind(this, "1")}
            >
              系统授权通过添加到员工列表
            </AtButton>
          )}
          {isNew === "1" && (
            <AtButton
              className='gap-top'
              type='secondary'
              onClick={this.handleSubmit.bind(this, "2")}
            >
              退回重新填写
            </AtButton>
          )}
        </View>
      </View>
    );
  }
}

export default Index;
