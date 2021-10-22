// Acá nos falta nuestra fuente de datos
let listadoMenu=[{nombre:'Carpaccio fresco',
    descripcion:'Entrada Carpaccio de salmón con cítricos U$S 65.50'},
    
    
    {nombre:'Risotto de berenjena',
    descripcion:'Risotto de berenjena y queso de cabra U$S 47.00'},
    
    
    {nombre:'Mousse de arroz',
    descripcion:'Mousse de arroz con leche y aroma de azahar U$S 27.50'},
    
    
    {nombre:'Espárragos blancos',
    descripcion:'Espárragos blancos con vinagreta de verduras y jamón ibérico U$S 37.50'},
    
    ];
// Acá nos falta un objeto literal con las acciones para cada ruta
let mainController = {index: (req,res)=>{
    res.render('index',{listadoMenu:listadoMenu})
},
detalleMenu: (req,res)=>{
    res.render('detalleMenu')
},

};

// Acá exportamos el resultado

module.exports= mainController;