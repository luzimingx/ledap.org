# pager
pager 组件为翻页器组件，一般配合列表使用。

## Attributes
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|dataProvider|[DataProvider](/api/DataProvider/)|-|是|翻页器组件数据|


## Slot
#### total
- 说明：描述总页数的部分

#### default
- 说明：上一页、下一页按钮和当前页面展示部分
- slotProps

|属性|类型|说明|
|:-:|:-:|:-:|
|changePage|Function|切换页码的方法，如changePage(10)|

#### form
- 说明：直接跳转页面部分
- slotProps

|属性|类型|说明|
|:-:|:-:|:-:|
|changePage|Function|切换页码的方法，如changePage(10)|


## 示例
```vue
<template lang="html">
<div>
    <!-->这里是列表<-->
    <pager data-provider="dp"></pager>
</div>
</template>
```
