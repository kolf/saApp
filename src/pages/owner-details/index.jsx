import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton, AtList, AtListItem } from "../../npm/taro-ui/dist";
import "./index.scss";
import UserPanelAvatar from "../../components/user-panel-avatar";
import { getStaff, examine } from "../../servers/apis";
import { getOptionLabel } from "../../utils/options";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "员工详情"
  };

  state = {
    isFetching: true,
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
    this.setState({ isFetching: true });
    getStaff({ id: id }).then(res => {
      this.setState({
        data: res.data,
        isFetching: false
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
      <View className="page bg-gray">
        <View className="owner-details__content">
          <View className="card card__has-avatar">
            <UserPanelAvatar
              imageUrl={data.avatarUrl}
              onClick={this.openAvater.bind(this, data.avatarUrl)}
            />
            <AtList className="no-border">
              <AtListItem title="姓名" extraText={data.realName} />
              <AtListItem
                title="性别"
                extraText={getOptionLabel("genders", data.gender)}
              />
              <AtListItem title="手机号" extraText={data.phone} />
              <AtListItem title="工作开始时间" extraText={data.workStart} />
              <AtListItem title="经销店名称" extraText={data.disName} />
              <AtListItem title="所在部门" extraText={data.departName} />
              <AtListItem
                title="职位"
                extraText={data.positionName}
                className="no-border"
              />
            </AtList>
          </View>
        </View>

        {isNew === "1" && (
          <View className="next-button-wrap">
            <AtButton
              type="primary"
              className="btn-lg btn-primary"
              onClick={this.handleSubmit.bind(this, "1")}
            >
              系统授权通过添加到员工列表
            </AtButton>
            <AtButton
              className="gap-top btn-lg"
              type="secondary"
              onClick={this.handleSubmit.bind(this, "2")}
            >
              退回重新填写
            </AtButton>
          </View>
        )}
      </View>
    );
  }
}
