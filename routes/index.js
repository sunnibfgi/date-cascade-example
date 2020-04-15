const express = require('express')
const Router = express.Router()
const { renderProps } = require('../utils')

;[{ index: '/' }, { 'users': '/users' }].forEach((route) => {
  Object.keys(route).forEach((key) => {
    Router.get(route[key], function(req, res) {
      res.render(key, {
        ...renderProps()
      })
    })
    return false
  })
})


module.exports = Router