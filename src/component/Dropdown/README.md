# dropdown
dropdown 为下拉选择框组件，支持选项的排序功能。

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


## [示例](https://widget.ethercap.com/ledap/default/dropdown)
```vue
<template lang="html">
<div>
    <form-item :model="model" attr="city">
        <template v-slot="p">
            <dropdown v-bind="p"></dropdown>
        </template>
    </form-item>
    <button @click="submit" class="btn btn-primary">提交</button>
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
    created: function() {
        // data 也可以是后端接口返回
        var data = {
            city: {
                label: '城市',
                rules: [{
                    type: 'dict',
                    options: {
                        list: {
                            '': '',
                            '上海': '上海',
                            '北京': '北京',
                            '杭州': '杭州',
                            '成都': '成都',
                            '武汉': '武汉',
                            '南京': '南京',
                            '厦门': '厦门',
                            '其他': '其他',
                        },
                        order: ['', '北京', '上海', '杭州', '成都', '武汉', '南京', '厦门', '其他'],
                        multiple: false,
                        excludes: [],
                        message: '城市的值不正确',
                        skipOnEmpty: 1
                    }
                }, {
                    type: 'required',
                    options: {
                        message: '请选择城市'
                    }
                }],
                'value': ''
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
