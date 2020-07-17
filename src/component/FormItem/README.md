# form-item
form-item 组件代表单个表单元素，主体部分默认为 input，可以通过 slot 替换为 radio、checkbox、searchinput 等。它将 label、validate、error 等工作流结合在一起，你需要做的仅仅是将一个 [model](/api/Model/#获取实例) 和 attr 传入该组件，一切都会自动工作。


## Attributes
form-item 的默认表单元素是 input，因此你可以向其传入所有 input 的合法属性。
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|model|[Model](/api/model/#获取实例)|-|是|核心属性，承载了各个字段的 value、validate 等功能，详见[有配置的 model](/api/model/#有配置的-value)|
|attr|String|-|是|表征 model 中某个属性，如 'email'|
|label|String|[model.getAttributeLabel](/api/model/#model-getattributelabel-key)|否|表单元素的 label|
|tag|String|'div'|否|表单元素最外层的标签|
|validate|Array\<String\>|['blur']|否|表单自动执行 model.validate() 方法的时机|

## Slot
#### default
- 说明：默认插槽，表单主体，默认是 input，可以替换为 radio 等。
- slotProps

|属性|类型|说明|
|:-:|:-:|:-:|
|model|Model|表单元素的 model|
|attr|String|表单元素的 attr|
|validate|Array\<String\>|表单元素的 validate|
|inputListeners|Object|表单元素主体的事件|

#### label
- 说明：表单元素的 label 部分，也可以通过 [label](/component/FormItem/#attributes) 来修改。
- slotProps

|属性|类型|说明|
|:-:|:-:|:-:|
|model|Model|表单元素的 model|
|attr|String|表单元素的 attr|

#### error
- 说明：表单元素的 error 部分，当执行 model.validate() 方法后，产生的错误信息。
- slotProps

|属性|类型|说明|
|:-:|:-:|:-:|
|model|Model|表单元素的 model|
|attr|String|表单元素的 attr|
|showError|String|表单元素的错误信息|

## Event
|name|说明|返回参数|
|:-:|:-:|:-:|
|input|输入值|\(value: String \| Number\),\(event: Event\)|
|blur|失去焦点|(event: Event)|
|focus|获得焦点|\(event: Event\)|


## [示例](https://widget.ethercap.com/ledap/default/formitem)
```vue
<template lang="html">
<div>
    <form-item :model="model" attr="name"></form-item>
    <form-item :model="model" attr="introduce" maxlength="100">
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
                        max: 5,
                        message: '姓名必须是一条字符串。',
                        skipOnEmpty: 1,
                        tooLong: '姓名只能包含至多5个字符。'
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
