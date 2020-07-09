# checkbox
checkbox 代表多选组件，一般需要被 [groupinput](/component/GroupInput/) 管理，可设定能否取消选择和是否禁用。

## Attributes
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|tag|String|'div'|否|组件最外层标签|
|dataKey|String \| Number|-|是|表示组件的 key|
|canClose|boolean|true|否|是否可以切换选中、未选中状态|
|disabled|boolean|false|否|是否禁用|


## Slot
#### default
- 说明：默认插槽，checkbox 的文字描述。

#### input
- 说明：checkbox 的实体，默认是原生的 \<input type="checkbox"\>。
- slotProps

|属性|类型|说明|
|:-:|:-:|:-:|
|isOpen|boolean|是否被选中|
|disabled|boolean|是否禁用|

## [示例](https://widget.ethercap.com/ledap/default/checkbox)
```vue
<template lang="html">
<div>
    <form-item class="form-group" :model="model" attr="city">
        <template v-slot="p">
            <groupinput v-bind="p">
                <template v-slot:default="p">
                    <checkbox v-bind="p" :key="p.dataKey">{{p.value}}</checkbox>
                </template>
            </groupinput>
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
