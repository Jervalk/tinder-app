
const PORT = 8000
const cors = require('cors')

const express = require('express')
const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const uuid = require('uuid')

const uri = 'mongodb+srv://jeremy:toto123@cluster0.yo8nv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json('Hello to you');
})


app.post('/signup',async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } =  req.body

    const generatedUserId =  uuid.v4()
    const hashedPassword = await bcrypt.hash(password,10)

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const findUser = await users.findOne({email})

        if(findUser) {
            return res.status(409).send('User already exists. Please login')
        }

        const emailToLowerCase = email.toLowerCase()

        const data = {
            user_Id: generatedUserId,
            email: emailToLowerCase,
            hashed_pwd: hashedPassword
        }
        const post_user = await users.insertOne(data)

        const token = jwt.sign(post_user, emailToLowerCase, {
            expiresIn   : 60 * 24,
        })
        res.status(201).json({token, userId: generatedUserId})

    }catch (err) {
        console.log(err)
    }
})


app.post('/login', async(req,res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const user = await users.findOne({email})
        const correctPwd = await bcrypt.compare(password, user.hashed_pwd)
        if(user && correctPwd) {
            const token = jwt.sign(user, email, {
                expiresIn   : 60 * 24
            })
            res.status(201).json({token, userId: user.user_Id})
        }
        res.status(400).json('Invalid Credentials')

    } catch (err) {
        console.log(err)
    }
})

app.get('/gendered-users', async (req, res) => {
    const client = new MongoClient(uri)
    const gender = req.query.gender

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = { gender: {$eq: gender} }
        const foundUsers = await users.find(query).toArray()
        res.send(foundUsers)
    } finally{
        await client.close()
    }
})


app.get('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = {user_Id: userId}
        const user = await users.findOne(query)
        res.send(user)
    }finally{
        await client.close()
    }
})


app.put('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_Id: formData.user_Id}
        const update = {
            $set: {
                firstname : formData.firstname,
                dob_day : formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.display_gender,
                gender: formData.gender,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            }
        }
        const insertUser = await users.updateOne(query, update)
        res.send(insertUser)
    } finally {
        await client.close()
    }
})

app.put('/add', async (req, res) => {
    const client = new MongoClient(uri)
    const {userId, matchedUserId} = req.body

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = { user_Id: userId}
        const updateUser = {
            $push: { matches: { user_Id: matchedUserId } }
        }
        const insertNewMatch = await users.updateOne(query, updateUser)
        res.send(insertNewMatch)
        console.log('User matched')
    }finally {
        await client.close()
    }
})


app.listen(PORT, () => console.log('Server is running on PORT : ' + PORT))
