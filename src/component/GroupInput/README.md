# groupinput
groupinput 代表组件组，内部管理多个组件，如 tab、radio、checkbox，默认为 tab 组件，可以通过 slot 修改。

## Attributes
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|model|[Model](/api/model/#获取实例)|-|是|核心属性，承载了各个字段的 value、validate 等功能，详见[有配置的 model](/api/model/#有配置的-value)|
|attr|String|-|是|表征 model 中某个属性，如 'email'|
|option|Object|-|否|[dict 类型的 validator](/api/Validator/#dict-array)|


## Slot
#### default
- 说明：默认插槽，内部管理的组件，默认是 tab，可以替换为 radio、checkbox 等。
- slotProps

|属性|类型|说明|
|:-:|:-:|:-:|
|data-key|Model|管理的单个组件的 key|
|value|String|管理的单个组件的 value|
|disabled|boolean|是否禁用|


## 示例
```vue
<template lang="html">
<div>
    <form-item class="form-group" :model="model" attr="city">
        <template v-slot="p">
            <groupinput v-bind="p"></groupinput>
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
                    "label": "常驻城市",
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
                            "order": ["北京", "a", "上海", "3", "杭州", "成都", -1, "武汉", "南京", "厦门", 4, "其他"],
                            "multiple": true,
                            "excludes" : ["武汉"],
                            "max" : 3,
                            "message": "常驻城市的值不正确",
                            "skipOnEmpty": 1
                        }
                    }],
                    "value": ["成都", "杭州"]
                },
            } */
            this.model.load(data);
        });
    }
}
</script>
```
