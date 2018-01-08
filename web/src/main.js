// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//Vue.use(ElementUI)

import { Button,ButtonGroup, Select,Dialog,Menu,  Submenu,  MenuItem,  MenuItemGroup,Input,  InputNumber,Table,
  TableColumn,  Form,  FormItem, Alert, Icon,  Row,  Col,  Upload,  Progress,Container,  Header,  Aside,  Main,  Footer,
  Loading,  MessageBox,  Message,  Notification} from 'element-ui' 
  
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Select)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Alert)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Loading.directive)

//element ui
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.prototype.$user = {
  isLogin: function () {
    //1 for true, 0 false
    var v = localStorage.getItem("isLogin");
    return v === "true" ? true : false;
  },
  userId: function () {
    return localStorage.getItem("userId");
  },
  account: function () {
    return localStorage.getItem("account");
  },
  token: function () {
    return localStorage.getItem("token");
  },
  createTime: function () {
    return localStorage.getItem("createTime");
  },
  lastTime: function () {
    return localStorage.getItem("lastTime");
  }
}

Vue.prototype.showErrorMsg = function (msg) {
  Vue.prototype.$message({
    showClose: true,
    message: msg,
    type: 'error',
    duration: 3000
  });
}

Vue.prototype.showSuccessMsg = function (msg) {
  Vue.prototype.$message({
    showClose: true,
    duration: 3000,
    message: msg,
    type: 'success'
  });
}

Vue.prototype.showInfoMsg = function (msg) {
  Vue.prototype.$message({
    showClose: true,
    duration: 3000,
    message: msg,
    type: 'info'
  });
}

function arraybuffer2str(buf) {
  var enc = new TextDecoder();
  return enc.decode(buf);
}


axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  //统一处理token无效
  if (error.response.status === 401) {
    window.localStorage["isLogin"] = false;
    Vue.prototype.showErrorMsg('请重新登录');
    router.push({
      name: 'route-login'
    });
  } else {
    
    if (error.config.responseType === "arraybuffer") {
      //下载文件返回错误
      var str = arraybuffer2str(error.response.data);
      var obj = JSON.parse(str);
      Vue.prototype.showErrorMsg(obj.msg);
      return;
    }

    //存在服务端返回的msg则显示msg
    if (error.response.data.msg) {
      Vue.prototype.showErrorMsg(error.response.data.msg);
    } else {
      //否则展示状态码
      Vue.prototype.showErrorMsg(error.response.status + " " + error.response.statusText)
    }
  }

  //Promise.resolve(error.response)
  return new Promise(() => {});
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
