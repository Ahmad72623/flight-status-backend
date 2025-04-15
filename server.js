const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/flight', async (req, res) => {
    const { flightNumber } = req.query;
    const apiKey = process.env.AVIATION_API_KEY;

    try {
        const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`;
        const response = await axios.get(url);

        const data = response.data.data;
        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Flight not found." });
        }

        res.json(data[0]);
    } catch (err) {
        console.error("API error:", err.message);
        res.status(500).json({ error: "API call failed." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
