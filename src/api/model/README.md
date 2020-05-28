# Model
Model 是 Ledap 的一个基类，是 BaseObject 的子类，用于处理数据，如表单验证等。

## 获取实例
```javascript
import * as Ledap from 'ledap';
const model = new Ledap.Model();
```

## 实例方法
### model.load(data)
该方法是 Ledap 中比较重要的一个方法，承担了 Model 类的核心职责，加载数据，并提供对数据的描述，如 label、hint 等。
- 参数：
  - {Object} data
- 详细：实例加载 data，data 为 key/value 结构，当 value 为简单类型的时候，直接获取该值，当 value 为 Object 时，我们叫做为有配置的 value。需要注意的是，当由于 Model 是 BaseObject 的子类，属性的可枚举性与 [base.load](/api/base/#base-load-data) 有相同的处理方式。
#### 有配置的 value
|属性|类型|说明|
|:-:|:-:|:-:|
|label|String|form-item 组件 label 的默认值|
|hint|String|base-input 组件 placeholder 的默认值|
|value|String|该属性会作为 model 对应的 key 的值，也是 form-item 的默认值|
|rules|Array\<Object\>|[rules](/api/Validator/#rules)|
- 示例：
```javascript
const model = new Ledap.Model();
model.load({
    age: 18,
    name: {
        label: '姓名',
        hint: '请输入姓名',
        value: '张三',   // 此值作为 model.name 的值
        rules: [{
            type: 'string',
            options: {
                max: 5,
                message: '姓名必须是一条字符串。',
                skipOnEmpty: 1,
                tooLong: '姓名只能包含至多5个字符。'
            }
        }]
    }
});
model.age;  // 18
model.name: // 张三
```

### model.rules()
- 返回值：{Object}
- 详细：返回 model 各个字段的 rules
- 示例：
```javascript
models.rules();
// {
//     name: {
//         string: {
//             max: 5,
//             message: '姓名必须是一条字符串。',
//             skipOnEmpty: 1,
//             tooLong: '姓名只能包含至多5个字符。'
//         }
//     }
// }
```

### model.attributeLabels()
- 返回值：{Object}
- 详细：返回 model 各个字段的 label
- 示例：
```javascript
model.attributeLabels();  // { name: '姓名' }
```

### model.getAttributeLabel(key)
- 参数：
  - {String} key
- 返回值：{String}
- 详细：返回 model 中 key 属性的 label
- 示例：
```javascript
model.getAttributeLabel('name');  // 姓名
```

### model.attributeHints()
- 返回值：{Object}
- 详细：返回 model 各个字段的 hint
- 示例：
```javascript
model.attributeLabels();  // { name: '请输入姓名' }
```

### model.getAttributeHint(key)
- 参数：
  - {String} key
- 返回值：{String}
- 详细：返回 model 中 key 属性的 hint
- 示例：
```javascript
model.getAttributeHint('name');  // 请输入姓名
```

### model.validate([attributes, clearErrors])
- 参数：
  - {String | Array\<String\>}
  - {boolean} clearErrors 默认值为 true
- 返回值：{boolean}
- 详细：清空 model 指定属性的错误信息，并重新验证其属性的 value 是否符合对应的 rules，当未指定 attributes 时，则验证所有属性。
- 示例：
```javascript
model.validate('name');  // true
model.name = 'zhangsan';
model.validate('name');  // false 因为不符合长度规则
model.validate();  // false
```

### model.addValidator(attribute, ruleType[, option])
- 参数：
  - {String} attribute
  - {String | Function} ruleType
  - {Object} option
- 详细：给指定 attribute 添加一个类型为 [ruleType](/api/Validator/#验证器分类) 的验证规则，选项为 [option](/api/Validator/#验证器分类)，或者直接指定一个函数验证。
- 示例：
```javascript
model.addValidator('age', function() {
    if (!model.age) return false;
    return true;
});
```

### model.hasErrors([attribute])
- 参数：
  - {String} attribute
- 返回值：{boolean}
- 详细：返回指定 attribute 对应的值在对应的 rules 下是否有错误，如果没有指定 attribute，则返回所有属性是否有错误。需要先调用 model.validate 方法。

### model.getErrors([attribute])
- 参数：
  - {String} attribute
- 返回值：{Array | Object} 错误数组格式是因为 rules 是数组格式
- 详细：返回指定 attribute 的错误，当没有指定 attribute 时，则返回全部属性的错误信息。
- 示例：
```javascript
model.getErrors('name');
// ['姓名只能包含至多5个字符。']
model.getErrors();
// {
//     name: ['姓名只能包含至多5个字符。']
// }
```

### model.getFirstError([attribute])
- 参数：
  - {String} attribute
- 返回值：{String}
- 详细：返回指定 attribute 的第一个错误，当没有指定 attribute 时，则按照对象的枚举顺序返回 model.getErrors() 的第一个属性的第一个错误。
- 示例：
```javascript
model.getFirstError('name');  // '姓名只能包含至多5个字符。'
model.getFirstError();        // '姓名只能包含至多5个字符。'
```

### model.addError(attribute[, error])
- 参数：
  - {String} attribute
  - {String} error
- 详细：手动给指定的 attribute 添加一个错误信息。
- 示例：
```javascript
model.addError('age', '年龄太大了');
model.getErrors('age');   // ['年龄太大了']
model.addError('name', '名字太长了');
model.getErrors('name');   // ['姓名只能包含至多5个字符。', '名字太长了']
```

### model.clearErrors([attribute])
- 参数：
  - {String | Array\<String\>}
- 详细：清空指定 attribute 的错误信息，如果没有指定 attribute，则清空所有属性的错误信息

### model.isRequired(attribute)
- 参数：
  - {String} attribute
- 返回值：{boolean}
- 详细：返回指定属性 attribute 是否是必填项


## 静态属性
### Model.EVENT_BEFORELOAD
- 类型：String
- 详细：在调用 load 之前触发的事件名称

### Model.EVENT_LOAD
- 类型：String
- 详细：在调用 load 过程中触发的事件名称

### Model.EVENT_AFTERLOAD
- 类型：String
- 详细：在调用 load 之后触发的事件名称

### Model.EVENT_BEFORE_VALIDATE
- 类型：String
- 详细：在调用 validate 之前触发的事件名称

### Model.EVENT_AFTER_VALIDATE
- 类型：String
- 详细：在调用 validate 之后触发的事件名称

## 其他
由于 Model 是 BaseObject 的子类，Model 的实例也具有 BaseObject 实例的方法，如model.on、model.emit等，详见 [BaseObject 实例方法](/api/base/#实例方法)。

<!-- NOTE -->
<!-- 未写上的方法：getValidatorData createValidator createValidators beforeValidate afterValidate scenarios相关内容 -->
