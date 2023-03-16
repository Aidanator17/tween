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
    // console.log("query function hit!")
    let [rows,fields] = await promisePool.query(q);
    return rows
}

//FUNCTIONS

async function userLogin(identifier, pw) {
    // console.log("userLogin function hit!")
    let possibleUserHash = await query(`SELECT hash FROM user where email='${identifier}'`)
    if (possibleUserHash.length == 0) {
        possibleUserHash = await query(`SELECT hash FROM user where username='${identifier}'`)
        let isMatch = await bcrypt.compare(pw,possibleUserHash[0].hash)
        if (isMatch){
            let output = await query(`SELECT * from nodeuser where username='${identifier}'`)
            return output[0]
        }
        else {
            return false
        }
    }
    else {
        let isMatch = await bcrypt.compare(pw,possibleUserHash[0].hash)
        if (isMatch){
            let output = await query(`SELECT * from nodeuser where email='${identifier}'`)
            return output[0]
        }
        else {
            return false
        }
    }
}

async function getPosts(userid) {
    // console.log("getPosts function hit!")
    let querystring = `select * from getposts where user_id =${userid}`
    let followlist = await query(querystring)
    return followlist
}

async function createPost(userid,content) {
    // console.log("createPost function hit!")
    let querystring = `insert into post (user_id,content) values (${userid},"${content}")`
    await query(querystring)
}

async function getUserById(id) {
    // console.log("getUserById function hit!")
    let output = await query(`select * from nodeuser where id = ${id}`)
    return output[0]
}

async function getUserPostsById(id){
    let posts = await query(`select * from post where user_id = ${id} order by post_id desc`)
    return posts
}

(async () => {
    
    

})();

module.exports = {userLogin, getPosts, createPost, getUserById, getUserPostsById}