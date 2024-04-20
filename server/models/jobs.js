const db = require('../config/db');
exports.fetchCategory = (con, callback)=>{
    db.query('select * from category order by categoryName', callback)   
}