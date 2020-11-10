const mongoose = require('mongoose') // 載入 mongoose

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log(MONGODB_URI + ' - mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log(MONGODB_URI + ' - mongodb connected!')
})


module.exports = db