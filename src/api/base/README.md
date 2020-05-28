# BaseObject
BaseObject 是 Ledap 的一个基类，Ledap 中大部分基类都是继承自此类，如Model、DataProvider、WebDataProvider等。

## 获取实例
```javascript
import * as Ledap from 'ledap';
const base = new Ledap.BaseObject();
```

## 实例方法
### base.load(data)
- 参数：
  - {Object} data
- 详细：实例加载 data，获取 data 的 key/value ,其中 key 以 _ 开头的属性和 value 的类型为 function 的属性，将成为不可枚举属性。
- 示例：
```javascript
base.load({
    name: 'ledap',
    age: 2,
    _message: 'this is a private property',
    getName: function() {
        return 'ledap';
    }
});
base.name;      // 可枚举属性
base._message; // 不可枚举属性
base.getName;  // 不可枚举属性
```

### base.init()
- 详细：遍历 base 实例的属性，将 key 以 _ 开头的属性和 value 的类型为 function 的属性，配置为不可枚举属性。当调用 load 方法时会自动调用 init 方法。

### base.on(name, handler[, context]);
- 详细：见 [event.on](/api/event/#event-on-name-handler-context)

### event.emit(name[, value1, value2, ...])
- 详细：见 [event.on](/api/event/#event-emit-name-value1-value2)

### event.off(name, handler[, context])
- 详细：见 [event.on](/api/event/#event-off-name-handler-context)

### event.once(name, handler[, context])
- 详细：见 [event.on](/api/event/#event-once-name-handler-context)
