// load in json ducument
const restaurant = require('./restaurant.json');

// load in json module
require('./config/mongoose')

const Todo = require('../restaurant.js') // 載入 todo model

db.once('open', () => {
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