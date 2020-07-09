# groupinput
groupinput 代表组件组，内部管理多个子组件，如 tab、radio、checkbox，默认子组件为 tab 组件，可以通过 slot 修改为其他组件；支持子组件的排序、单选、多选、指定最大选项数量、指定禁用选项等功能。

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


## [示例](https://widget.ethercap.com/ledap/default/groupinput)
```vue
<template lang="html">
<div>
    <form-item class="form-group" :model="model" attr="city">
        <template v-slot="p">
            <groupinput v-bind="p"></groupinput>
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
                city: ''
            })
        }
    },
    created: function() {
        // data 也可以是后端接口返回
        var data = {
            city: {
                label: '常驻城市',
                rules: [{
                    type: 'dict',
                    options: {
                        list: {
                            '上海': '上海',
                            '北京': '北京',
                            '杭州': '杭州',
                            '成都': '成都',
                            '武汉': '武汉',
                            '南京': '南京',
                            '厦门': '厦门',
                            '其他': '其他',
                        },
                        order: ['北京', '上海', '杭州', '成都', '武汉', '南京', '厦门', '其他'],
                        multiple: true,
                        excludes: ['其他'],
                        max: 3,
                        message: '常驻城市的值不正确',
                        skipOnEmpty: 1
                    }
                }, {
                    type: 'required',
                    options: {
                        message: '请填写常驻城市'
                    }
                }],
                'value': ['成都', '杭州']
            }
        };
        this.model.load(data);
    },
    methods: {
        submit: function() {
            this.model.validate();
            if (this.model.hasErrors()) return;
            alert('提交的数据是：' + JSON.stringify(this.model));
        }
    }
}
</script>
```
