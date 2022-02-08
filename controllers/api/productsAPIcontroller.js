const path = require("path");

const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const productsAPIController = {
  product: (req, res) => {
    const id = req.params.id;

    var product = db.Product.findByPk(id, { //se busca tabla x el alias del modelo
      include: [{ association: "Brand" }],
    })

      .then((product) => {
        console.log(product);
        let respuesta = {
          meta: {
            status: 200,
            total: product.length,
            url: "/api/products/id", // no :id porque en el url va solo el id
          },
          data: {product,
            
          },
          links:{
            profile: "http://localhost:3001/product/detail/"+product.id,
            picture:"file:///Users/tomasheguy/Google%20Drive/TH%20para%20google%20Drive/DigitalHouse/grupo4argies/public/images/"+product.image_main,
          }
          
        };
        res.json(respuesta);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  },

  productList: (req, res) => {
    const products = db.Product.findAll({
      //order:[['rating','DESC']],
      include: [{ association: "Brand" }],
    })
    const productsPerBrand = db.Product.findAll({
      attributes: ["brand_id"],
      //  [sequelize.fn("COUNT", sequelize.col("id"))],],
      group: "brand_id",
    })
    Promise.all([products, productsPerBrand])
      .then((products, productsPerBrand) => {
        console.log(products);
        let respuesta = {
          meta: {
            status: 200,
            total: products.length,
            url: "/api/products/",
            perBrand: productsPerBrand,
          },
          data: {products,
            //details: "https://localhost:3001.com/productDetails/" + products.id
          },
        };
        res.json(respuesta);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  },

  create: (req,res) => {
    db.Product.create(
        {
          name_product: req.body.name,
          category: req.body.category,
          brand_id: req.body.brand,
          description_product: req.body.description,
          year_created: Number(req.body.year),
          features_style: req.body.features_style,
          features_gender: req.body.features_style,
          features_use: req.body.features_style,
          features_others: req.body.features_style,
          regular_price: Number(req.body.regularPrice),
          special_price: Number(req.body.specialPrice),
          returnable: req.body.devolucion == 'on'? 1 : 0,
          delivery_time: req.body.delivery_time,
          weight_package: Number(req.body.weight_package),
          color_available: req.body.color_available,
          size_available: req.body.size_available,
          image_main: req.files.find(file=>file.fieldname == "image-main").filename,
          image_front: req.files.find(file=>file.fieldname == "image-front") ? req.files.find(file=>file.fieldname == "image-front").filename : "",
          image_back: req.files.find(file=>file.fieldname == "image-back") ? req.files.find(file=>file.fieldname == "image-back").filename : ""
        }
    )
    .then(confirm => {
        let respuesta;
        if(confirm){
            respuesta ={
                meta: {
                    status: 200,
                    total: confirm.length,
                    url: 'api/products/create/'
                },
                data:confirm
            }
        }else{
            respuesta ={
                meta: {
                    status: 200,
                    total: confirm.length,
                    url: 'api/products/create/'
                },
                data:confirm
            }
        }
        res.json(respuesta);
    })    
    .catch(error => res.send(error))
},

update: (req,res) => {
    let productId = req.params.id;
    db.Product.update(
        {
          name_product: req.body.name,
          category: req.body.category,
          brand_id: req.body.brand,
          description_product: req.body.description,
          year_created: Number(req.body.year),
          features_style: req.body.features_style,
          features_gender: req.body.features_gender,
          features_use: req.body.features_use,
          features_others: req.body.features_others,
          regular_price: Number(req.body.regularPrice),
          special_price: Number(req.body.specialPrice),
          returnable: req.body.devolucion == 'on'? 1 : 0,
          delivery_time: req.body.delivery_time,
          weight_package: Number(req.body.weight_package),
          color_available: req.body.color_available,
          size_available: req.body.size_available,
          image_main: req.files.find(file=>file.fieldname == "image-main") ? req.files.find(file=>file.fieldname == "image-main").filename : req.body.image_main,
          image_front: req.files.find(file=>file.fieldname == "image-front") ? req.files.find(file=>file.fieldname == "image-front").filename : req.body.image_front,
          image_back: req.files.find(file=>file.fieldname == "image-back") ? req.files.find(file=>file.fieldname == "image-back").filename : req.body.image_back
        },
        {
            where: {id: productId}
    })
    .then(confirm => {
        let respuesta;
        if(confirm){
            respuesta ={
                meta: {
                    status: 200,
                    total: confirm.length,
                    url: 'api/products/update/id'
                },
                data:confirm
            }
        }else{
            respuesta ={
                meta: {
                    status: 204,
                    total: confirm.length,
                    url: 'api/products/update/id'
                },
                data:confirm
            }
        }
        res.json(respuesta);
    })    
    .catch(error => res.send(error))
},
destroy: (req,res) => {
    let productId = req.params.id;
    db.Product.destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
    .then(confirm => {
        let respuesta;
        if(confirm){
            respuesta ={
                meta: {
                    status: 200,
                    total: confirm.length,
                    url: 'api/products/destroy/id'
                },
                data:confirm
            }
        }else{
            respuesta ={
                meta: {
                    status: 204,
                    total: confirm.length,
                    url: 'api/products/destroy/id'
                },
                data:confirm
            }
        }
        res.json(respuesta);
    })    
    .catch(error => res.send(error))
}
};

module.exports = productsAPIController;
