const ExpenseModel = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = new ExpenseModel({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (amount < 0) {
      return res.status(400).json({ message: 'Amount should be positive' });
    }
    await income.save();
    res.status(200).json({ message: 'Expense Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const incomes = await ExpenseModel.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  const {id}=req.params;
  ExpenseModel.findByIdAndDelete(id)
  .then((income)=>{
    res.status(200).json({message:'Expense Deleted'})
  })
  .catch((err)=>{
    res.status(500).json({message:'Server Error'})
  })
}