# WebDataProvider
WebDataProvider 是 Ledap 的一个基类，是 DataProvider 的子类，用于解决列表的分页问题，和 DataProvider 不同的是，WebDataProvider 的数据来源是网络请求，因此封装了对网络请求的常见方法。

## 获取实例
```javascript
import * as Ledap from 'ledap';
const webDp = new Ledap.WebDataProvider(option);
```
#### option
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|httpRequest|Function|Ledap.App.httpRequest|是|获取列表发送 http 请求方法|
|httpOptions|Object|-|是|获取列表请求的参数|
|primaryKey|String|'id'|否|列表去重依据的属性，详见[primaryKey](/api/DataProvider/#dp-load-data-append-primarykey)|
|configName|String|'withConfig'|否|是否需要后端发送[有配置的字段](/api/model/#有配置的-value)|
|callback|Function|null|否|列表请求完成后执行的回调|
|timeWait|Number|600|否|发送请求前的延迟时间，例如用户快速点击下一页翻页时，不会多次发出请求|
**在实例化的时候，会读取 [WebDataProvider 的全局配置](/api/App/#app-config-option)**

## 实例属性
### webDp.isLoading
- 类型：boolean
- 详细：是否正在发送请求，注意当点击翻页的时候，webDp.timeWait 之后，此值才会变成 true

### webDp.configName
- 类型：String
- 详细：是否需要后端发送[有配置的字段](/api/model/#有配置的-value)

### webDp.httpRequest
- 类型：Function
- 详细：发送列表请求的方法

### webDp.httpOptions
- 类型：Object
- 详细：发送列表请求的参数

### webDp.primaryKey
- 类型：String
- 详细：列表去重依据的属性，详见[primaryKey](/api/DataProvider/#dp-load-data-append-primarykey)

### webDp.callback
- 类型：Function
- 详细：列表请求完成后执行的回调

### webDp.timeWait
- 类型：Number
- 详细：发送请求前的延迟时间

## 实例方法
### webDp.refresh([type])
- 参数：
  - {String} type 默认值 'refresh'
- 详细：刷新方法，实现了普通刷新、上拉刷新、下拉刷新功能。
#### type 的有效值
|type|说明|
|:-:|:-:|
|refresh|普通刷新，刷新当面页面|
|header|上拉刷新，会重新加载第 1 页|
|footer|下拉刷新，会加载下一页，下一页会以 append 的方式追加在列表中|

### webDp.changePage(page[, reload])
- 参数：
  - {Number} page
  - {boolean} reload 默认为true
- 详细：加载指定页数，如果 reload 为 false，则只修改了 webDp.pager.currentPage，未发出请求。

### webDp.nextPage([reload])
- 参数：
  - {boolean} reload 默认为true
- 详细：加载下一页，如果 reload 为 false，则只修改了 webDp.pager.currentPage，未发出请求。

### webDp.prePage([reload])
- 参数：
  - {boolean} reload 默认为true
- 详细：加载下一页，如果 reload 为 false，则只修改了 webDp.pager.currentPage，未发出请求。

### webDp.loadData()
- 详细：发送列表请求。在 changePage 等方法的 reload 为 false 的时候，可以手动调用 loadData 方法加载列表。

### webDp.setParams(params[, reload, toFirstPage])
- 参数：
  - {Object} params
  - {boolean} reload 默认为 true，是否发出请求
  - {boolean} toFirstPage 默认为 true，是否回到第 1 页
- 详细：修改 [webDp.searchModel](/api/DataProvider/#dp-searchmodel) 的值，然后重新加载列表。

### webDp.setSort(sort[, reload, toFirstPage])
- 参数：
  - {String} sort
  - {boolean} reload 默认为 true，是否发出请求
  - {boolean} toFirstPage 默认为 false，是否回到第 1 页
- 详细：修改 [webDp.sort](/api/DataProvider/#dp-sort) 的值，然后重新加载列表。


## 静态属性
### WebDataProvider.EVENT_BEFOREGETDATA
- 详细：获取 data 前的事件名称

### WebDataProvider.EVENT_AFTERGETDATA
- 详细：获取 data 后的事件名称

## 其他
需要注意的是，WebDataProvider 是 [DataProvider](/api/DataProvider/) 的子类，会拥有其父类的所有方法和属性。
