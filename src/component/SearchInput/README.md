# searchinput
searchinput 组件代表搜索输入框组件，输入文字，出现下拉推荐列表，只需要传入 [model](/api/Model) 和 [webDataProvider](/api/WebDataProvider)，整个组件会自动工作。

## Attributes
你可以向其传入所有 input 的合法属性。
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|model|[Model](/api/model/#获取实例)|-|是|核心属性，承载了各个字段的 value、validate 等功能，详见[有配置的 model](/api/model/#有配置的-value)|
|attr|String|-|是|表征 model 中某个属性，如 'email'|
|dataProvider|[DataProvider](/api/DataProvider/)|-|是|搜索结果列表|
|paramName|String|'keyword'|否|如果 dataProvider 是 [WebDataProvider](/api/WebDataProvider/)，发送请求的参数的 key，如&keyword=xxx|
|delay|Number|300|否|选择提示列表选项后发送请求的延迟时间|
|itemName|String|'text'|否|dataProvider.models 中的每一个 model 中的哪个属性作为展示文案|


## Slot
#### tab
- 说明：默认插槽，推荐列表主体部分。
- slotProps

|属性|类型|说明|
|:-:|:-:|:-:|
|model|Model|推荐列表 dataProvider.models 的单个 model|
|index|Number|model 的 index|


## Event
|name|说明|返回参数|
|:-:|:-:|:-:|
|choose|选择推荐列表|model: Model, index: Number, event: Event|
|input|输入值|value: String \| Number, event: Event|
|blur|失去焦点|event: Event|
|focus|获得焦点|event: Event|


## [示例](https://widget.ethercap.com/ledap/default/searchinput)
```vue
<template lang="html">
<div>
    <form-item class="form-group" :model="model" attr="search">
        <template v-slot="p">
            <searchinput v-bind="p" :data-provider="dp" @choose="choose" item-name="text">
            </searchinput>
        </template>
    </form-item>
    <button @click="submit">提交</button>
</div>
</template>

<script>
import * as Ledap from 'ledap';
const App = Ledap.App;

export default {
    data() {
        return {
            model: App.getModel({
                search: ''
            }),
            dp: App.getWebDp({
                httpOptions: { url: '/ledap/lesson/search' },
            }),
            /* 返回的数据格式如下： */
            /* {
                "items" : [{
                    "id" : 1,
                    "text" : "语文"    // 作为选中展示信息
                }, {
                    "id" : 2,
                    "text" : "数学"
                }, {
                    "id" : 3,
                    "text" : "英语"
                }, {
                    "id" : 4,
                    "text" : "化学"
                }],
                "meta":{
                    "currentPage":1,
                    "pageCount":3,
                    "perPage":4,
                    "totalCount":10
                },
                "sort":[]
            } */
        }
    },
    created: function() {
        // data 也可以是后端接口返回
        var data = {
            search: {
                label: '搜索',
                hint: '请输入关键词',
                value: '',
                rules: [{
                    type: 'required',
                    options: {
                        message: '搜索不能为空'
                    }
                }]
            }
        };
        this.model.load(data);
    },
    methods: {
        choose(model, index, event) {
            // do something here
        },
        submit: function() {
            this.model.validate();
            if (this.model.hasErrors()) return;
            alert('提交的数据是：' + JSON.stringify(this.model));
        }
    }
}
</script>
```
