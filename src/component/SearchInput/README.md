# searchinput
searchinput 组件代表搜索输入框组件，输入文字，出现下拉推荐列表。

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


## 示例
```vue
<template lang="html">
<div>
    <form-item :model="model" attr="abstract">
        <template v-slot="p">
            <searchinput v-bind="p" :data-provider="dp" @choose="choose">
            </searchinput>
        </template>
    </form-item>
</div>
</template>

<script>
import * as Ledap from 'ledap';
const App = Ledap.App;

export default {
    data() {
        return {
            dp: App.getWebDp({
                httpOptions: { url: 'xxx' },
            }),
            /* 返回的数据格式如下： */
            /* {
                "items" : [{
                    "id" : 1,
                    "text" : "Li Lei"    // 作为选中展示信息
                }, {
                    "id" : 2,
                    "text" : "Hanmeimei"
                }, {
                    "id" : 3,
                    "text" : "Lily"
                }, {
                    "id" : 4,
                    "text" : "Lucy"
                }],
                "meta":{
                    "currentPage":1,
                    "pageCount":3,
                    "perPage":4,
                    "totalCount":20
                },
                "sort":[]
            } */
        }
    },
    methods: {
        choose(model, index, event) {
            // do something here
        }
    }
}
</script>
```
