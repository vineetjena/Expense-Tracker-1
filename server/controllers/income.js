const IncomeModel = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = new IncomeModel({
    title,
    amount,
    category,
    description,
    date,
  })

  try {
    if(!title ||!category || !description || !date ){
      return res.status(400).json({message:'All fields are required'})
    }
    if(amount<0){
      return res.status(400).json({message:"Amount should be positive"})
    }
    await income.save();
    res.status(200).json({ message: "Income Added" });
  }
  catch (error) {
    res.status(500).json("Internal Server Error");
  }
 console.log(income);
};

exports.getIncomes=async(req,res) =>{
  try{
    const incomes=await IncomeModel.find().sort({createdAt:-1})
    res.status(200).json(incomes)
  }
  catch(error){
    res.status(500).json({message:'Server Error'})
  }
}

exports.deleteIncome=async(req,res) =>{
  const {id}=req.params;
  IncomeModel.findByIdAndDelete(id)
  .then((income)=>{
    res.status(200).json({message:'Income Deleted'})
  })
  .catch((err)=>{
    res.status(500).json({message:'Server Error'})
  })
}
