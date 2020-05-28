# radio
radio 代表选项卡组件，一般需要被 [groupinput](/component/GroupInput/) 管理。

## Attributes
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|tag|String|'div'|否|组件最外层标签|
|dataKey|String \| Number|-|是|表示组件的 key|
|canClose|boolean|false|否|是否可以切换选中、未选中状态|
|disabled|boolean|false|否|是否禁用|


## Slot
#### default
- 说明：默认插槽，radio 的文字描述。

#### input
- radio 的实体，默认是原生的 \<input type="radio"\>。
- slotProps

|属性|类型|说明|
|:-:|:-:|:-:|
|isOpen|boolean|是否被选中|
|disabled|boolean|是否禁用|

## 示例
```vue
<template lang="html">
<div>
    <form-item class="form-group" :model="model" attr="sex">
        <template v-slot="p">
            <groupinput v-bind="p">
                <template v-slot:default="p">
                    <radio v-bind="p" :key="p.dataKey">{{p.value}}</radio>
                </template>
            </groupinput>
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
                "sex": {
                    "label": "性别",
                    "rules": [{
                        "type": "dict",
                        "options": {
                            "list": {
                                "1": "男",
                                "2": "女",
                            },
                            "multiple": false,
                            "excludes" : [],
                            "message": "性别不正确",
                            "skipOnEmpty": 1
                        }
                    }],
                    "value": 1
                },
            } */
            this.model.load(data);
        });
    }
}
</script>
```
