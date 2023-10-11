/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const TransactionSchema = new mongoose.Schema({
  fromWallet: Number,
  toWallet: Number,
  network: String,
  sellCoin: Object,
  buyCoin: Object,
});

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

const app = express();
mongoose.set('strictQuery', true);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.get('/getTransactions', async (req, res) => {
  try {
    const transactions = await TransactionModel.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
  }
});

app.post('/add', async (req, res) => {
  try {
    const {
      fromWallet, toWallet, network, sellCoin, buyCoin,
    } = req.body;
    console.dir(req.body);
    const transactionData = {
      fromWallet,
      toWallet,
      network,
      sellCoin,
      buyCoin,
    };
    console.log(transactionData);
    const transaction = await TransactionModel.create(transactionData);

    res.status(201).json(transaction);
  } catch (error) {
    console.log(error);
  }
});

async function start() {
  const port = 4200;
  try {
    await mongoose.connect('mongodb+srv://vercel-admin-user:ds3rRt5ZmBt5BnzC@clusterdefi.h9rojy8.mongodb.net/Transaction?retryWrites=true&w=majority');
    app.listen(port, () => console.log(`Server started on port : ${port}`));
  } catch (error) {
    console.log(error);
  }
}

start();
module.exports = app;
