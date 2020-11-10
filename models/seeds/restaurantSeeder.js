const bcrypt = require('bcryptjs')
// 由於我們把 MongoDB 連線搬進了 .env 裡，需要在一開始載入 .env 的檔案
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// load in json module
const Restaurant = require('../restaurant.js')
const User = require('../user')
const db = require('../../config/mongoose')

const restaurantData = require('./restaurant.json')

// -------------------------------------------------------------------------------------------

const SEED_USER = [{
        email: 'user1@example.com',
        password: '12345678',
        restaurants: [1,2,3]},
    {
        email: 'user2@example.com',
        password: '12345678',
        restaurants: [4,5,6]}
]

// -------------------------------------------------------------------------------------------

db.once('open', () => {
    Promise.all(Array.from(
        {length: SEED_USER.length},
        (_,i) => bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
        .then(hash => User.create({ email: SEED_USER[i].email, password: hash }))
        .then(userId => {
            const restaurants = restaurantData.results.filter(restaurant => SEED_USER[i].restaurants.indexOf(restaurant.id) >= 0)
            console.log(' --------- ' + i + ' ' + SEED_USER[i])
            
            return Promise.all(Array.from(
                {length: restaurants.length},
                (_,j) => Restaurant.create({
                            userId, 
                            id: restaurants[j].id,
                            name: restaurants[j].name,
                            name_en: restaurants[j].name_en,
                            category: restaurants[j].category,
                            image: restaurants[j].image,
                            location: restaurants[j].location,
                            phone: restaurants[j].phone,
                            google_map: restaurants[j].google_map,
                            rating: restaurants[j].rating,
                            description: restaurants[j].description})
            ))
        })
    ))
    .then(() => {
        console.log('done')
        // process.exit() 指「關閉這段 Node 執行程序」
        process.exit()
    })
  })