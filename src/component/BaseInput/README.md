# baseinput
baseinput 组件代表输入框，传入 model 和 attr，就可以具备校验等功能，开发者只需要关注数据层面的 model；该组件有两种形态：input（默认值） 和 textarea，通过 tag 属性来控制。

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


## [示例](https://widget.ethercap.com/ledap/default/baseinput)
```vue
<template lang="html">
<div>
    <form-item :model="model" attr="name">
        <template v-slot="slotProps">
            <baseinput v-bind="slotProps" maxlength="6"></baseinput>
        </template>
    </form-item>
    <form-item :model="model" attr="introduce">
        <template v-slot="slotProps">
            <baseinput v-bind="slotProps" tag="textarea" rows="10"></baseinput>
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
                name: '',
                introduce: ''
            })
        }
    },
    created() {
        // data 也可以是后端接口返回
        const data = {
            name: {
                label: '姓名',
                hint: '请输入姓名',
                value: '',
                rules: [{
                    type: 'string',
                    options: {
                        message: '姓名必须是一条字符串。',
                        skipOnEmpty: 1,
                    }
                }, {
                    type: 'required',
                    options: {
                        message: '请填写姓名'
                    }
                }]
            },
            introduce: {
                label: '简介',
                hint: '请输入简介',
                value: '',
                rules: [{
                    type: 'string',
                    options: {
                        max: 200,
                        message: '姓名必须是一条字符串。',
                        skipOnEmpty: 1,
                        tooLong: '姓名只能包含至多200个字符。'
                    }
                }]
            }
        };
        this.model.load(data);
    },
    methods: {
        submit() {
            this.model.validate();
            if (!this.model.hasError()) {
                // 将 this.model 提交
            }
        }
    }
}
</script>
```
