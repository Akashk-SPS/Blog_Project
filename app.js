const express = require('express')
const path = require('path')
const app = express();
const {sequelize} = require('./models')
const  User = require('./Controller/User')
const userRouter = require('./routes/userRoute')
const BlogRoute = require('./routes/BlogRoute')
const db = require('./connection/db')
const passport = require('passport')
const router = require('./routes/userRoute')
const cors = require('cors')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash')
const { urlencoded } = require('body-parser');
console.log(session , "session")

const SequelizeStore = require('connect-session-sequelize')(session.Store)

require('./config/passportConfig')()
app.use(express.json())

app.use(
  session({
    secret: 'MySession',
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
     db: sequelize,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)


app.use(expressLayouts)
app.use(flash())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.use('/public', express.static(path.resolve(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


 app.get('/user' , (req,res)=>{
   console.log("start")
 });
 app.use(userRouter)
 app.use(BlogRoute)
 //app.use('/auth', router);
// require('./routes')(app)

app.listen(8000, async () =>{
    await db.sync({force : false}).then((data) => {
        console.log("Successfull ")
    }).catch((err) =>{
        console.log("error")
    })
     console.log("server started at 8000")
}) ;

 
