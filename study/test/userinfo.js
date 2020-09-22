
// import { decode } from 'js-base64';
// import constant from '../../config/constant';

/**
 * loginStatus属性：
 * init：1、静默登陆初始化状态；2、登陆过期
 * loading：1、正在进行静默登陆
 * success：1、有token，token未过期
 * error：1、无token，获取token出错了（a.微信错误拿不到code；b.后端登陆接口4xx5xx）
 * fail：1、登陆失败（a.新用户；b.解绑用户）
 */

/**
 * expTimestamp
 * 再次进行静默登陆时间的时间戳（比过期时间提前一些）
 */
class UserInfo {
  constructor() {
    this.userInfo = null;
    this.account_id = null;
    this.loginStatus = null; // 登陆状态
    this.instance = null; // 单例
    this.ADVANCELOGINTIME = 3 * 60 * 1000; // 距离过期时间戳advanceLoginTime毫秒 /////////////////////////////记得改回5分钟
  }

  /**
   * 获取用户信息
   */
  getUserInfo() {
    console.log(this.userInfo);
    if (this.userInfo == null) {
      const userInfoStore = localStorage.getItem('key');
      // 如果是有效用户登陆信息增赋值并返回
      if (userInfoStore && userInfoStore.accessToken) {
        this.userInfo = userInfoStore;
      }
    }
    return this.userInfo;
  }

  /**
   * 保存用户信息
   */
  setUserInfo(data) {
    this.userInfo = data;
    // wx.setStorage({
    //   key: constant.KEY_USER,
    //   data,
    // });
    localStorage.setItem('key', data);
    // if (wx.globalData.userSimpleInfo) {
    //   wx.globalData.userSimpleInfo.phone = data ? data.phone : '';
    // }
  }

  /**
   * 清除user信息
   */
  clearUserInfo() {
    this.userInfo = null;
    this.setUserInfo(null);
  }

  /**
   * 初始化用户信息
   */
  formatUserInfo(data) {
    const userInfo = Object.create(null);
    userInfo.phone = data.phone;
    userInfo.userId = data.user_id;
    userInfo.accessToken = data.access_token;
    userInfo.expTimestamp = this.getExpTimestamp(data.access_token);

    return userInfo;
  }

  /**
   * 获取再次进行静默登陆的时间
   */
  getExpTimestamp(token) {
    const tokenArray = token.split('.');
    const tokenJSON = decode(tokenArray[1]);
    const tokenObj = JSON.parse(tokenJSON);
    const expTimestamp = tokenObj.exp * 1000 - this.ADVANCELOGINTIME;
    return expTimestamp;
  }

  /**
   * 保存信息部的 account_id
   *
   * @params {string} id 要保存的ID
   * @return undefined
   *
   * @author minghua
   * @date 2019-09-04
   */
  setAccountId(id) {
    this.account_id = id;
    wx.setStorage({
      key: constant.KEY_ACCOUNT_ID,
      data: id,
    });
  }

  /**
   * 获取信息部的 account_id
   *
   * @return {string} account_id
   *
   * @author minghua
   * @date   2019-09-04
   */
  getAccountId() {
    if (!this.account_id) {
      this.account_id = wx.getStorageSync(constant.KEY_ACCOUNT_ID);
    }
    return this.account_id;
  }

  /**
   * 返回loginStatus
   */
  getLoginStatus() {
    // 已有loginStatus返回loginStatus
    if (this.loginStatus) {
      return this.loginStatus;
    }
    // 没有loginStatus(初始进入小程序)
    // 则判断：如果之前有token，并且token未过期则赋值success
    const userInfo = this.getUserInfo();
    if (userInfo && UserInfo.longerThanExpTimestamp(userInfo)) {
      this.loginStatus = 'success';
    } else {
      // 若不是则赋值init（静默登陆初始化）
      this.loginStatus = 'init';
    }
    return this.loginStatus;
  }

  /**
   * 设置loginStatus
   */
  setLoginStatus(status) {
    this.loginStatus = status;
    return this.loginStatus;
  }

  /**
   * 把本地时间需要静默登陆的时间作对比
   */
  static longerThanExpTimestamp(userInfo) {
    let flag = false;
    const time = (new Date()).getTime();
    if (userInfo.expTimestamp && (time < userInfo.expTimestamp)) {
      flag = true;
    }
    return flag;
  }

  /**
   * 根据传入的时间戳判断是否要更改登陆状态
   */
  adjustLoginStatus(headerTime) {
    if (this.loginStatus === 'success') {
      const headerTimeObj = new Date(headerTime);
      const headerTimestamp = headerTimeObj.getTime();
      if (headerTimestamp - this.userInfo.expTimestamp > 0) {
        this.loginStatus = 'init';
      }
    }
    return this.loginStatus;
  }

  /**
   * 获取UserInfo唯一实例
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new UserInfo();
    }
    return this.instance;
  }
}


// export default UserInfo.getInstance();

const userInfo = UserInfo.getInstance();
const userInfo2 = UserInfo.getInstance();

userInfo.setUserInfo({
  a: 111111,
  b: 22222,
});

userInfo.getUserInfo();
userInfo2.getUserInfo();

