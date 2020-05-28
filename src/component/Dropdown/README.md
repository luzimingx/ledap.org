# dropdown
dropdown 为下拉选择框组件。

## Attributes
你可以向其传入所有 select 的合法属性。
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|model|[Model](/api/model/#获取实例)|-|是|核心属性，承载了各个字段的 value、validate 等功能，详见[有配置的 model](/api/model/#有配置的-value)|
|attr|String|-|是|表征 model 中某个属性，如 'email'|
|options|Object|-|否|[dict 类型的 validator](/api/Validator/#dict-array)|


## Event
|name|说明|返回参数|
|:-:|:-:|:-:|
|input|选择选项|\(value: String \| Number\),\(event: Event\)|
|blur|失去焦点|(event: Event)|
|focus|获得焦点|\(event: Event\)|


## 示例
```vue
<template lang="html">
<div>
    <form-item :model="model" attr="city">
        <template v-slot="p">
            <dropdown v-bind="p"></dropdown>
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
            model: App.getModel()
        }
    },
    created() {
        App.request({
            // 这里是一些请求参数
        }, data => {
            // data格式如下
            /* {
                "city": {
                    "label": "城市",
                    "rules": [{
                        "type": "dict",
                        "options": {
                            "list": {
                                "北京": "北京",
                                "上海": "上海",
                                "杭州": "杭州",
                                "成都": "成都",
                                "武汉": "武汉",
                                "南京": "南京",
                                "厦门": "厦门",
                                "其他": "其他",
                                },
                            "order": ["北京", "上海","杭州","成都","武汉","南京","厦门","其他"],
                            "multiple": false,
                            "excludes" : [],
                            "message": "城市的值不正确",
                            "skipOnEmpty": 1
                        }
                    }],
                    "value": "上海"
                },
            } */
            this.model.load(data);
        });
    }
}
</script>
```
