# DataProvider
DataProvider 是 Ledap 的一个基类，是 BaseObject 的子类，用于列表的分页问题。

## 获取实例
```javascript
import * as Ledap from 'ledap';
const dp = new Ledap.DataProvider(option);
```
#### option
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|searchModelClass|Model|Ledap.Model|否|列表筛选器的类，用户可以指定一个类，继承自 Model，加入一些用户逻辑|
|modelClass|Model|Ledap.Model|否|列表元素的类，因此列表的数据类型将为 Array\<Model\>，用户可以指定一个类，继承自 Model，加入一些用户逻辑|
|paginationClass|Pagination|Ledap.Pagination|否|列表分页器的类，用户可以指定一个类，继承自 Pagination，加入一些用户逻辑|
|searchModel|Model|new searchModelClass()|否|列表筛选器|
|pager|Pagination|new paginationClass()|否|列表分页器|
|sort|String|''|否|列表排序依据，后端会依据此顺序返回列表|
|data|Object|{}|否|列表的原始数据，如果指定了 data，在实例化的时候会自动调用 dp.load(data)|
##### sort
|值|说明|
|:-:|:-:|
|'creationTime'|按 creationTime 升序|
|'-creationTime'|按 creationTime 降序|
|'creationTime,-id'|优先按 creationTime 升序，creationTime 相同则按照 id 降序排列|
##### data
|属性|类型|默认值|是否必填|说明|
|:-:|:-:|:-:|:-:|:-:|
|params|Object|{}|否|[dp.searchModel](/api/DataProvider/#dp-searchmodel) 的属性|
|items|Array\<Object\>|\[\]|否|[dp.models](/api/DataProvider/#dp-models) 的数据|
|meta|Object|{}|否|详见[获取 Pagination 实例](/api/Pagination/#获取实例)|
|sort|String \| Object|''|否|覆盖 option.sort 的值|


## 实例属性
### dp.models
- 类型：Array\<Model\>
- 说明：列表数组

### dp.isLoad
- 类型：boolean
- 说明：是否执行过 load 方法

### dp.sort
- 类型：String
- 说明：当前 dp 的排序方式

### dp.searchModel
- 类型：Model
- 说明：当前 dp 的查询参数，该对象的属性会作为子类 WebDataProvider 发送请求时的参数，[getParams](/api/DataProvider/#dp-getparams-option)，作为筛选列表的依据。

### dp.pager
- 类型：[Pagination](/api/Pagination/)
- 详细：当前 dp 的分页器，该对象的属性会作为子类 WebDataProvider 发送请求时的参数，[getParams](/api/DataProvider/#dp-getparams-option)。

### dp.searchModelClass
- 类型：Model
- 详细：在实例化的时候指定的值

### dp.modelClass
- 类型：Model
- 详细：在实例化的时候指定的值

### dp.paginationClass
- 类型：Pagination
- 详细：在实例化的时候指定的值


## 实例方法
### dp.load(data[, append, primaryKey])
- 参数：
  - {Object} data
  - {boolean} append 默认值为false，此时每次 load 数据会清空之前的数据，而非追加数据
  - {String} primaryKey 默认值为''，dp.models 中的元素会根据 model[primaryKey] 对 model 进行进行去重，例如 primaryKey 为 'id'，那么 dp.models 中的元素会以 model.id 进行去重。
- 示例：
```javascript
const dp = new Ledap.DataProvider({});
dp.load({
    items: [{
        id: 2,
        name: '张三',
        age: 28
    }, {
        id: 1,
        name: '李四',
        age: 20
    }],
    meta: {
        currentPage: 1,
        pageCount: 1,
        perPage: 10,
        totalCount: 2
    },
    sort: 'id,-age'
});
```

### dp.remove([index])
- 参数：
  - {Number | Model} index
- 返回值：{Model} 返回被删除的 model
- 详细：从 dp.models 删除指定的 model

### dp.isSortAsc(attribute)
- 参数：
  - {String} attribute
- 返回值：{boolean}
- 详细：dp 排序方式是否是按 attribute 的升序排列
- 示例：
```javascript
dp.isSortAsc('id'); // true
```

### dp.isSortDesc(attribute)
- 参数：
  - {String} attribute
- 返回值：{boolean}
- 详细：dp 排序方式是否是按 attribute 的降序排列
- 示例：
```javascript
dp.isSortDesc('age'); // true
```

### dp.toggleSort(attributes[, singleSort])
- 参数：
  - {String | Array\<String\>} attributes
  - {boolean} singleSort 默认值为true，是否按照单一字段排序
- 详细：修改 dp.sort，当 singleSort 为 true 时，会将指定字段作为唯一排序字段。注意执行该方法后，本地的数据并不会重新排序，如果需要排序，需要执行 sortModels 等方法。
- 示例：
```javascript
dp.toggleSort('id');
dp.sort; // '-id'
```

### dp.sortModels(attribute[, asc])
- 参数：
  - {String} attribute
  - {boolean} asc 表示是否是升序排列，默认为 true
- 详细：按照指定的 attribute 和 排序方式 asc 重新排列 dp.models 数组
- 示例：
```javascript
dp.sortModels('age'); // 将本地的 dp.models 数组按照 age 进行升序排列
```

### dp.localSort()
- 详细：按照当前 dp.sort 中的第一个 attribute 排列 dp.models数组，例如 dp.sort === '-id,age'，则按照 'id' 进行降序排列。

### dp.getParams(option)
- 参数：
  - {Object} option option 中的属性会默认返回，并且如果有相同属性，option 中的属性优先级最高
- 返回值：{Object}
- 说明：子类 WebDataProvider 实例发送请求前会调用该方法，以获取参数。
#### 返回值
|属性|类型|说明|
|:-:|:-:|:-:|
|page|Number|返回 dp.pager.currentPage|
|per-page|Number|返回 dp.pager.perPage|
|sort|Number|返回 dp.sort|
|其他|any|返回 dp.searchModel 所有属性|


## 静态属性
### DataProvider.SORT_ASC
- 类型：Number
- 默认：4
- 详细：dp.sort 表示升序的值

### DataProvider.SORT_DESC
- 类型：Number
- 默认：3
- 详细：dp.sort 表示降序的值

## 静态方法
### DataProvider.getInstance(data[, searchModelClass, modelClass, paginationClass]);
- 参数：
  - {Object} data 列表的原始数据，详见[data](/api/DataProvider/#data)
  - {Model} searchModelClass，默认值为 Ledap.Model
  - {Model} modelClass Ledap.Model
  - {Pagination} paginationClass Ledap.Pagination
- 返回值：{DataProvider}
- 说明：获取一个 DataProvider 的实例
- 示例：
```javascript
const dp = Ledap.DataProvider.getInstance({
    items: [{
        id: 2,
        name: '张三',
        age: 28
    }, {
        id: 1,
        name: '李四',
        age: 20
    }],
    meta: {
        currentPage: 1,
        pageCount: 1,
        perPage: 10,
        totalCount: 2
    },
    sort: 'id,-age'
});
```
