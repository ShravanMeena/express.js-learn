const express = require('express')
const app = express()
app.use('/static', express.static('public'))

const port = 3000

// app.get('/', (req, res) => res.sendFile(__dirname +'/index.html'))

// app.get('/about', function (req, res) {
//   res.send('About is activated')
// })

// app.get('/users/:Id?', function (req, res) {
//     console.log(req.params)
//     if(req.params.Id == undefined){
//         res.send('User All Data Accesses activated')
//     }
//     else{
//         res.send('User activated:  ' + req.params.Id)
//     }
// })

// app.get('/flights/:from?.:to?', function (req, res) {
//     console.log(req.params)
//     res.send('Search for Flights')
// })

//Middelware
var Validation = function(req,res,next) {
    console.log("Validation Midlleware is working")
    next()
}
var userValidation = function (req, res, next) {
    if (req.params.username == 'shinu')
    console.log("userValidation Midlleware is Validated ")
    else
    console.log('Ooops user not exist')
    next()
}

// app.use(Validation) -- ye bhi ek tareeka h globbalyy

app.get('/', Validation,(req, res) => {  //ye tareeka hain locall
    res.send('Welcome To Home')
}) 

app.get('/users/:username?', userValidation,(req, res) => {
    res.send('Welcome To User '+ req.params.username)
}) 


app.listen(port, () => console.log(`runing local host on port:${port}`))