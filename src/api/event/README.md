# Event
Event 是 Ledap 的一个基类，利用观察者模式实现了对事件的监听和响应，以实现数据的通信。

## 获取实例
```javascript
import * as Ledap from 'ledap';
const event = new Ledap.Event();
```

## 实例方法
### event.on(name, handler[, context])
- 参数：
  - {String} name
  - {Function} handler
  - {any} context
- 详细：监听 name 事件，当触发事件的时候执行回调函数 handler，并指定 handler 的上下文为 context，即调用 handler.call(context[, value1, value2, ...])。
- 示例：
```javascript
function handler(e) {
    // do something here
}
event.on('some-event', handler);
```

### event.emit(name[, value1, value2, ...])
- 参数：
  - {String} name
  - {any} value1, value2 此参数将传入 handler 函数中
- 详细：触发某个事件，并将参数传入 handler 中。
- 示例：
```javascript
event.emit('some-event', {
    'prop-a': 'a',
    'prop-b': 'b',
});
```

### event.off(name, handler[, context])
- 参数：
  - {String} name
  - {Function} handler
  - {any} context
- 详细：取消监听事件为 name，上下文为 context 的 handle。
- 示例：
```javascript
event.off('some-event', handler);
```

### event.once(name, handler[, context])
- 参数：
  - {String} name
  - {Function} handler
  - {any} context
- 详细：效果同 [event.on](#event-on-name-handler-context)，事件触发一次后自动解绑。

## 静态方法
### Event.on(name, handler[, context])
- 详细：见 [event.on](#event-on-name-handler-context)

### Event.emit(name[, value1, value2, ...])
- 详细：见 [event.emit](#event-emit-name-value1-value2)

### event.off(name, handler[, context])
- 详细：见 [event.off](#event-off-name-handler-context)

### event.once(name, handler[, context])
- 详细：见 [event.once](#event-once-name-handler-context)
