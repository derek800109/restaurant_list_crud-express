const restaurant = require('./restaurant.json');

// restaurant.results.forEach(doc => {
//     console.log(doc)
// });

const mongoose = require('mongoose')
const Todo = require('../restaurant.js') // 載入 todo model

mongoose.connect('mongodb://localhost/restaurant-list-crud', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')

    restaurant.results.forEach(doc => {
        Todo.create({ id: doc.id,
            name: doc.name,
            name_en: doc.name_en,
            category: doc.category,
            image: doc.image,
            location: doc.location,
            phone: doc.phone,
            google_map: doc.google_map,
            rating: doc.rating,
            description: doc.description})
    })
    
    console.log('done')
  })