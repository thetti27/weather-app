import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Query params:', req.query);
  next();
});

app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    console.log('Searching weather for city:', city);
    
    if (!city) {
      console.log('No city provided');
      return res.status(400).json({ error: 'City parameter is required' });
    }

    if (!API_KEY) {
      console.error('API key not configured');
      return res.status(500).json({ error: 'Weather API key not configured' });
    }

    console.log('Making request to OpenWeather API...');
    console.log('URL:', OPENWEATHER_API_URL);
    console.log('Params:', { q: city, appid: '***', units: 'metric' });

    const response = await axios.get(OPENWEATHER_API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    console.log('Weather data received successfully');
    res.json(response.data);
  } catch (error) {
    console.error('Full error:', error);
    console.error('Error details:', error.response?.data || error.message);
    
    if (error.response) {
      if (error.response.status === 404) {
        res.status(404).json({ error: 'City not found' });
      } else if (error.response.status === 401) {
        res.status(401).json({ error: 'Invalid API key' });
      } else {
        res.status(error.response.status).json({ 
          error: error.response.data.message || 'Error from weather service' 
        });
      }
    } else if (error.request) {
      res.status(500).json({ error: 'Could not reach weather service' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is working!' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log('API Key configured:', API_KEY ? 'Yes' : 'No');
  console.log('API Key value:', API_KEY ? `${API_KEY.substr(0, 4)}...` : 'Not set');
}); 