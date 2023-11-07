const express = require('express');
const morgan = require('morgan');
const candidatesRoutes = require('./routes/candidates.routes');
const rejectedReasonsRoutes = require('./routes/rejectedReasons.routes');
const cors = require('cors');

const app = express();
app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/candidates', candidatesRoutes);
app.use('/api/rejectedReasons', rejectedReasonsRoutes);

module.exports = app;