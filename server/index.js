
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
        res.status(201).json({token, userId: generatedUserId, email: emailToLowerCase})

    }catch (err) {
        console.log(err)
    }
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        console.log('Connection init...')
        const database = client.db('app-data')
        console.log('Connected to app-data, done !')
        const users = database.collection('users')

        const returned_db_users = await users.find().toArray()
        res.send(returned_db_users)
    } finally{
        await client.close()
    }
})
app.listen(PORT, () => console.log('Server is running on PORT : ' + PORT))
