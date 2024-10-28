import supabase from '../lib/supabase';
import express from 'express';

const router = express.Router();
const TABLE_NAME='todo';


con.connect(async (err) => {
  if (err) throw err
  console.log('Connected Success');
})

/* GET home page. */
router.get('/', async function(req, res, next) {
  const { data, error } = await supabase
  .from(TABLE_NAME)
  .select('*')
  .order('created_at')

  if (error) throw new Error(error);
  console.log(data);
  
  res.render('index', { title: 'Express' });
});

module.exports = router;
