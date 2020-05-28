# baseinput
baseinput 组件代表输入框，默认为 input，可以通过 tag 属性改为 textarea。

## Attributes
你可以向其传入所有 input、textarea 的合法属性。
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|model|[Model](/api/model/#获取实例)|-|是|核心属性，承载了各个字段的 value、validate 等功能，详见[有配置的 model](/api/model/#有配置的-value)|
|attr|String|-|是|表征 model 中某个属性，如 'email'|
|tag|String|'input'|否|有效值为 'input'、'textarea'|


## Event
|name|说明|返回参数|
|:-:|:-:|:-:|
|input|输入值|\(value: String \| Number\),\(event: Event\)|
|blur|失去焦点|(event: Event)|
|focus|获得焦点|\(event: Event\)|


## 示例
```vue
<template lang="html">
<div>
    <form-item :model="model" attr="abstract" maxlength="100">
        <template v-slot="slotProps">
            <baseinput v-bind="slotProps" tag="textarea" rows="8"></baseinput>
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
                abstract: {
                    label: '简介',
                    hint: '请输入简介',
                    value: '',
                    rules: [{
                        type: 'string',
                        options: {
                            message: '姓名必须是一条字符串。',
                            skipOnEmpty: 1,
                        }
                    }]
                }
            } */
            this.model.load(data);
        });
    }
}
</script>
```
