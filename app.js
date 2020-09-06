// app.js
// require packages used in the project
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('./models/restaurant.js')
const bodyParser = require('body-parser')// 引用 body-parser

const app = express()
const port = 3000

// ---------------------------------------------------------------------

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/restaurant-list-crud', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// ---------------------------------------------------------------------

// setting static files
app.use(express.static('public'))

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
app.get('/', (req, res) => {
  // past the movie data into 'index' partial template
  

  Restaurant.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((restaurants) => {
      res.render('index', { restaurants: restaurants })
    }) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.toLowerCase()
//   console.log("keyword", keyword , req.query.keyword)
//   const restaurants = restaurantList.results.filter(restaurant => {
//     return restaurant.name.toLowerCase().includes(keyword) || 
//             restaurant.name_en.toLowerCase().includes(keyword)
//   })

//   res.render('index', { restaurants: restaurants, keyword: keyword})
// })


// app.get('/restaurants/:restaurant_id', (req, res) => {

//   const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id) 
//   res.render('show', { restaurant: restaurant })
// })

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on  http://localhost:${port}`)
})