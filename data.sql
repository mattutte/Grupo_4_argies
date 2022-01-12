
USE casaka_db;




/* LOCK TABLES users WRITE;*/

INSERT INTO shopping_cart VALUES (DEFAULT, "tomasheguy@gmail.com", 1, 9206), (DEFAULT, "angeluisq96@gmail.com", 1, 9206), (DEFAULT, "ing.rainero@gmail.com", 1, 9206), (DEFAULT, "deniijang@gmail.com", 1, 9206), (DEFAULT, "hlbortoluzzi@gmail.com", 1, 9206);
INSERT INTO users VALUES ("tomasheguy@gmail.com","$2a$10$P4Y.rnn8NQ9YXbz6DoxEN.SywATZpuSgf2XBx206Oo21SOSrYM8lu","Tomas","Heguy","Argentina","foto-1639325362742.jpeg",1,1), ("angeluisq96@gmail.com","$2a$10$P4Y.rnn8NQ9YXbz6DoxEN.SywATZpuSgf2XBx206Oo21SOSrYM8lu","Angel","Luis","Venezuela","foto-1639325362742.jpeg",1,1), ("ing.rainero@gmail.com","$2a$10$P4Y.rnn8NQ9YXbz6DoxEN.SywATZpuSgf2XBx206Oo21SOSrYM8lu","Matias","Rainero","Argentina","foto-1639325362742.jpeg",1,1), ("deniijang@gmail.com","$2a$10$P4Y.rnn8NQ9YXbz6DoxEN.SywATZpuSgf2XBx206Oo21SOSrYM8lu","Denis","Jang","Argentina","foto-1639325362742.jpeg",1,1),("hlbortoluzzi@gmail.com","$2a$10$P4Y.rnn8NQ9YXbz6DoxEN.SywATZpuSgf2XBx206Oo21SOSrYM8lu","Leandro","Bortoluzzi","Argentina","foto-1639325362742.jpeg",1,1);
INSERT INTO brands VALUES (DEFAULT,"Adidas","Alemania"), (DEFAULT,"Puma","Alemania"), (DEFAULT,"Nike","Estados Unidos"), (DEFAULT,"Asics","Japon"),(DEFAULT,"Umbro","Reino Unido"),(DEFAULT,"Kappa","Italia"),(DEFAULT,"Hummel","Alemania"),(DEFAULT,"Under Armour","Estados Unidos");
INSERT INTO products VALUES (DEFAULT,"Jersey","JUVENTUS 21/22 HOME JERSEY BY ADIDAS",44,"",2018,"Short-sleeve Jersey","Hombre","Entrenamiento","",8401,5461,NULL,NULL,1,0.850,"24hs","Rojo","L","camiseta1.jpeg","","");
INSERT INTO products VALUES (DEFAULT,"Jersey","INTER MILAN 21/22 HOME JERSEY BY NIKE",46,"Camiseta del Inter de Milan",2018,"Short-sleeve Jersey","Hombre","Entrenamiento","",9206,6332,NULL,NULL,1,0.850,"24hs","Azul","L","camiseta2.jpeg","",""), (DEFAULT,"Jersey","JUVENTUS 21/22 HOME JERSEY BY ADIDAS",44,"",2018,"Short-sleeve Jersey","Hombre","Entrenamiento","",8401,5461,NULL,NULL,1,0.850,"24hs","Blanco","L","camiseta1.jpeg","",""), (DEFAULT,"Jersey","INTER MILAN 21/22 HOME JERSEY BY NIKE",46,"Camiseta del Inter de Milan",2018,"Short-sleeve Jersey","Hombre","Entrenamiento","",9206,6332,NULL,NULL,1,0.850,"24hs","Azul","L","camiseta2.jpeg","",""), (DEFAULT,"Jersey","INTER MILAN 21/22 HOME JERSEY BY NIKE",46,"Camiseta del Inter de Milan",2018,"Short-sleeve Jersey","Hombre","Entrenamiento","",9206,6332,NULL,NULL,1,0.850,"24hs","Rojo","L","camiseta4.jpeg","",""), (DEFAULT,"Jersey","ITALY EURO 20/21 HOME JERSEY BY PUMA",45,"Camiseta del Inter de Milan",2018,"Short-sleeve Jersey","Hombre","Entrenamiento","",9206,6332,NULL,NULL,1,0.850,"24hs","Azul","L","camiseta5.jpeg","",""), (DEFAULT,"Jersey","ITALY EURO 20/21 HOME JERSEY BY PUMA",45,"Camiseta del Inter de Milan",2018,"Short-sleeve Jersey","Hombre","Entrenamiento","",9206,6332,NULL,NULL,1,0.850,"24hs","Azul","L","camiseta5.jpeg","","");

