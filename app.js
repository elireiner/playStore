const express = require('express');
const morgan = require('morgan');
const apps = require('./playStore')

const app = express();
app.use(morgan('dev'));

app.get('/apps', (req, res) => {
    const { sort, genres } = req.query;
    let results = apps;

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res.status(400).send('We can only sort by Rating or App (case sensitive)')
        }
    }

    if (genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res.status(400).send('These are the valid genres: Action, Puzzle, Strategy, Casual, Arcade, Card')
        }
    }

    if (genres) {
        results = apps.filter(app =>
            app.Genres.toLowerCase()
                .includes(genres.toLowerCase())
        )
    }


    if (sort) {
        results = results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : b[sort] > a[sort] ? -1 : 0;
        })
    }

    res.send(results)
})

module.exports = app;