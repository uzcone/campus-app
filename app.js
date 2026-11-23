const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const passport = require('passport');

dotenv.config();

const { sequelize } = require('./models');
const passportConfig = require('./passport');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const coursesRouter = require('./routes/courses');
const assignmentsRouter = require('./routes/assignments');
const activitiesRouter = require('./routes/activities');
const certificatesRouter = require('./routes/certificates');
const indexRouter = require('./routes');

passportConfig();

const app = express();
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    watch: true,
});

sequelize.sync({ force: false })
    .then(() => console.log('데이터베이스 연결 성공'))
    .catch(err => console.error('DB 연결 오류:', err));

app.use(
    morgan('dev'),
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(process.env.SECRET || 'SECRET'),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET || 'SECRET',
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/courses', coursesRouter);
app.use('/assignments', assignmentsRouter);
app.use('/activities', activitiesRouter);
app.use('/certificates', certificatesRouter);
app.use('/', indexRouter);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error('서버 오류:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

if (require.main === module) {
    app.listen(app.get('port'), () => {
        console.log(`서버 실행 중: http://localhost:${app.get('port')}`);
    });
}

module.exports = app;