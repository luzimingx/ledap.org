# Pagination
Pagination 是 Ledap 的一个基类，是 BaseObject 的子类，是列表的分页器。
## 获取实例
```javascript
import * as Ledap from 'ledap';
const pager = new Ledap.Pagination();
pager.load({
    currentPage: 1,
    pageCount: 1,
    perPage: 50,
    totalCount: 11
});

pager.currentPage; // 1
```

## 实例属性
### pager.totalCount
- 类型：Number
- 详细：表示总的数量

### pager.pageCount
- 类型：Number
- 详细：表示总的页数

### pager.perPage
- 类型：Number
- 默认值：20
- 详细：表示每一页的数量

### pager.currentPage
- 类型：Number
- 默认值：1
- 详细：表示当前页数


## 实例方法
### pager.hasNext()
- 返回值：{boolean}
- 详细：是否有下一页

### pager.hasPrev()
- 返回值：{boolean}
- 详细：是否有上一页


## 静态属性
### Pagination.EVENT_SETPAGE
- 类型：String
- 详细：当修改 currentPage 的时候触发的事件
