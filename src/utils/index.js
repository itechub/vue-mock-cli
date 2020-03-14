import Vue from 'vue'

/**
 * install global common methods
 */
export default {
  install () {
    /**
     * prefix requests
     * @params url { String } the requests
     */
    Vue.prototype.$preUrl = (url) => {
      const preUrl = window.location.origin
      if (url.indexOf('/') === 0) {
        return preUrl + url
      } else {
        return preUrl + '/' + url
      }
    }

    /**
     * prefix the path of the picture
     * @params path { String } the path of image
     */
    Vue.prototype.$imgUrl = (path) => {
      return '/upload/' + path
    }

    /**
     * create unique id
     * @params store { Object } the store from Vuex
     */
    function createId (store) {
      // generate a string of 10-12 digits, converted to hexadecimal
      let num = Number(Math.random().toString().substr(2)).toString(36)
      let _bool = false
      store.state.canvasIdArr.forEach(v => {
        if (v === num) _bool = true
      })
      if (_bool) {
        num = createId()
      } else {
        store.commit('pushCanvasIdArr', num)
      }
      return num
    }
    Vue.prototype.$createUniqueId = () => createId()

    /**
     * deepClone
     * @params obj { Object } the object that want to deep clone
     */
    Vue.prototype.$deepClone = (obj) => {
      let str
      let newobj = obj.constructor === Array ? [] : {}
      if (typeof obj !== 'object') {
        return
      } else if (window.JSON) {
        str = JSON.stringify(obj)
        newobj = JSON.parse(str)
      } else {
        for (const i in obj) {
          newobj[i] = typeof obj[i] === 'object' ? Vue.prototype.$deepClone(obj[i]) : obj[i]
        }
      }
      return newobj
    }
  }
}
