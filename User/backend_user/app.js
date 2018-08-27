const mysql = require ('mysql');
const bodyparser = require ('body-parser');
const koneksi = require('cors');
const express = require('express');
const upload = require('express-fileupload');
const crypto = require('crypto');
var secret = 'rahasia';

const app = express();
const dbs = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'rumahouse',
        port: '3306'
    }
);

dbs.connect();

app.use(koneksi());
app.use(upload());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use('/tampungfile', express.static('tampungfile'));

app.post(`/registeruser`, (req,res) =>
{

    var namadepan = req.body.namadepan;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var handphone = req.body.handphone;
    var alamat = req.body.alamat;
    var posted = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
    var encrypted = crypto.createHash('sha256' , secret).update(password).digest('hex');
    var registeruser = `INSERT INTO master_user_admin SET namadepan="${namadepan}",username="${username}",email="${email}",password="${encrypted}",handphone="${handphone}",alamat="${alamat}",waktubuat="${posted}"`;
    dbs.query(registeruser, (err, result) =>
    {
        if (err)
        {
            throw err;
        }
        else
        {
            res.send('Update database sukses')
            console.log("ada data yg masuk db")
        }
    });
});

app.post('/loginuser', (req, res) =>
{
    var id_user = req.body.username;
    var password_user = req.body.password;
    var password_encrypt = crypto.createHash('sha256' , secret).update(password_user).digest('hex');
    
    var getData = 'SELECT * FROM master_user_admin';
    dbs.query(getData, (err,result) =>
    {
        if (err)
        {
            throw err;
        }
        else
        {        
            for(i=0 ; i<result.length ; i++)
            {
                if ((id_user == result[i].username) && (password_encrypt == result[i].password))
                {
                 console.log('Login Sukses')
                 var status = '1';
                 console.log(status);
                 res.send(status);
                 break;
                }
                else if (i === result.length-1)
                {
                 console.log('Login Gagal')
                 var status = '-1';
                 res.send(status);
                 break;
                }
            }
        }
    });
});

var port = 8002;
app.listen(port, () => {
    console.log('Server berjalan di port '+port+' ....')
});

/**Ambil data untuk tampilan Properti baru */
app.get('/getNewProperty', (req, res) => {
    var sql = `SELECT * FROM table_addproduk LIMIT 3`;
    dbs.query(sql, (err, result) => {
        if(err){
            throw err;
        } else {
            res.send(result);
        }
    });
});

/**Ambil data untuk tampilan Properti populer */
app.get('/getPopularProperty', (req, res) => {
    var sql = `SELECT * FROM table_addproduk LIMIT 6`;
    dbs.query(sql, (err, result) => {
        if(err){
            throw err;
        } else {
            res.send(result);
        }
    });
});

app.get('/produkdetail/:id', (req, res) => {
    var id_produk = req.params.id;
    var sql = `SELECT * FROM table_addproduk WHERE id="${id_produk}"`;
    dbs.query(sql, (err, result) => {
        if(err){
            throw err;
        } else {
            res.send(result);
        }
    });
});
app.get('/semuaproduk', (req, res) => {
    var sql = `SELECT * FROM table_addproduk`;
    dbs.query(sql, (err, result) => {
        if(err){
            throw err;
        } else {
            res.send(result);
        }
    });
});

app.post(`/detail_cart`, (req,res) =>
{
var id_user = req.body.id_user;
var harga_produk = req.body.harga_produk;
var id_produk = req.body.id_produk;
var minkuantiti = 1
var sql = `INSERT INTO table_cart SET id_produk="${id_produk}", id_user="${id_user}", kuantitas="${minkuantiti}", total_price="${harga_produk}"`;

dbs.query(sql, (err,result)=>
    {
        if(err)
        {
            throw err;
        }
        else
        {
            res.send("berhasil")
        }
    })
})

app.get('/datacart', (req, res) => {
    var sql = ` SELECT table_cart.id, table_addproduk.posting,  table_addproduk.alamat, table_addproduk.harga,table_addproduk.foto_produk
                FROM table_cart
                JOIN table_addproduk ON table_cart.id_produk=table_addproduk.id`;
    dbs.query(sql, (err, result) => {
        if(err){
            throw err;
        } else {
            res.send(result);
        }
    });
});
app.get('/datacheck', (req, res) => {
    var sql = ` SELECT table_cart.id, table_addproduk.posting, table_addproduk.harga,table_addproduk.foto_produk
                FROM table_cart
                JOIN table_addproduk ON table_cart.id_produk=table_addproduk.id`;
    dbs.query(sql, (err, result) => {
        if(err){
            throw err;
        } else {
            res.send(result);
        }
    });
});

