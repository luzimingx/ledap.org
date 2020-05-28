# form-item
form-item 组件代表单个表单元素，主体部分默认为 input，可以通过 slot 替换为 textarea、radio、checkbox 等。它创造性的将 label、表单、error 结合在一起，你需要做的仅仅是将一个 [Model](/api/model/#获取实例) 实例和某个属性值传入该组件，双绑、validate 都会自动工作。


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


## 示例
```vue
<template lang="html">
<div>
    <form-item :model="model" attr="phone"></form-item>
    <form-item :model="model" attr="name" maxlength="10">
        <template v-slot="slotProps">
            <baseinput v-bind="slotProps" tag="textarea" rows="8"></baseinput>
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
            model: App.getModel()
        }
    },
    created() {
        App.request({
            // 这里是一些请求参数
        }, data => {
            // data格式如下
            /* {
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
                    }]
                },
                phone: {
                    label: '手机号',
                    hint: '请输入手机号',
                    value: '',
                    rules: [{
                        type: 'string',
                        options: {
                            message: '姓名必须是一条字符串。',
                            skipOnEmpty: 1,
                        }
                    }, {
                        type: 'match',
                        options: {
                            message: "请输入正确的手机号码",
                            not: false,
                            pattern: "/^1[3-9]{1}\d{9}$/",
                            skipOnEmpty: 1
                        }
                    }]
                }
            } */
            this.model.load(data);
        });
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
