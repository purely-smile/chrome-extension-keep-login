export default {
  SetBookData: {
    name: '加载页面数据',
    template: '共加载<%= data %>页',
    path: 'mainCode.pageContent.length',
  },
  SetTemplateData: {
    name: '加载模板数据',
    template: '共加载<%= data %>个',
    path: 'list.length',
  },
  SELECTITEM: {
    name: '选择元素',
    template: '当前选择<%= data %>',
    path: 'indexs',
    format(data) {
      return data.join()
    },
  },
  SET_PARAM: {
    name: '更新元素属性',
    template: '<%= data %>',
    path: 'item.name',
  },
  DELETE_ITEM: {
    name: '删除元素',
  },
  ADD_TEXT: {
    name: '新建文本',
  },
  ADD_TABLE: {
    name: '新建表格',
  },
  ADD_IMG: {
    name: '新建图片',
  },
}
