require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://job-task-a9522.web.app'
    ],
    credentials: true
}));

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8irzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        //await client.connect();
        // Send a ping to confirm a successful connection
        //await client.db("admin").command({ ping: 1 });
        //console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const db = client.db("taskuDB");
        const tasksCollection = db.collection("tasks");

        app.post('/tasks', async (req, res) => {
            const newTask = req.body;
            const result = await tasksCollection.insertOne(newTask);
            res.send(result);
        })

        app.get("/tasks", async (req, res) => {
            try {
                const category = req.query.category; // Get category from query params
                let query = {}; // Default query (fetch all if no category is specified)

                if (category) {
                    query = { category: category }; // Filter by category if provided
                }

                const result = await tasksCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                res.status(500).send({ error: "Failed to fetch tasks" });
            }
        })

        app.patch('/tasks/:id', async (req, res) => {
            try {
                const result = await tasksCollection.updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: req.body }
                );
                res.json({ message: "Task updated", result });
            } catch (error) {
                res.status(500).json({ message: "Error updating task" });
            }
        })

        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await tasksCollection.deleteOne(query);
            res.send(result);
        })
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);

// Route to test if the server is running
app.get('/', (req, res) => {
    res.send("taskU is running");
});

// Start the server
app.listen(port, () => {
    console.log(`taskU is running on port ${port}`);
});