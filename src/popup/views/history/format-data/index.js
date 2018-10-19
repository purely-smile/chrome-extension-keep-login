import _get from 'lodash.get'
import _template from 'lodash.template'
import dataMap from './data-map'

const defaultFormat = val => val
export default list => list
  .filter((item) => {
    const { type, payload } = item
    const noHistory = _get(payload, 'noHistory', false)
    return dataMap[type] && !noHistory
  })
  .map((item) => {
    const { type, payload, time } = item
    const {
      name, template, path, format = defaultFormat,
    } = dataMap[type]
    let describe = ''
    if (template) {
      const data = format(_get(payload, path, ''), payload)
      const compiled = _template(template)
      describe = compiled({ data })
    }
    const date = new Date(time)
    return {
      name,
      describe,
      time: [date.getHours(), date.getMinutes(), date.getSeconds()].join(':'),
    }
  })
  .reverse()
