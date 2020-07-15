# 组件
Ledap 创造性的引入了数据适配层的概念，我们也称之为逻辑组件，如 Group 表示的组管理器，将逻辑抽象成一个类，表现层即不同平台的组件，这些组件在数据适配层的基础上进行封装和调用，实现了跨平台组件。由于时间有限，我们目前仅仅提供了 Vue 组件，未来可能会支持更多平台。

![Image from alias](~@/img/introduction.png)

## Group 示例
Group 是一个类，表示组管理器，可能是一个按钮组，一个 checkbox 组，或者 radio 组等，不管它样子怎么变化，我们大体上可以看出背后的数据逻辑如下：

- group 是一组组件(数组)，由 group 来管控子组件的开和关；
- group 的已选中是一个队列，radio 组、按钮组为单选，checkbox 组为多选；
- group 可能可以取消选中；

因此，我把上述逻辑全部写入逻辑组件的 Group 中，这样我们可以在写不同平台下的表示组管理器的展示组件时，直接使用其内部逻辑；同时我们可以写checkbox、radio 等子组件，子组件必须满足 Group 的接口规范，如必须拥有 open、close 方法等，否则，子组件不能被加入组管理。

```javascript
// 逻辑组件的 api 直接被展示组件所使用
import { Group } from 'ledap';

var group = new Group();
// 允许选中的最大个数
group.max = 1;
group.excludes = [];

// 添加被group管理
group.add(component);
//选中某个选项
group.select("1");
// 取消某个选项
group.unselect("1");
// group当前选中的选项。
group.selected;
```
