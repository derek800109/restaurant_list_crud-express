const express = require('express')

const Restaurant = require('../../models/restaurant')

// --------------------------------------------------------

const router = express.Router()

// --------------------------------------------------------

router.get('/search', (req, res) => {
    const keyword = req.query.keyword.toLowerCase()
    console.log("keyword", keyword)

    Restaurant.find() // 取出 Todo model 裡的所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(restaurants => {
            const keyRestaurants = restaurants.filter(restaurant => {
                return restaurant.name.toLowerCase().includes(keyword) ||
                    restaurant.name_en.toLowerCase().includes(keyword)
            }) // 將資料傳給 index 樣板
            res.render('index', { restaurants: keyRestaurants, keyword })
        })
        .catch(error => console.error(error)) // 錯誤處理
})

// ------------------------------------------------------------------------------------------- new

router.get('/new', (req, res) => {

    return res.render('new')
})

router.post('/', (req, res) => {
    const restaurant = req.body       // 從 req.body 拿出表單裡的 name 資料

    return Restaurant.create(restaurant)     // 存入資料庫
        .then(() => res.redirect('/')) // 新增完成後導回首頁
        .catch(error => console.log(error))
})

// -------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------- edit

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const editedRestaurant = req.body
    // console.log(id, editedRestaurant)

    // res.redirect(`/${id}/edit`)

    return Restaurant.findById(id)
        .then(restaurant => {
            restaurant.name = editedRestaurant.name
            restaurant.name_en = editedRestaurant.name_en
            restaurant.category = editedRestaurant.category
            restaurant.location = editedRestaurant.location
            restaurant.phone = editedRestaurant.phone
            restaurant.google_map = editedRestaurant.google_map
            restaurant.rating = editedRestaurant.rating
            restaurant.description = editedRestaurant.description
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
})

// -------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------- get one

router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log("show id:", id)
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => {
            console.log(restaurant)
            res.render('show', { restaurant })
        })
        .catch(error => console.log(error))
})

// -------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------- delete

router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


// ------------------------------------------------------------------------------------------- delete


module.exports = router