var mysql = require('mysql2');
var bcrypt = require('bcrypt')
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

//FUNCTIONS

async function userLogin(email, pw) {
    let possibleUserHash = await query(`SELECT hash FROM user where email='${email}'`)
    let isMatch = await bcrypt.compare(pw,possibleUserHash[0].hash)
    if (isMatch){
        return await query(`SELECT user_id,first_name,last_name,email,username,dob,join_date FROM user where email='${email}'`)
    }
    else {
        return false
    }
}

async function getPosts(userid) {
    let querystring = `select * from getposts where user_id =${userid}`
    let followlist = await query(querystring)
    return followlist
}

async function createPost(userid,content) {
    let querystring = `insert into post (user_id,content) values (${userid},'${content}')`
    await query(querystring)
}

(async () => {

    // console.log(await userLogin("aidan.r.christopher@gmail.com","A1dan123"))

})();

module.exports = {userLogin, getPosts, createPost}