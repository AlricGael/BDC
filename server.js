const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/test-connection', async (req, res) => {
    const { user, password, dbname, host, port } = req.body;

    const client = new Client({
        user: user,
        host: host,
        database: dbname,
        password: password,
        port: port,
    });

    try {
        await client.connect();
        await client.end();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
