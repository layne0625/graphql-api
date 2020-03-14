const mysql = require('mysql')
const category = require('../../../node-crawler/jd-data/category.json')
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'typeorm_demo'
});


category.keywordAreas.forEach(item => {
  connection.query('INSERT INTO category SET ?', { name: item.areaName, level: 0 } , function (error0, level0Result, fields) {
    if (error0) throw error0;
    item.level1words && item.level1words.forEach(level1 => {
      connection.query('INSERT INTO category SET ?', { name: level1.keyword, level: 1, parentId: level0Result.insertId }, function (error1, level1Result, fields) {
        if (error1) throw error1;
        const level2Arr = level1.level2words.map(level2 => [level2.keyword, 2, level1Result.insertId, `http:${level2.imageUrl}`])
        connection.query('INSERT INTO category (name, level, parentId, image) VALUES ?', [level2Arr], (error2) => {
          if (error2) throw error2
          console.log('success')
        })
      });
    })
  });
})

