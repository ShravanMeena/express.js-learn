const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');
const { matchedData ,sanitizeBody } = require('express-validator/filter')

const app = express()
app.use('/static', express.static('public'))
app.set('view engine', 'twig')
app.set('views', './Public/views')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
     res.render('index', 
     {title:'Title', message:'Login Form'})
    })

// app.post('/login',urlencodedParser, function (req, res) {
//      res.send('welcome, ' + req.body.username)
//     }) 

app.post('/', urlencodedParser, [
    check('username','Username shoul be email id').trim().isEmail(),
    check('password', 'password must be in 5 characters').trim().isLength({min:5}),
    check('cpassword').custom((value, {req}) => {
        if(value != req.body.password){
            throw new Error('Password confirmation does not match password');     
        }
        return true
    })

], (req, res) => {
    const errors =validationResult(req);
     console.log(errors.mapped())

     if(!errors.isEmpty()){
         const user = matchedData(req)
     res.render('index', {title:'user details', error:errors.mapped(), user:user})
     }else{
         const user = matchedData(req)
         console.log(user)
     res.render('login', {title:'Title', user:user})
     }
    })    

app.listen(3000, () => console.log(`Server Runnning....`))







//     const express=require('express')
//     //const bodyParser = require('body-parser')
//     const app = express()
//     app.use('/static', express.static('public'))
//     app.set('view engine', 'twig')
//     app.set('views', './Public/views')

//     const port = 3000


// //     // create application/x-www-form-urlencoded parser
// //     var urlencodedParser = bodyParser.urlencoded({
// //         extended: false
// //     })

// // //   create application/json parser
// //     var jsonParser = bodyParser.json()


//     app.get('/', (req, res) => {
//         res.render('index', { title: "Login Form",
//         message: 'Enter username and password'
//     });

    
//     // app.post('/', (req, res) => res.render('login', {
//     //     title: "User details",
//     //     username:req.body.username,
//     //     password:req.body.password
//     // }))

//     // app.get('/calculation/:a-:b', (req, res) => res.render('calculation', {
//     //     title: "learnig with youtube",
//     //     sum: parseInt(req.params.a) + parseInt(req.params.b),
//     //     sub: parseInt(req.params.a) - parseInt(req.params.b),
//     //     multi: parseInt(req.params.a) * parseInt(req.params.b),
//     //     divide: parseInt(req.params.a) / parseInt(req.params.b),
//     // }))

//     app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)}