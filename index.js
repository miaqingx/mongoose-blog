// import express from 'express';
const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const port = 8080;

// connect to MongoDB
mongoose.connect("mongodb+srv://ehima87:Ephraim1@cluster0.cymq9.mongodb.net/monblogdatabase?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connected to MongoDB");
    const app = express();
    // middleware
app.use(express.json());
// connect routes
app.use('/api', postRoutes);


// start the server
app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
}).catch((err) => {
    console.log(err);
})
// create an express app
