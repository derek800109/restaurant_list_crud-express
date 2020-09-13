// app.js
// require packages used in the project
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const bodyParser = require('body-parser')// 引用 body-parser
const methodOverride = require('method-override')

const Restaurant = require('./models/restaurant.js')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

// ---------------------------------------------------------------------

// setting static files
app.use(express.static('public'))

// require express-handlebars here
const exphbs = require('express-handlebars')
// const restaurant = require('./models/restaurant.js')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理

app.use(routes)

// ---------------------------------------------------------------------

// // routes setting
// app.get('/', (req, res) => {
//   // past the movie data into 'index' partial template


//   Restaurant.find() // 取出 Todo model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .then((restaurants) => {
//       res.render('index', { restaurants: restaurants })
//     }) // 將資料傳給 index 樣板
//     .catch(error => console.error(error)) // 錯誤處理
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.toLowerCase()
//   console.log("keyword", keyword)

//   Restaurant.find() // 取出 Todo model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .then(restaurants => {
//       const keyRestaurants = restaurants.filter(restaurant => {
//         return restaurant.name.toLowerCase().includes(keyword) ||
//           restaurant.name_en.toLowerCase().includes(keyword)
//       }) // 將資料傳給 index 樣板
//       res.render('index', { restaurants: keyRestaurants })
//     })
//     .catch(error => console.error(error)) // 錯誤處理
// })

// // ------------------------------------------------------------------------------------------- new

// app.get('/restaurants/new', (req, res) => {

//   return res.render('new')
// })

// app.post('/restaurants', (req, res) => {
//   const restaurant = req.body       // 從 req.body 拿出表單裡的 name 資料

//   return Restaurant.create(restaurant)     // 存入資料庫
//     .then(() => res.redirect('/')) // 新增完成後導回首頁
//     .catch(error => console.log(error))
// })

// // -------------------------------------------------------------------------------------------

// // ------------------------------------------------------------------------------------------- edit

// app.get('/restaurants/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .lean()
//     .then(restaurant => res.render('edit', { restaurant }))
//     .catch(error => console.log(error))
// })

// app.post('/restaurants/:id/edit', (req, res) => {
//   const id = req.params.id
//   const editedRestaurant = req.body
//   console.log(id, editedRestaurant)

//   res.redirect(`/restaurants/${id}/edit`)

//   return Restaurant.findById(id)
//     .then(restaurant => {
//       restaurant.name = editedRestaurant.name
//       restaurant.name_en = editedRestaurant.name_en
//       restaurant.category = editedRestaurant.category
//       restaurant.location = editedRestaurant.location
//       restaurant.phone = editedRestaurant.phone
//       restaurant.google_map = editedRestaurant.google_map
//       restaurant.rating = editedRestaurant.rating
//       restaurant.description = editedRestaurant.description
//       return restaurant.save()
//     })
//     .then(() => res.redirect(`/restaurants/${id}`))
//     .catch(error => console.log(error))
// })

// // -------------------------------------------------------------------------------------------

// // ------------------------------------------------------------------------------------------- get one

// app.get('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   console.log("show id:", id)
//   return Restaurant.findById(id)
//     .lean()
//     .then(restaurant => {
//       console.log(restaurant)
//       res.render('show', { restaurant })
//     })
//     .catch(error => console.log(error))
// })

// // -------------------------------------------------------------------------------------------

// // ------------------------------------------------------------------------------------------- delete

// app.post('/restaurants/:id/delete', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .then(restaurant => restaurant.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// -------------------------------------------------------------------------------------------

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on  http://localhost:${port}`)
})