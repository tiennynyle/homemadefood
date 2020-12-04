.headers on
.mode column
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Food`;
DROP TABLE IF EXISTS OrderDetail;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS Photo;
DROP TABLE IF EXISTS `Admin`;

CREATE TABLE `Admin` (
    username VARCHAR(55) PRIMARY KEY,
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);

CREATE TABLE User (
	username VARCHAR(55) PRIMARY KEY,
    `password` VARCHAR(255) NOT NULL,
    firstName VARCHAR(55) NOT NULL,
    lastName VARCHAR(55) NOT NULL,
    email VARCHAR (55) NOT NULL,
    dateCreated DATE NOT NULL,
    UNIQUE(email)
);
CREATE TABLE `Food` (
	foodID INTEGER PRIMARY KEY AUTOINCREMENT,
    foodName VARCHAR(255) NOT NULL,
    cuisine VARCHAR(55) NOT NULL,
    category VARCHAR(55) NOT NULL,
    rating DECIMAL (2,1),
    price DECIMAL(6,2) NOT NULL,
    `availability` CHAR(1) NOT NULL,
    sellerUsername VARCHAR(55) NOT NULL,
    FOREIGN KEY (sellerUsername) REFERENCES User (username)  ON DELETE CASCADE


);
CREATE TABLE OrderDetail (
	orderID INTEGER NOT NULL,
    sellerUsername VARCHAR(55) NOT NULL,
    foodID INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    -- totalPrice DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (orderID) REFERENCES Orders (orderID),
    FOREIGN KEY (foodID) REFERENCES Food (foodID) ON DELETE CASCADE,
    FOREIGN KEY (sellerUsername) REFERENCES User (username) ON DELETE CASCADE
);
CREATE TABLE Orders (
    orderID INTEGER PRIMARY KEY AUTOINCREMENT,
    customerUsername VARCHAR(55) NOT NULL,
    dateOrdered DATE NOT NULL,
    FOREIGN KEY (customerUsername) REFERENCES User (username) ON DELETE CASCADE

);
CREATE TABLE Photo (
    photoID INTEGER PRIMARY KEY AUTOINCREMENT,
    foodID INTEGER NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    photoURL VARCHAR(255) NOT NULL,
    FOREIGN KEY (foodID) REFERENCES Food (foodID) ON DELETE CASCADE
);

CREATE TABLE Comment (
    commentID INTEGER PRIMARY KEY AUTOINCREMENT,
    foodID INTEGER NOT NULL,
    username VARCHAR(55) NOT NULL,
    content VARCHAR NOT NULL,
    datePosted DATE NOT NULL,
    FOREIGN KEY (foodID) REFERENCES Food (foodID) ON DELETE CASCADE,
    FOREIGN KEY (username) REFERENCES User (username)  ON DELETE CASCADE
); 

INSERT OR REPLACE INTO User(username,`password`,firstName,lastName, email, dateCreated) VALUES ("tienle14", "tien12345!", "Tien", "Le", "tienle14@gmail.com", "2019-03-03"),("taile0304", "taile123!", "Tai", "Le", "taile0304@gmail.com", "2019-04-04"), ("hadang72", "Hadang12345!", "Ha", "Dang", "hadang72@yahoo.com", "2019-10-04"), ("thaitran78", "thait78090", "Thai", "Tran", "thaitran78@gmail.com", "2019-12-13"), ("annhien2005", "nnhien12376#", "Nhien", "Ton", "annhien890@gmail.com", "2019-12-24"),   ("vinhlang123", "langv71!", "Lang", "Vinh", "vinhlang71@outlook.com", "2020-01-01"), ("johns62", "johnpassword123", "John", "Smith", "johns62@gmail.com", "2020-01-02"), ("katen", "katen123@67", "Kate", "Nathaniel", "katen175@gmail.com", "2020-01-03"), ("annie95", "annie1267!", "Annie", "Jones", "anniejones@yahoo.com", "2020-01-04"), ("momo123", "Password123$", "Mo", "Kim", "mokim@yahoo.com", "2020-01-02"), ("boba789", "Password12345!", "Boba", "Meow", "bobameomeo@yahoo.com", "2020-01-05"), ("shin", "pass1489!", "Shin", "Dang", "shindang@gmail.com", "2020-01-04"), ("taylors", "pass343434!", "Taylor", "Swift", "tw@yahoo.com", "2020-01-06"), ("Gigi", "pass343!", "Gigi", "Hadi", "ghdi@yahoo.com", "2020-01-07"), ("kimkar", "passwordxyz!", "Kim", "Kar", "kimkkar@yahoo.com", "2020-01-08"), ("obama", "password456!", "Oba", "Ma", "obama@yahoo.com", "2020-01-09"), ("mileyc", "passwordmiley!", "Miley", "Cyrus", "miley@yahoo.com", "2020-01-11"), ("jameb18", "jamesbondpass!", "James", "B", "iluve@yahoo.com", "2020-01-12"), ("santaishere", "pass0000!", "Santa", "Clause", "santa12@yahoo.com", "2020-01-18"), ("quanghuynh", "pass09909!", "Quang", "Huynh", "qh@yahoo.com", "2020-01-20"), ("huym", "dfdken!", "Huy", "Bui", "huym@yahoo.com", "2020-01-22"), ("natalieb", "Nataliepass!", "Natalie", "Brown", "nataliebrown@yahoo.com", "2020-01-24"), ("zirari", "pass04494lfl!", "Zineb", "Zirari", "zineb@outlook.com", "2020-02-01"), ("chaubui", "passeele#!", "Chau", "Bui", "chaub@yahoo.com", "2020-02-04"), ("hieubui", "uidkfp$!", "Hieu", "Bui", "hieub123@yahoo.com", "2020-02-05"), ("hoapham123", "password0odfneo!", "Hoa", "Pham", "hoapham@yahoo.com", "2020-02-06"), ("lisa45", "lisapassword12!", "Lisa", "Waitley", "lwaitley@yahoo.com", "2020-02-09") ;
INSERT OR REPLACE INTO Food (foodID, foodName, cuisine,category, rating, price,`availability`, sellerUsername) VALUES (1, "Pho Ga", "Vietnamese", "Meat", 5.0, 10.5, "Y", "taile0304"), (2, "Pad Thai", "Thai", "Meat", 3.0, 11.5, "Y","hadang72"), (3, " Veggie Taco", "Mexican", "Vegetarian", 4.5, 8.5, "Y", "thaitran78"), (4, " Kimchi jigae", "Korean", "Meat", 3.5, 12.5, "Y", "annhien2005"), (5, "Spring roll", "Vietnamese", "Meat", 4.0, 3.0, "Y", "vinhlang123"), (6, "Fried mackerel", "Korean", "Fish", 3.5, 9.5, "Y", "tienle14"), (7, " Mapo tofu", "Chinese", "Vegetarian", 3.8, 8.0, "Y", "katen"), (8, "Meatballs", "Swedish", "Meat", 4.1, 7.0, "Y", "tienle14"), (9, " Vegan ramen", "Japanese", "Vegan", 4.5, 13.5, "Y", "tienle14"), (10, "Meatless burger", "American", "Vegan", 4.5, 11.5, "Y", "taile0304"), (11, "Duck curry", "Thai", "Meat", 5.0, 18.5, "Y", "momo123"), (12, "sushi", "Japanese", "Keto", 4.0, 2.5, "Y", "boba789"), (13, "Kimbap", "Korean", "Meat", 5.0, 12.5, "Y", "shin"), (14, "Pho Bo", "Vietnamese", "Meat", 5.0, 10.5, "Y", "annie95"), (15, "Tiramisu", "Italian", "Dessert", 5.0, 5.5, "Y", "taylors"), (16, "Pasta", "Italian", "Meat", 3.0, 10.5, "Y", "Gigi"), (17, "Panna Cotta", "Italian", "Dessert", 5.0, 7.5, "Y", "Gigi"), (18, "Cannoli", "Italian", "Vegetarian", 4.0, 12.5, "Y", "Gigi"), (19, "Crostata", "Italian", "Meat", 3.8, 9.5, "N", "Gigi"), (20, "Affogato", "Italian", "Dessert", 5.0, 10.5, "N", "mileyc"), (21, "Semifreddo", "Italian", "Dessert", 4.6, 5.5, "N", "jameb18"), (22, "Beef Burrito", "Mexican", "Meat", 2.0, 7.5, "Y", "santaishere"), (23, "Enchiladas", "Mexican", "Meat", 4.0, 10.5, "Y", "quanghuynh"), (24, "Chilaquiles", "Mexican", "Meat", 4.0, 8.5, "N", "quanghuynh"),(25, "Tostadas", "Mexican", "Meat", 3.0, 9.5, "Y", "quanghuynh"), (26, "Butter Chicken", "Indian", "Meat", 5.0, 10.5, "Y", "natalieb"), (27, "Tandoori Chicken", "Indian", "Meat", 4.3, 9.5, "Y", "zirari"), (28, "Rogan Josh", "Indian", "Meat", 4.8, 7.5, "Y", "zirari"), (29, "Chickpea Curry", "Indian", "Vegetarian", 5.0, 8.5, "Y", "taile0304"), (30, "Palak Paneer", "Indian", "Vegan", 4.8, 8.5, "Y", "hoapham123"), (31, "Kaali Daal", "Indian", "Vegan", 4.0, 6.5, "Y", "taile0304"), (32, "Canh chua", "Vietnamese", "Fish", 4.9, 8.5, "Y", "tienle14"), (33, "Com tam", "Vietnamese", "Meat", 3.9, 8.5, "Y", "tienle14"), (34, "Bun dau", "Vietnamese", "Meat", 4.0, 11.5, "Y", "tienle14"), (35, "Jambon-Beurre", "French", "Meat", 4.0, 8.5, "N", "lisa45"), (36, "Cassoulet", "French", "Meat", 4.3, 21.5, "Y", "lisa45"), (37, "Coq au vin", "French", "Meat", 5.0, 19.5, "Y", "tienle14"), (38, "Lamb Chop", "French", "Meat", 5.0, 19.5, "Y", "tienle14"), (39, "Chicken Cordon Bleu", "French", "Meat", 4.0, 18.5, "Y", "taile0304"), (40, "Jjajangmyeon", "Korean", "Meat", 4.0, 14.5, "Y", "taile0304");
INSERT OR REPLACE INTO Orders (orderID, customerUsername, dateOrdered) VALUES (1, "vinhlang123", "2020-02-04"), (2, "katen", "2020-11-02"), (3,"annhien2005", "2020-11-03"), (4, "johns62", "2020-11-04"), (5,"johns62", "2020-11-05"), (6,"obama", "2020-04-05"), (7,"jameb18", "2020-04-06"), (8,"natalieb", "2020-05-05"), (9,"johns62", "2020-06-05"), (10,"hoapham123", "2020-05-06"), (11,"hoapham123", "2020-07-05"), (12,"annhien2005", "2020-07-07"), (13,"chaubui", "2020-08-07"), (14,"chaubui", "2020-09-07"), (15,"annhien2005", "2020-07-08"), (16,"johns62", "2020-07-09"), (17,"annhien2005", "2020-10-07"), (18,"katen", "2020-10-20"), (19,"kimkar", "2020-10-22"), (20,"kimkar", "2020-11-07"), (21,"kimkar", "2020-11-08"), (22,"momo123", "2020-11-09"), (23,"annhien2005", "2020-11-10"), (24,"thaitran78", "2020-12-01"), (25,"annhien2005", "2020-11-07"), (26,"annhien2005", "2020-07-29"), (27,"momo123", "2020-10-07"), (28,"shin", "2020-10-18"), (29,"mileyc", "2020-10-11"), (30,"annhien2005", "2020-01-07"), (31,"shin", "2020-02-07"), (32,"annhien2005", "2020-03-07"), (33,"annhien2005", "2020-04-07"), (34,"taylors", "2020-05-07"), (35,"taylors", "2020-06-07"), (36,"annhien2005", "2020-08-07"), (37,"kimkar", "2020-09-07");
INSERT OR REPLACE INTO OrderDetail (orderID, sellerUsername, foodID, quantity) VALUES (1, "tienle14", 8, 2), (1, "tienle14", 9, 1), (2, "thaitran78", 3, 1), (3, "vinhlang123", 5, 3), (4, "taile0304", 1, 3), (5,"taile0304", 1, 10), (6, "zirari", 27, 1), (6, "zirari", 28, 1), (7, "shin", 13, 2), (8, "taile0304", 39, 10), (9, "tienle14", 32, 2), (10, "taile0304", 29, 1), (11, "lisa45", 35, 3), (12, "lisa45", 36, 1), (13, "taile0304", 10, 5), (14, "taile0304", 10, 8), (15, "santaishere", 22, 1), (16, "momo123", 11, 2), (17, "momo123", 11, 3), (18, "Gigi", 16, 1), (19, "Gigi", 16, 2), (20, "Gigi", 17, 1), (21, "Gigi", 17, 10), (22, "taile0304", 39, 5), (23, "taile0304", 39, 1), (24, "quanghuynh", 23, 1), (24, "quanghuynh", 23, 3), (25, "boba789", 12, 1), (26, "boba789", 12, 2), (27, "Gigi", 18, 1), (28, "Gigi", 18, 2), (29, "Gigi", 18, 3), (30, "taile0304", 29, 1), (31, "tienle14", 38, 10), (32, "tienle14", 38, 1), (33, "tienle14", 38, 1), (34, "taile0304", 1, 1), (35, "taile0304", 1, 15), (36, "taile0304", 1, 18), (37, "taile0304", 1, 1) ;
INSERT OR REPLACE INTO Photo (photoID, foodID, width, height, photoURL) VALUES (1, 1, 500, 250, "https://static.onecms.io/wp-content/uploads/sites/19/2016/01/08/quick-chicken-pho-su.jpg"), (2,1, 500, 250, "https://grubarazzi.com/wp-content/uploads/2020/01/Homemade-Chicken-Pho.jpg"), (3, 2, 700, 500, "https://www.recipetineats.com/wp-content/uploads/2020/01/Chicken-Pad-Thai_9-SQ.jpg"), (4,2,600,400, "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"), (5,7, 600, 400, "https://iamafoodblog.b-cdn.net/wp-content/uploads/2020/08/mapo-tofu-recipe-6154w.jpg"), (6, 3, 600, 400, "https://lovingitvegan.com/wp-content/uploads/2019/02/Vegan-Tacos-15.jpg"), (7,4, 600, 400, "https://www.koreanbapsang.com/wp-content/uploads/2014/03/DSC_5089.jpg"), (8,5,600, 400, "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5265636.jpg"), (9, 6, 600, 400, "https://food-images.files.bbci.co.uk/food/recipes/pan-fried_mackerel_in_a_44819_16x9.jpg"), (10, 8, 600, 400, "https://www.simplyrecipes.com/wp-content/uploads/2014/12/swedish-meatballs-horiz-a-1800.jpg"), (11, 9, 600, 400, "https://www.feastingathome.com/wp-content/uploads/2012/11/vegan-ramen-13.jpg"), (12,10, 600, 400, "https://d279m997dpfwgl.cloudfront.net/wp/2019/05/AP_19123667719470-1000x667.jpg"), (13,11,600,400, "https://static0.thaitable.com/images/recipe/5roast-duck-curry.jpg"), (14,12,600,400,"https://images.japancentre.com/recipes/pics/18/main/makisushi.jpg"), (15,13,600,400,"https://bakingthegoods.com/wp-content/uploads/2018/08/Fruity-Coconut-Kimbap-39.jpg"), (16,14,600,400,"https://www.vietworldkitchen.com/wp-content/uploads/2017/09/6a00d8341ef22f53ef01156f84577b970c-500pi.jpg"), (17,15,600,400, "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/2/4/2/RX-FNM_030111-Sugar-Fix-005_s4x3.jpg.rend.hgtvcom.826.620.suffix/1371597326801.jpeg"), (18,16,600,400, "https://www.bowlofdelicious.com/wp-content/uploads/2020/08/bruschetta-pasta-square.jpg"), (19,17,600,400,"https://images.ctfassets.net/nf38yhm0afx3/7eunxr6tHKHI2gVJp70Tl5/762cc78cfacacd25bacbaf9e8f242d47/R406_Vegane_Kokos-Panna-Cotta_mit_Erdbeeren7.jpg"), (20,18,600,400,"https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1779&h=931&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2013%2F12%2F06%2Fcookie-cannoli-with-coffee-cream-xl-r-200403.jpg"), (21,19,600,400,"https://www.foodnetwork.com/content/dam/images/food/video/0/02/022/0226/0226604.jpg"), (22,20,600,400,"https://s23991.pcdn.co/wp-content/uploads/2016/12/affogato-fp-1.jpg"), (23,21,600,400,"https://www.seriouseats.com/2018/06/20180626-semifreddo-vicky-wasik-12.jpg"), (24,22,600,400,"https://www.tasteandtellblog.com/wp-content/uploads/2008/07/Bean-Sausage-Beef-Burrito-Recipe-tasteandtellblog.com-1.jpg"), (25,23,600,400, "https://www.simplyrecipes.com/wp-content/uploads/2006/04/red-chili-chicken-enchiladas-horiz-b-1700.jpg"), (26,24,600,400,"https://static.onecms.io/wp-content/uploads/sites/9/2020/03/19/chilaquiles-rojos-FT-RECIPE0420-1.jpg"), (27,25,600,400,"https://www.mylatinatable.com/wp-content/uploads/2018/04/Tostadas-1.jpg"), (28,26,600,400,"https://s23209.pcdn.co/wp-content/uploads/2020/02/Butter-Chicken-MeatballsIMG_1081.jpg"),(29,27,600,400,"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/chicken-tandori-1526595014.jpg"), (30,28,600,400,"https://www.whiskaffair.com/wp-content/uploads/2013/10/Mutton-Rogan-Josh-4-1.jpg"), (31,29,600,400,"https://myfoodstory.com/wp-content/uploads/2018/08/Cauliflower-Chickpea-Coconut-Curry-1.jpg"), (32,30,600,400,"https://www.earthboundfarm.com/wp-content/uploads/2019/06/Palak-Paneer.jpg"),(33,31,600,400,"https://cookilicious.com/wp-content/uploads/2019/06/KaliDal-4.jpg"), (34,32,600,400,"https://img-global.cpcdn.com/recipes/bbca36adc50d925b/751x532cq70/canh-chua-ca-d%E1%BB%A9a-recipe-main-photo.jpg"), (35,33,600,400,"https://cdn.foodbeast.com/wp-content/uploads/2018/04/Com-Tam_-2.jpg"), (36,34,600,400,"https://image.shutterstock.com/image-photo/vietnamese-rice-noodle-bun-dau-260nw-1014659812.jpg"), (37,35,600,400,"https://assets.afcdn.com/recipe/20170502/28630_w1024h576c1cx1500cy1000.jpg"),(38,36,600,400,"https://prods3.imgix.net/images/articles/2017_03/Non-featured-Instant-pot-cassoulet-recipe-NEW.jpg"), (39,37,600,400,"https://s23991.pcdn.co/wp-content/uploads/2010/02/coq-au-vin-recipe.jpg"),(40,38,600,400,"https://i2.wp.com/www.primaverakitchen.com/wp-content/uploads/2019/05/Garlic-Buter-Lamb-Chops-Primavera-Kitchen-4-500x500.jpg"),(41,39,600,400,"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/5/7/0/DV0201H_81790_s4x3.jpg.rend.hgtvcom.826.620.suffix/1371589382254.jpeg");
INSERT OR REPLACE INTO Comment (commentID, foodID, username, content, datePosted) VALUES (1, 1, "tienle14", "Best Pho ever! Highly recommend!", "2020-12-02"),(2, 1, "hadang72", "Love this pho!", "2020-12-02"), (3, 3, "taile0304", "Best veggie taco ever!", "2020-12-02"),(4, 3, "thaitran78", "Love this taco!", "2020-12-02"), (5, 1, "annhien2005", "Love this pho so much!", "2020-12-02");
INSERT OR REPLACE INTO `Admin` (username) VALUES ("tienle14");
