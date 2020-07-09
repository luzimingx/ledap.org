# Validator
Validator 是 Ledap 的验证器，可以根据参数返回一个特定的验证器，验证器可以验证某个属性的值是否符合指定的规则，Ledap 将验证器分成了 boolean、compare、dictVa、number 等数种。需要注意的是，Validator 功能属于 [Model](/api/model/) 的一部分，在获取 [Model](/api/model/) 实例的时候，只需按照正确的格式传入 rules 即可。
## rules
- 类型：Array\<Rule\>
#### rule
|属性|类型|说明|
|:-:|:-:|:-:|
|type|String|验证器的类型|
|options|Object|[验证器分类](/api/Validator/#验证器分类)|


## 获取验证器
```javascript
import * as Ledap from 'ledap';
const model = new Ledap.Model();
model.load({
    name: {
        label: '姓名',
        hint: '请输入姓名',
        value: '张三',
        rules: [{
            type: 'string',   // 获得了一个 string 验证器
            options: {
                max: 5,
                message: '姓名必须是一条字符串。',
                skipOnEmpty: 1,
                tooLong: '姓名只能包含至多5个字符。'
            }
        }]
    }
});
model.validate('name');    // true
```
## 验证器分类
- options 通用字段

|属性|类型|说明|
|:-:|:-:|:-:|
|message|String|当验证结果为 false 的错误信息|
|skipOnEmpty|boolean \| Number|当数据为空时，验证数据后不添加错误信息|
### boolean
- options

|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|:-:|
|message|String|''|是||
|skipOnEmpty|boolean \| Number|true|否||
|trueValue|any|true|否|表示真值|
|falseValue|any|true|否|表示假值|
|strict|boolean|false|否|为 true 时，只有数据 === 真值时验证结果才为 true|
- 示例：
```javascript
{
    type: 'boolean',
    options: {
        message: '格式错误',
        trueValue: true,
        falseValue: false,
        strict: true
    }
}
```

### string
- options

|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|:-:|
|message|String|''|是||
|skipOnEmpty|boolean \| Number|true|否||
|is|Number|-|否|指定字符串的长度值，若不符合则错误信息为 notEqual 的值|
|notEqual|String|'文本内容长度不匹配'|否|is 规则的错误提示信息|
|min|Number|-|否|指定字符串的最小长度，若不符合则错误信息为 tooShort 的值|
|tooShort|String|'文本内容过短'|否|min 规则的错误提示信息|
|max|Number|-|否|指定字符串的最大长度，若不符合则错误信息为 tooLong 的值|
|tooLong|String|'文本内容过长'|否|max 规则的错误提示信息|

### int, double, number
- options

|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|:-:|
|message|String|''|是||
|skipOnEmpty|boolean \| Number|true|否||
|pattern|String|\/^\s*[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?\s*$\/|否|数字的正则表达式|
|max|Number|-|否|指定数值的最大值，若不符合规则则错误信息为 tooBig 的值|
|tooBig|String|'数据太大'|否|max 规则的错误信息|
|min|Number|-|否|指定数值的最小值，若不符合规则则错误信息为 tooSmall 的值|
|tooSmall|String|'数据太大'|否|min 规则的错误信息|

### required
- options

|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|:-:|
|message|String|''|是||
|skipOnEmpty|-|true|否|指定无效，恒定为 true|
|requiredValue|any|-|否|如果设置了该值，则数据应该 == requiredValue，如果为 strict 模式，则应该 ===|
|strict|boolean|false|否|是否是严格模式|

<!-- ### trim, filter
- options

|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|:-:|
|message|String|''|是||
|skipOnEmpty|boolean \| Number|true|否|| -->

### match, regex
- options

|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|:-:|
|message|String|''|是||
|skipOnEmpty|boolean \| Number|true|否||
|pattern|String|-|是|验证的正则表达式|
|not|boolean|false|否|验证的结果取反|

### compare
- options

|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|:-:|
|message|String|''|是||
|skipOnEmpty|boolean \| Number|true|否||
|operator|String|-|是|比较的操作符，有效值==, >, < , >=, <=,===, !=, !==|
|type|String|'string'|否|将数组转换成某种类型再进行比较，有效值'strikng'、'number'|
|compareValue|String \| Number|-|是|与某个值进行比较|
|compareAttribute|String|-|否|与 model 的某个属性进行比较|

### email
- options

|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|:-:|
|message|String|''|是||
|skipOnEmpty|boolean \| Number|true|否||
|pattern|String|略|否|验证邮箱的正则表达式，例如：john@example.com|
|fullPattern|String|略|否|验证全称邮箱的正则表达式，例如：john <john@example.com>|
|allowName|boolean|false|否|是否采用 fullPattern 来验证|
|enableIDN|boolean|false|否|是否支持IDN|


### in, range
检查数据是否为 in,range 中的数值。
- options

|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|:-:|
|message|String|''|是||
|skipOnEmpty|boolean \| Number|true|否||
|range|Array|-|是|指定的数组|
|allowArray|boolean|false|否|是否允许验证的值是指定数组的子元素|
|not|boolean|false|否|是否对验证结果取反|

### url
- options

|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|:-:|
|message|String|''|是||
|skipOnEmpty|boolean \| Number|true|否||
|pattern|String|略|否|验证额正则表达式|
|enableIDN|boolean|false|否|是否支持IDN|
|defaultScheme|String|''|否|如果有,在验证时，会自动加上。例如，如果 defaultScheme 为 'http', 用户输入 'www.xx.com' 在验证之后会变为 'http://www.xx.com'|

### ip
- options

|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|:-:|
|message|Object|详见下|否|不同情况的错误信息|
|skipOnEmpty|boolean \| Number|true|否||
|ipv4|boolean|true|否|是否允许 ipv4 地址|
|ipv4Pattern|String|略|否|ipv4 正则验证表达式|
|ipv6|boolean|true|否|是否允许 ipv6 地址|
|ipv6Pattern|String|略|否|ipv6 正则验证表达式|
|ipParsePattern|String|\/^(!?)(.+?)(\/(\d+))?$\/|否|获取 ip 的正则，可以将否定符等提出来来|
|negation|boolean|false|否|ip 地址前是否有一个否定符，例如 !192.168.1.1|
|subnet|boolean|false|否|是否带 CIDR 子网掩码，例如 192.168.10.0/24|
#### message Object
|属性|默认值|说明|
|:-:|:-:|:-:|:-:|
|ipv4NotAllowed|'地址不能是ipv4地址'|ipv4 验证错误信息|
|ipv6NotAllowed|'地址不能是ipv6地址'|ipv6 验证错误信息|
|noSubnet|'ip地址必须带掩码'|subnet 为 true 时验证错误信息|
|hasSubnet|'ip地址不能带掩码'|subnet 为 false 时验证错误信息|
|message|'ip地址不正确'|其他验证错误信息|

### dict, array
model 的属性值是指定的 list 中的一部分。
- options

|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|:-:|
|message|String|''|是||
|skipOnEmpty|boolean \| Number|true|否||
|list|Object|-|是|指定的的范围|
|order|Array|Object.keys(list)|否|指定 list 的展示顺序|
|multiple|boolean|false|否|被验证数据是否允许为数组|
|excludes|Array|[]|否|被验证数据不能包含在此数组中|
|min|Number|-|否|指定最小选项数，若不符合规则则错误信息为 tooSmall 的值|
|tooSmall|String|'选项过少'|否|min 规则的错误信息|
|max|Number|-|否|指定最大选项数，若不符合规则则错误信息为 tooMuch 的值|
|tooMuch|String|'选项过多'|否|max 规则的错误信息|
