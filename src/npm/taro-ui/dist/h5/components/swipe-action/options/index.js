import Taro from "@tarojs/taro-h5";
import Nerv from "nervjs";
import classNames from 'classnames';
import { View } from '@tarojs/components';
import AtComponent from '../../../common/component';
import { delayQuerySelector } from '../../../common/utils';
export default class AtSwipeActionOptions extends AtComponent {
  trrigerOptionsDomUpadte() {
    delayQuerySelector(this, `#swipeActionOptions-${this.props.componentId}`).then(res => {
      this.props.onQueryedDom(res[0]);
    });
  }
  componentDidMount() {
    this.trrigerOptionsDomUpadte();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.options !== this.props.options) {
      this.trrigerOptionsDomUpadte();
    }
  }
  render() {
    const rootClass = classNames('at-swipe-action__options', this.props.className);
    return <View id={`swipeActionOptions-${this.props.componentId}`} className={rootClass}>
        {this.props.children}
      </View>;
  }
}