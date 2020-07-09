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
