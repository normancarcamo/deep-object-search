module.exports = function(_src, _txt, _opts) {
  const is = {
    object: function(x) {
      if (Object.prototype.toString.call(x) !== '[object Object]') {
        return false
      } else {
        var prototype = Object.getPrototypeOf(x)
        return prototype === null || prototype === Object.prototype
      }
    },
    string: (x) => typeof x === 'string'
  }
  let result = { found: false }
  let path = ''

  function run(source, txt, options = { rootLabel: 'root' }, inner = { prop: 'root', parent: null }) {
    if (!source || !is.object(source)) {
      return result
    }

    if (!txt || !is.string(txt)) {
      return result
    }

    if (!path) {
      path = options.rootLabel
    } else {
      path += `.${inner.prop}`
    }

    let lastKeyInPath = txt.split('.').filter(s => s && s).pop()

    if (txt in source) {
      result.found = true
      result.search = txt
      result.value = source[txt]
      result.parent = inner.parent
      path += `.${txt}`
      result.path = path
      return result
    } else if (lastKeyInPath in source) {
      result.found = true
      result.search = txt
      result.value = source[lastKeyInPath]
      result.parent = inner.parent
      path += `.${txt}`
      result.path = path
      return result
    } else {
      let keys = Object.keys(source)
      for (let i = 0; i < keys.length; i++) {
        if (is.object(source[keys[i]])) {
          run(source[keys[i]], txt, options, { prop: keys[i], parent: { name: inner.prop, content: source} })
        }
      }
    }
  }

  run(_src, _txt, _opts)

  return result
}
