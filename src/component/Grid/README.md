# grid
grid 组件为表格组件，需要传如 dataProvider 和 columns，组件即可工作。

## Attributes
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|dataProvider|[DataProvider](/api/DataProvider/)|-|是|表格的数据|
|columns|Attr\<string \| Object\>|-|是|表格的数据格式|
#### columns 元素为 Object 时
|属性|类型|说明|
|:-:|:-:|:-:|
|attribute|String|该列的属性名|
|label|String \| Function|该列的表头，如果为 Function，函数参数为 model、attribute，注意如果 dataProvider.isWebDp 为 true，则 label 优先取 dataProvider.searchModel 的 对应 attribute 的 label 的值|
|labelFormat|String|该列的表头格式化方式，有效值'text'、'html'|
|labelOptions|Object|增加在 label 最外层标签的属性|
|useSort|boolean|该列是否开启排序功能|
|width|String|该列宽度，如'20%'|
|value|String \| Function|该列的值，如果为 Function，函数参数为 model、attribute、index|
|format|String|该列的值的格式化方式，有效值'text'、'html'|
|contentOptions|Object|增加在 value 最外层标签的属性|
##### labelOptions && contentOptions
|属性|类型|说明|
|:-:|:-:|:-:|
|attr|Object|增加的属性|
|class|String \| Array\<String\>|增加的类名|
|style|String \| Object|增加的 style|


## [示例](https://widget.ethercap.com/ledap/default/grid)
```vue
<template lang="html">
<div>
    <grid class="table table-striped" :data-provider="dp" :columns="columns"></grid>
</div>
</template>

<script>
import * as Ledap from 'ledap';
const DataProvider = Ledap.DataProvider;

export default {
    data() {
        return {
            asc: true,
            dp: ledap.App.getWebDp({
                httpOptions: {
                    url: '/ledap/lesson/search',
                    params: {
                        'per-page': 5
                    }
                }
            }),
            columns: [{
                attribute: 'id',
                labelFormat: 'html',
                "label": function(model, attribute) {
                    // 使用 vm 指向本页面实例
                    return '<div @click="vm.toggle">ID<span>{{vm.asc ? "^" : "v"}}</span></div>';
                },
                labelOptions: {
                    style: { color: 'green' }
                }
            }, {
                attribute: 'text',
                label: '名称'
            }]
        }
    },
    created: function() {
        this.dp.refresh();
    },
    methods: {
        toggle: function() {
            this.asc = !this.asc;
            this.dp.sortModels("id", this.asc);
        },
    }
}
</script>
```
