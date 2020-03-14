//** demo api */
function demo(app) {
  /* 获取实例数据 */
  app.get('/demo/demo', (req, res) => {
    res.json(require('../data/demo/demo.json'))
  })
}

module.exports = { demo }
