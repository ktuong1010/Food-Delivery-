const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'src/views/layouts'),
  partialsDir: path.join(__dirname, 'src/views/partials')
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'src/views'));

// Routes - Define these BEFORE static middleware
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Foodzie',
    user: {
      location: 'Regent Street, A4, A4201, London'
    },
    cart: {
      items: 23,
      total: '79.89'
    },
    exclusiveDeals: [
      {
        image: '/img/deals/burgers.jpg',
        alt: 'Chef Burgers London',
        discount: '-40%',
        type: 'Restaurant',
        name: 'Chef Burgers London'
      },
      {
        image: '/img/deals/salad.jpg',
        alt: 'Grand Ai Cafe London',
        discount: '-20%',
        type: 'Restaurant',
        name: 'Grand Ai Cafe London'
      },
      {
        image: '/img/deals/sandwich.jpg',
        alt: 'Butterbrot Cafe London',
        discount: '-17%',
        type: 'Restaurant',
        name: 'Butterbrot Cafe London'
      }
    ],
    categories: [
      { image: '/img/burgers.jpg', name: 'Burgers & Fast food', count: 21 },
      { image: '/img/salads.jpg', name: 'Salads', count: 32 },
      { image: '/img/pasta.jpg', name: 'Pasta & Casuals', count: 4 },
      { image: '/img/pizza.jpg', name: 'Pizza', count: 32 },
      { image: '/img/breakfast.jpg', name: 'Breakfast', count: 4 },
      { image: '/img/soups.jpg', name: 'Soups', count: 32 }
    ],
    restaurants: [
      { image: '/img/restaurants/mcdonalds.jpg', name: "McDonald's London" },
      { image: '/img/restaurants/papajohns.jpg', name: "Papa Johns" },
      { image: '/img/restaurants/kfc.jpg', name: "KFC West London" },
      { image: '/img/restaurants/texas-chicken.jpg', name: "Texas Chicken" },
      { image: '/img/restaurants/burger-king.jpg', name: "Burger King" },
      { image: '/img/restaurants/shaurma.jpg', name: "Shaurma 1" }
    ],
    statistics: [
      { number: '546+', label: 'Registered Riders' },
      { number: '789,900+', label: 'Orders Delivered' },
      { number: '690+', label: 'Restaurants Partnered' },
      { number: '17,457+', label: 'Food Items' }
    ]
  });
});

// Serve static files - This should come AFTER routes
app.use(express.static(path.join(__dirname, 'src/assets')));

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('index', { 
    title: 'Page Not Found',
    error: '404 - Page Not Found'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`View engine: ${app.get('view engine')}`);
  console.log(`Views directory: ${app.get('views')}`);
  console.log(`Static files: ${path.join(__dirname, 'src/assets')}`);
});