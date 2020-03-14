const express = require('express')
const app = express()
let apiRoutes = express.Router()
app.use('/api', apiRoutes)

const apis = require('require-all')({
  dirname: __dirname,
  resolve (Controller) {
    let proArr = Object.keys(Controller)
    return Controller[proArr[0]]
  }
})

// app.use('/api', function (req, res, next) {
//   res.redirect(req.path)
//   next()
// })

for (let pro of Object.keys(apis)) {
  if (pro === 'index') continue
  apis[pro](app)
}

app.listen(3030, () => console.log('listening on http://localhost:3030'))
