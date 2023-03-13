const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);

const indexRouter = require('./routes/indexRoute');
app.use('/', indexRouter);

const userRouter = require('./routes/userRoute');
app.use('/user', userRouter);

const authRouter = require('./routes/authRoute');
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});