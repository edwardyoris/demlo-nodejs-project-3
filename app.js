const express = require('express');

// routes
const { usersRouter } = require('./routes/user.routes');
const { restaurantRouter } = require('./routes/restaurant.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { orderRouter } = require('./routes/orders.routes');
const { reviewRouter } = require('./routes/reviews.routes');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Init Express
const app = express();

app.use(express.json());

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/reviews', reviewRouter);

// Global error handler
app.use(globalErrorHandler);

// Cath non-existing endpoints
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `${req.method} ${req.url} does not exists in our server`,
    });
});

module.exports = { app };