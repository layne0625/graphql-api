const mysql = require('mysql')
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'typeorm_demo'
});


const excuate = (sql, data) => {
  return new Promise((resolve) => {
    connection.query(sql, data, (err, result) => {
      if (err) {
        console.log(err)
        resolve(null)
      } else {
        resolve(result)
      }
    })
  })
}

connection.query("SELECT * FROM category WHERE level = 2", async (err, result, fields) => {
  if (err) {
    console.log(err)
  } else {
    let i = 0
    while (i < result.length) {
      const { name, id } = result[i]
      try {
        const items = require(`../../../node-crawler/jd-data/item/${name}.json`)
        let j = 0;
        while (j< items.length) {
          const { name, mainImage, images, skus } = items[j]
          const now = new Date()
          const itemResult = await excuate('INSERT INTO goods_item SET ?', { name, mainImage: `https:${mainImage}`, images: JSON.stringify(images), createdAt: now, updatedAt: now })
          if (itemResult) {
            await excuate('INSERT INTO goods_item_categories_category SET ? ', {
              goodsItemId: itemResult.insertId,
              categoryId: id
            })
            const values = skus.map(({ attrs, skuName, skuImage, unit, price, originPrice }) => ([
                JSON.stringify(attrs),
                skuName,
                skuImage,
                unit,
                price,
                originPrice,
                100,
                itemResult.insertId,
                now, 
                now]))
            const skuResult = await excuate('INSERT INTO goods_sku (attrs, name, image, unit, price, originPrice, inventoryQuantity, itemId, createdAt, updatedAt) VALUES ?', [values])
            if (skuResult) {
              console.log('successfully!!!')
            }
          } else {
            
            
          }
          j++
        }
        
      } catch (error) {
        console.log(error)
      }
      i++
    }
    
  }
})