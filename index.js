const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

// middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mostafa.fk86thc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)


async function run()
{
    try {
        const userCollection = client.db('notary').collection('users')


    app.post('/users', async (req, res) => {
            const user = req.body;
            // console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.get('/user', async (req, res) => {
            const query = {}
            const cursor = userCollection.find()
            const user = await cursor.sort({ createdAt: -1 }).toArray();
            res.send(user);
        })

    }
    finally{
    
    }
}

run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('simple node server Running')
})
app.listen(port, () => {
    console.log(`simple server running on port ${port}`)
})

