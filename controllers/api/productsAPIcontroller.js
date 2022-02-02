const path = require("path");

const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");
const { pbkdf2 } = require("crypto");

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Products = db.product;
const Brands = db.brand;
const Users = db.user;

const productsAPIController = {
  product: (req, res) => {
    const id = req.params.id;

    var product = db.product.findByPk(id, {
      include: [{ association: "brand" }],
    })

      .then((product) => {
        let respuesta = {
          meta: {
            status: 200,
            total: product.length,
            url: "/api/product/:id",
          },
          data: product,
        };
        res.json(respuesta);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });

    // modificar con sequilize
    //const product = products.find((prod) => prod.id == req.params.id);
    //res.render('product', { products, product })
  },

  productList: (req, res) => {
    db.product.findAll({
      //order:[['rating','DESC']],
      include: [{ association: "brand" }],
    })
      .then((products) => {
        let respuesta = {
          meta: {
            status: 200,
            total: products.length,
            url: "/api/products",
          },
          data: products,
        };
        res.json(respuesta);
      })
      //res.render("productSearch", { products, resultsPerPage: 12 })
      //})
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
    //modificar con sequilize
    //res.render('productSearch', { products, resultsPerPage: 12 })
  },

  brandList: (req, res) => {
    db.brand.findAll({})
      .then((brands) => {
        let respuesta = {
          meta: {
            status: 200,
            total: brands.length,
            url: "/api/brands",
          },
          data: brands,
        };
        res.json(respuesta);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
    //modificar con sequilize
    //res.render('productSearch', { products, resultsPerPage: 12 })
  },
  create: (req,res) => {
    db.product.create(
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
                    url: 'api/products/create'
                },
                data:confirm
            }
        }else{
            respuesta ={
                meta: {
                    status: 200,
                    total: confirm.length,
                    url: 'api/products/create'
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
    db.product.update(
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
                    url: 'api/products/update/:id'
                },
                data:confirm
            }
        }else{
            respuesta ={
                meta: {
                    status: 204,
                    total: confirm.length,
                    url: 'api/products/update/:id'
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
    db.product.destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
    .then(confirm => {
        let respuesta;
        if(confirm){
            respuesta ={
                meta: {
                    status: 200,
                    total: confirm.length,
                    url: 'api/products/destroy/:id'
                },
                data:confirm
            }
        }else{
            respuesta ={
                meta: {
                    status: 204,
                    total: confirm.length,
                    url: 'api/products/destroy/:id'
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
