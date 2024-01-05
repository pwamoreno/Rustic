const express = require('express');
const app = express();
const cors = require('cors');
const mongoose =  require('mongoose');
const jwt = require('json-web-token');
const User = require('./models/User');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');


app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect('mongodb://localhost/Rustic');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

const jwtSecret = 'poiuytrewq';

app.get('/test', (req, res) => {
    res.json('test ok')
});

app.post('/register', async(req, res) => {
    const {name, email, password} = req.body
    try{
        const userDoc = await User.create({
            name,
            email,
            password
        });
    
        res.json(userDoc)
    }catch(e){
        res.status(422).json(e)
    }
});

app.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        if(userDoc.password === password){
            jwt.encode(jwtSecret, {email:userDoc.email, id:userDoc._id}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(userDoc)
            })
        }else{
            res.status(422).json('pass not ok')
        }
    }else{
        res.json('not found')
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.decode(jwtSecret, token, async (err, userData) => {
            if(err) throw err;
            const {email, name, _id} = await User.findById(userData.id)
            res.json({email, name, _id})
        })
    }else{
        res.json(null);
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await download.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    })
    res.json(newName);
});

app.listen(4000);