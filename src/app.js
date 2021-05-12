const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')

const port = process.env.PORT || 3000

const app = express()

//Getting path values
const publicPathDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialviewPath = path.join(__dirname, '../templates/partials')

//Set app handled  and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialviewPath)

//Set static directory fetch data
app.use(express.static(publicPathDir))

app.get('', (req, res) => {
    res.render('', {
        title: "Home page",
        name: 'Ganesan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        name: 'Jivesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "about page",
        name: 'Jivesh Ganesan'
    })
})


app.get('/weather', (req, res) => {
    

    if (!req.query.address) {
        return res.send('Please enter the address parameter')
    }

    geocode.getGeoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        geocode.getCordinates(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                address: req.query.address,
                location
            })
        })
    })
})




// app.get('', (req, res) => {

//     res.send('<h1>Hello express!!! </h1> ')

// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name:'Ganesan',
//         age:40
//     },
//     {
//         name:'Jivesh',
//         age:67
//     }
// ])
// })


// app.get('/about', (req, res) => {
//     res.send('Express about !!')
// })

// app.get('/weatherapp', (req, res) => {
//     res.send('Weather app page!!')
// })

app.get('/help/*', (req, res) => {
    res.render('pagenotfound', {
        errormsg: 'Help resource page not found !!'
    })
})


app.get('*', (req, res) => {
    res.render('pagenotfound', {
        errormsg: '404 page not found !!'
    })
})

app.listen(port, () => {
    console.log("Web server is up and running "+ port)
})