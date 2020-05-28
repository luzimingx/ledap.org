# Theme
Theme 是 ledap 的一个基类，可以添加组件、注册组件等。

## 获取实例
```javascript
import * as Ledap from 'ledap';
const Theme = Ledap.Theme;

const theme = Theme.getInstance();
```

## 静态方法
Theme.getInstance([themeConfig, key])
- 参数：
  - {Object} themeConfig 主题配置，默认值{}
  - {String} key 标记主题的 key， 默认值'default'
- 示例：
```javascript
Theme.getInstance({
    step: {
        template: `
        <component :is="tagName" :class="{'active text-success': isOpen()}">
            <slot></slot>
        </component>`,
    }
})
```

## 实例属性
### theme.key
- 类型：String
- 详细：标示 theme 的名字，默认为 'default'

### theme.components
- 类型：Object
- 详细：主题实例的组件

## 实例方法
### theme.getComponentByName(name)
- 参数：
  - {String} name
- 详细：返回名称为 name 的组件
- 示例：
```javascript
themt.getComponentByName('form-item');
```

### theme.addComponent(component[, cloneFrom])
- 参数：
  - {Object} component 一个 Vue 标准组件
  - {String} cloneFrom 指定该组件继承自某一个 ledap 组件
- 示例：
```javascript
theme.addComponent({
    // 一个 Vue 标准组件
}, 'base-input');
```

### theme.register(name, Vue)
- 参数：
  - {String | Array} name
  - {Vue} Vue
- 详细：注册指定的 Vue 组件
- 示例：
```javascript
import Vue from 'vue';
theme.register('form-item', Vue);  // 注册单个组件
theme.register(Object.keys(theme.components), Vue); // 注册全部组件
```
