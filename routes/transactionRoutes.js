const express = require("express");
const { addTransaction, getAllTransaction } = require("../controllers/transactionController");

// router object
const router = express.Router();

// routes
// add transaction POST Method
router.post ('/add-transaction', addTransaction)

// get Transactions
router.get('/get-transaction', getAllTransaction)

module.exports = router;
