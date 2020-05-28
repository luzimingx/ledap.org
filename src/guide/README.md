# 介绍
ledap 是一个好用的前后端解耦方案，具有以下特点：
- 引入了 [Model](/api/model/)，将数据的操作与业务逻辑解耦，如表单验证；
- 引入了 [DataProvider](/api/DataProvider/)，解决列表场景下的数据操作；
- 引入了数据适配层的概念，为实现跨平台组件提供了可能，由于时间有限，目前仅支持 [Vue 组件](/component/)；
- 实现了代码自动生成，[yii2-ledap](/guide/Yii2Ledap/)；

![Image from alias](~@/img/introduction.png)

# 安装
```bash
npm install ledap -D
```
安装主题，ledap-vue-bootstrap 是适用于 Vue 生态的 bootstrap 风格主题。
```bash
# 依赖 bootstrap bootstrap-vue
npm install ledap-vue-bootstrap bootstrap bootstrap-vue -D
```

# 使用
首先需要在全局注册组件。
```javascript
import Vue from 'vue';
import * as Ledap from 'ledap';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import ledapVueBootstrap from 'ledap-vue-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// 配置主题 更多配置，见 App.config
Ledap.App.config({
    themeConfig: ledapVueBootstrap
});
// 全局注册组件
Ledap.App.register(Object.keys(Ledap.App.getTheme().components), Vue);
```
在页面中使用组件，model 的使用详见 [Model](/api/model)。
```vue
<template lang="html">
<div>
    <form-item :model="model" attr="name"></form-item>
    <form-item :model="model" attr="email"></form-item>
    <button @click="submit"></button>
</div>
<template>
<script>
export default {
    data() {
        return {
            model: Ledap.App.getModel({
                // 对象的属性省略了，详见 model 的使用
            })
        }
    },
    methods: {
        submit() {
            // 使用 model 对数据进行验证
            this.model.validate();
            if (this.model.hasError()) return;
            // 进行提交动作将 model 提交
        }
    }
}
</script>
```

需要注意的是，Ledap 的组件使用到了模板字符串，因此需要编译器，在 Webpack 配置中增加以下配置：
```javascript
module.exports = {
    runtimeCompiler: true
};
```
