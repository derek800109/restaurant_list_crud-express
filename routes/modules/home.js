// 引用 Express 與 Express 路由器
const express = require('express')

const Restaurant = require('../../models/restaurant')

// ----------------------------------------------------

const router = express.Router()

// ----------------------------------------------------

function get_sort_kv(sort_method) {
    let sort_kv = { _id: 'asc' }

    if (sort_method === 'asc' || sort_method === 'desc') {
        sort_kv = { name_en: sort_method }
    }

    if (sort_method === 'location') {
        sort_kv = { location: 'asc' }
    }

    if (sort_method === 'category') {
        sort_kv = { category: 'asc' }
    }

    return sort_kv
}

router.get('/', (req, res) => {
    const sort_method = req.query.sort || 'asc'
    // console.log("sort_method", sort_method)

    const sort_kv = get_sort_kv(sort_method)
    const userId = req.user._id

    // past the movie data into 'index' partial template
    Restaurant.find({ userId }) // 取出 Todo model 裡的所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .sort(sort_kv) // desc
        .then(restaurants => {
            res.render('index', { restaurants })
        }) // 將資料傳給 index 樣板
        .catch(error => console.error(error)) // 錯誤處理
})

// 匯出路由模組
module.exports = router