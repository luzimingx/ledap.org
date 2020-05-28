# list
list 代表表格组件。

## Attributes
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|tag|String|'a'|否|组件最外层标签|
|dataKey|String \| Number|-|是|表示组件的 key|
|canClose|boolean|false|否|是否可以切换选中、未选中状态|
|disabled|boolean|false|否|是否禁用|


## Slot
#### default
- 说明：默认插槽，tab 的文字描述。

## 示例
```vue
<template lang="html">
<div>
    <form-item class="form-group" :model="model" attr="city">
        <template v-slot="p">
            <!-- groupinput内部默认是tab组件 -->
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
                            "order": ["北京", "上海", "杭州", "成都", "武汉", "南京", "厦门", "其他"],
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
