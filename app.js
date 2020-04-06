const http = require('http')
const express = require('express')
const path = require('path')

const app = express()

// view engine setup
app.disable('x-powered-by')

app.set('port', process.env.PORT || 3003)
app.set('view engine', 'html')

app.use(express.static(__dirname + '/build'))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

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