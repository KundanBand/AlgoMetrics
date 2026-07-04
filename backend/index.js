const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize cache - standard TTL 10 minutes (600 seconds)
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

// Middleware
app.use(cors());
app.use(express.json());

// Dummy function to simulate fetching data from external APIs (LeetCode/CodeChef)
const fetchPlatformData = async (username, platform) => {
  // In reality, you'd use axios or fetch here to hit the respective platform's APIs
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username,
        platform,
        rating: Math.floor(Math.random() * 1000) + 1200,
        problemsSolved: Math.floor(Math.random() * 500) + 50,
        recentActivity: [
          { date: '2023-10-01', count: 2 },
          { date: '2023-10-02', count: 5 },
          { date: '2023-10-03', count: 1 },
          { date: '2023-10-04', count: 3 },
          { date: '2023-10-05', count: 0 },
          { date: '2023-10-06', count: 4 },
        ]
      });
    }, 500); // Simulate network latency
  });
};

// Caching middleware
const cacheMiddleware = (req, res, next) => {
  const { username, platform } = req.params;
  const key = `${platform}_${username}`;
  
  const cachedData = cache.get(key);
  if (cachedData) {
    console.log(`[Cache Hit] Serving data for ${key}`);
    return res.json({ source: 'cache', data: cachedData });
  }
  
  // Attach key to req to use it in the route handler
  req.cacheKey = key;
  console.log(`[Cache Miss] Fetching fresh data for ${key}`);
  next();
};

// Basic API Route to aggregate user stats
app.get('/api/stats/:platform/:username', cacheMiddleware, async (req, res) => {
  const { username, platform } = req.params;
  
  try {
    const data = await fetchPlatformData(username, platform);
    
    // Store in cache
    cache.set(req.cacheKey, data);
    
    res.json({ source: 'api', data });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch competitive programming stats' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'AlgoMetrics Backend is running.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
