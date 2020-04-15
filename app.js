const http = require('http')
const express = require('express')
const path = require('path')
const swig = require('swig')

const app = express()

app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))
app.disable('x-powered-by')
app.set('port', process.env.PORT || 3003)
app.use('/assets', express.static(__dirname + '/build'))

app.use('/', require('./routes'))


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  err.path = req.path
  next(err)
})

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const listen = function() {
  var server = http.createServer(app)
  return server.listen.apply(server, arguments)
}

if (!module.parent) {
  listen(app.get('port'), () => {
    console.log('Server started: http://localhost:' + app.get('port') + '/')
  })
}
//module.exports = app