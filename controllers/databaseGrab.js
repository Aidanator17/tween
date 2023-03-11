var mysql = require('mysql2');
require('dotenv').config();


var pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DB
});
const promisePool = pool.promise();

async function query(q) {
    let [rows,fields] = await promisePool.query(q);
    return rows
}

async function userLogin(email, pw) {
    let querystring = `SELECT * FROM user where email='${email}' and password='${pw}'`
    let output = await query(querystring)
    return output
}

async function getPosts(userid) {
    let querystring = `select * from getposts where user_id =${userid}`
    let followlist = await query(querystring)
    console.log(followlist)

}
// getPosts(1)
(async () => {

    // await userLogin('aidan.r.christopher@gmail.com', 'A1dan123')
    await getPosts(390)
    // console.log("3", x)

    // all of the script.... 

})();