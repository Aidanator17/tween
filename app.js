const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const session = require("express-session");
const passport = require("./middleware/passport");
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(expressLayouts);
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require('./routes/indexRoute');
app.use('/', indexRouter);

const userRouter = require('./routes/userRoute');
app.use('/user', userRouter);

const authRouter = require('./routes/authRoute');
app.use('/auth', authRouter);

const adminRouter = require('./routes/adminRoute');
app.use('/admin', adminRouter);

// app.use((req,res,next)=>{
//   console.log(req.session)
//   next()
// })

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});