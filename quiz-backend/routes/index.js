const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();


router.get('/api/data', async (req, res, next) => {
  try {
      const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
      const data = response.data.questions
      res.json({ data }); 
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


// async function fetchData(){
//   try{
//     const response = await axios.get('https://api.jsonserve.com/Uw5CrX')
//     console.log(response.data.questions)
//   }
//   catch(err){
//     console.log(err)
//   }
// }
// fetchData();

module.exports = router;
