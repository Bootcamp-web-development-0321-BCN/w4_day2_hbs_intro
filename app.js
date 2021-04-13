const express = require('express');
const hbs = require('hbs');
const players = require('./players');

const PORT = 3000;
const app = express();

// Middleware & initial setup
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static('public'));

const timeout = (ms) => {
  return (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(players);
      }, ms)
    })
  )
}


// App routes
app.get('/', (req, res) => {
  const data = {
    username: 'Juan',
    hobbies: [
      {
        name: 'Videogames',
        level: 10
      },
      {
        name: 'Football',
        level: 1
      },
      {
        name: 'Coding',
        level: "🥕"
      },
      
    ],
    address: {
      city: 'Barcelona'
    }
  };
  // const renderHobbies = data.hobbies.filter(el => el.level === "🥕");
  // res.render('index', { ...data, hobbies: renderHobbies });
  res.render('index', data);
})

app.get('/players', (req, res) => {
  timeout(3000)
  .then(players => {
    res.render('players', { players });
  })
  .catch(error => console.error(error));
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));