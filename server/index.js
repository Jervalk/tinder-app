
const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const {hash} = require("bcrypt");
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

const uri = 'mongodb+srv://jeremy:toto123@cluster0.yo8nv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()

app.get('/', (req, res) => {
    res.json('Hello to you');
})


app.post('/signup',async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } =  req.body
    const generatedUserId =  uuidv4()
    const hashedPassword = await hash(password,10)

    try{
        client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = users.findOne({email})
        if(existingUser) {
            return res.status(409).send('User already exists. Please login')
        }


        const data = {
            user_Id: generatedUserId,
            email: email.toLowerCase(),
            hashed_pwd: hashedPassword
        }
        const post_user = await users.insertOne(data)

        const token = jwt.sign(post_user)

    }finally {
        await client.close

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
