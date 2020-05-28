# App
App 是 Ledap 的一个基类，是 BaseObject 的子类，在这里可以进行一些全局配置，如 WebDataProvider ，同时也将一些常用功能进行了封装，如 Model、WebDataProvider 的实例化，组件注册等。
## 获取类
```javascript
import * as Ledap from 'ledap';
const App = Ledap.App;

App.config(option);
```

## 静态属性
### App.request
- 类型：Function
- 详细：常规的 http 请求方法，由用户指定，若用户未指定，则有一个默认的调用 axios 的 http 请求。

### App.webDpConfig
- 类型：Object
- 详细：WebDataProvider 的全局配置，其中 webDpConfig.httpRequest 默认指向 App.request。

### App.themeConfig
- 类型：Object
- 详细：全局主题配置

### App.validators
- 类型：Function
- 详细：全局的 validators


## 静态方法
### App.config(option)
- 参数：
  - {Object} option
- 详细：进行全局配置
#### option
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|request|Function||否|常规的 http 请求方法|
|webDpConfig|Object|{}|否|WebDataProvider 的全局配置|
|themeConfig|Object|{}|否|全局主题配置|
|validators|Object|{}|否|全局的 validators|

### App.getModel([data, modelClass])
- 参数：
  - {Object} data 详见 [model.load](/api/model/#model-load-data)
  - {Model} modelClass
- 详细：初始化 Model 实例，并加载数据，允许指定自定义的 Model 类。

### App.getWebDp(option)
- 参数：详见 [WebDataProvider 获取实例](/api/WebDataProvider/#获取实例)
- 详细：获取 WebDataProvider 实例

### App.getTheme()
- 返回值：{Theme}
- 详细：获取全局主题实例，详见 [theme 实例](/component/Theme/#实例属性)

### App.setTheme(theme)
- 参数：
  - {Theme} theme
- 详细：重新设置全局主题

### App.register(name, Vue)
- 参数：
  - {String | Array} name
  - {Vue} Vue
- 详细：注册指定的 Vue 组件
- 示例：
```javascript
import Vue from 'vue';
App.register('form-item', Vue);  // 注册单个组件
App.register(Object.keys(App.getTheme().components), Vue); // 注册全部组件
```
