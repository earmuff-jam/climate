BEGIN;

SET ROLE = 'climate_admin';
GRANT ALL ON TABLE item TO climate_tester;
GRANT ALL ON SEQUENCE item_id_seq TO climate_tester;

SET ROLE = 'climate_tester';
SET SEARCH_PATH = 'climate';
SET SCHEMA 'climate';

INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Fine salt', 'Fine salt', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Black peppercorns', 'Black peppercorns', '80', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Extra virgin olive oil', 'Extra virgin olive oil', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Vegetable oil', 'Vegetable oil', '160', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Apple cider vinegar', 'Apple cider vinegar', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Red wine vinegar', 'Red wine vinegar', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Balsamic or sherry vinegar', 'Balsamic or sherry vinegar', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Rice vinegar (unseasoned)', 'Rice vinegar (unseasoned)', '120', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Nice Kitchen hutch with baking ingredients on display in glass jars - alchemy style',
        'Nice Kitchen hutch with baking ingredients on display in glass jars - alchemy style', '60', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('nedjelly', 'nedjelly', '0', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Flour: all purpose whole wheat or pastry', 'Flour: all purpose whole wheat or pastry', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Baking soda', 'Baking soda', '80', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Baking powder', 'Baking powder', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Cream of tartar', 'Cream of tartar', '160', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Cocoa powder (unsweetened)', 'Cocoa powder (unsweetened)', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Chocolate: chips or bar', 'Chocolate: chips or bar', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Evaporated milk', 'Evaporated milk', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Pure vanilla extract', 'Pure vanilla extract', '120', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Sweeteners', 'Sweeteners', '60', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Granulated sugar', 'Granulated sugar', '0', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Confectioners sugar', 'Confectioners sugar', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Brown sugar', 'Brown sugar', '80', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Maple syrup', 'Maple syrup', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Honey', 'Honey', '160', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Agave syrup', 'Agave syrup', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Drinks', 'Drinks', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Coffee', 'Coffee', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Tea', 'Tea', '120', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Rice and Grains', 'Rice and Grains', '60', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Long-grain white rice', 'Long-grain white rice', '0', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Brown rice', 'Brown rice', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Grains: bulgur quinoa couscous or farro', 'Grains: bulgur quinoa couscous or farro', '80', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Pasta: standard whole grain rice noodles or egg noodles',
        'Pasta: standard whole grain rice noodles or egg noodles', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Polenta', 'Polenta', '160', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Breadcrumbs: plain or panko', 'Breadcrumbs: plain or panko', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Snacks and Cereals', 'Snacks and Cereals', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Crackers', 'Crackers', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Tortillas', 'Tortillas', '120', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Cookies or biscuits', 'Cookies or biscuits', '60', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Pretzels', 'Pretzels', '0', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Marshmallows', 'Marshmallows', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Popcorn kernels', 'Popcorn kernels', '80', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Dried fruit: raisins apricots or cherries', 'Dried fruit: raisins apricots or cherries', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Seeds: sunflower chia or hemp', 'Seeds: sunflower chia or hemp', '160', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Peanut butter or almond butter', 'Peanut butter or almond butter', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Applesauce', 'Applesauce', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Breakfast cereal', 'Breakfast cereal', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Old-fashioned rolled oats', 'Old-fashioned rolled oats', '120', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Canned Goods', 'Canned Goods', '60', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Chicken broth', 'Chicken broth', '0', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Beans: cannellini chickpeas or black', 'Beans: cannellini chickpeas or black', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Vegetables: hominy corn or green beans', 'Vegetables: hominy corn or green beans', '80', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Olives or capers', 'Olives or capers', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Chiles: chipotles in adobo or pickled jalapenos', 'Chiles: chipotles in adobo or pickled jalapenos', '160',
        '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Salsa', 'Salsa', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Tomatoes', 'Tomatoes', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Tomato paste', 'Tomato paste', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Roasted red peppers', 'Roasted red peppers', '120', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Tuna', 'Tuna', '60', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Anchovy fillets or paste', 'Anchovy fillets or paste', '0', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Dried Herbs and Spices', 'Dried Herbs and Spices', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Bay leaves', 'Bay leaves', '80', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Cajun seasoning', 'Cajun seasoning', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Cayenne pepper', 'Cayenne pepper', '160', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Chile powder', 'Chile powder', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Crushed red pepper', 'Crushed red pepper', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Curry powder', 'Curry powder', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Fennel or dill seed', 'Fennel or dill seed', '120', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Granulated garlic', 'Granulated garlic', '60', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Ground cinnamon', 'Ground cinnamon', '0', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Ground cloves', 'Ground cloves', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Ground cumin', 'Ground cumin', '80', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Ground ginger', 'Ground ginger', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Oregano', 'Oregano', '160', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Paprika: sweet and smoked', 'Paprika: sweet and smoked', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Rosemary', 'Rosemary', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Sesame seeds', 'Sesame seeds', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Thyme', 'Thyme', '120', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Whole nutmeg', 'Whole nutmeg', '60', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Dairy and Eggs', 'Dairy and Eggs', '0', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Milk', 'Milk', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Plain yogurt: regular or Greek', 'Plain yogurt: regular or Greek', '80', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Unsalted butter', 'Unsalted butter', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Cheddar or mozzarella', 'Cheddar or mozzarella', '160', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Goat cheese', 'Goat cheese', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Parmesan (wedge)', 'Parmesan (wedge)', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Eggs', 'Eggs', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Fresh Produce', 'Fresh Produce', '120', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Apples', 'Apples', '60', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Avocados', 'Avocados', '0', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Bananas', 'Bananas', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Bell peppers', 'Bell peppers', '80', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Broccoli or cauliflower', 'Broccoli or cauliflower', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Carrots', 'Carrots', '160', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Celery', 'Celery', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Lemons', 'Lemons', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Limes', 'Limes', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Leafy greens: spinach kale or chard', 'Leafy greens: spinach kale or chard', '120', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Lettuce: romaine Boston or mixed greens', 'Lettuce: romaine Boston or mixed greens', '60', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Cilantro', 'Cilantro', '0', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Flat-leaf parsley', 'Flat-leaf parsley', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Scallions', 'Scallions', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Garlic', 'Garlic', '160', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Ginger', 'Ginger', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Potatoes: sweet white or new', 'Potatoes: sweet white or new', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Onions', 'Onions', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Tomatoes: grape cherry or seasonal beefsteak', 'Tomatoes: grape cherry or seasonal beefsteak', '120', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Condiments', 'Condiments', '60', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Jelly jam or preserves', 'Jelly jam or preserves', '0', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Ketchup', 'Ketchup', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Mayonnaise', 'Mayonnaise', '80', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Mustard: Dijon or whole grain', 'Mustard: Dijon or whole grain', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Pickles', 'Pickles', '160', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Hot sauce: Tabasco Sriracha or sambal', 'Hot sauce: Tabasco Sriracha or sambal', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Worcestershire sauce', 'Worcestershire sauce', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Soy sauce or tamari', 'Soy sauce or tamari', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Asian fish sauce', 'Asian fish sauce', '120', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Toasted sesame oil', 'Toasted sesame oil', '60', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Ground beef  ground turkey or Italian sausage', 'Ground beef  ground turkey or Italian sausage', '0', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Boneless  skinless chicken breasts', 'Boneless  skinless chicken breasts', '140', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Bacon', 'Bacon', '80', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Bread: baguette or sandwich bread', 'Bread: baguette or sandwich bread', '20', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Vegetables: peas  chopped spinach or corn', 'Vegetables: peas  chopped spinach or corn', '160', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Fruit: berries peaches or mangos', 'Fruit: berries peaches or mangos', '100', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Nuts: almonds  walnuts or pecans', 'Nuts: almonds  walnuts or pecans', '40', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Dough: pizza  pie or puff pastry', 'Dough: pizza  pie or puff pastry', '180', '10');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Vanilla ice cream', 'Vanilla ice cream', '120', '10');

INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Wrench', 'Wrench', '140', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Paint Cans', 'Paint Cans', '80', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('Ladder', 'Ladder', '20', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('hose', 'hose', '160', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('garbage cans', 'garbage cans', '100', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('motor oil', 'motor oil', '40', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('gloves', 'gloves', '180', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('toolbox', 'toolbox', '120', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('flower pots', 'flower pots', '60', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('nails', 'nails', '0', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('screws', 'screws', '140', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('pet stuffs', 'pet stuffs', '80', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('pest removal', 'pest removal', '20', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('basketball', 'basketball', '160', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('glass cleaner', 'glass cleaner', '100', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('dustpan', 'dustpan', '40', '11');
INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('newspaper', 'newspaper', '180', '11');

INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Frying Pan', 'Frying Pan', '140', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Non-Stick Skillet', 'Non-Stick Skillet', '80', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Sauce Pan', 'Sauce Pan', '20', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Wok', 'Wok', '160', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Large Stockpot', 'Large Stockpot', '100', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Roasting Pan', 'Roasting Pan', '40', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Grill pan', 'Grill pan', '180', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Griddle', 'Griddle', '120', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Baking Dishes', 'Baking Dishes', '60', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Baking Sheet Pans', 'Baking Sheet Pans', '0', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Dutch Oven', 'Dutch Oven', '140', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Measuring cups', 'Measuring cups', '80', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Measuring spoons', 'Measuring spoons', '20', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Rolling pin', 'Rolling pin', '160', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Wisk', 'Wisk', '100', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Tongs', 'Tongs', '40', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Spatula ', 'Spatula ', '180', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Bottle opener', 'Bottle opener', '120', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Colander', 'Colander', '60', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Ice cube trays', 'Ice cube trays', '0', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Pizza Cutter', 'Pizza Cutter', '140', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Zester', 'Zester', '80', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Vegetable Peeler', 'Vegetable Peeler', '20', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Potato Masher', 'Potato Masher', '160', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Shears ', 'Shears ', '100', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Corning Ware', 'Corning Ware', '40', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cheese Grater', 'Cheese Grater', '180', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Garlic Press', 'Garlic Press', '120', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Mixing Bowls', 'Mixing Bowls', '60', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Set of bowls', 'Set of bowls', '0', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Plates', 'Plates', '140', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Eating utensils ', 'Eating utensils ', '80', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Steak knives', 'Steak knives', '20', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Drawer organizer for utensils ', 'Drawer organizer for utensils ', '160', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Coffee mugs ', 'Coffee mugs ', '100', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Bowls', 'Bowls', '40', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Glasses', 'Glasses', '180', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Wine glasses', 'Wine glasses', '120', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Food trays or a serving platter', 'Food trays or a serving platter', '60', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Parchment paper', 'Parchment paper', '0', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Tinfoil', 'Tinfoil', '140', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Wax paper', 'Wax paper', '80', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Drying rack and drip tray', 'Drying rack and drip tray', '20', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Kitchen scale', 'Kitchen scale', '160', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Can opener', 'Can opener', '100', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Meat thermometer', 'Meat thermometer', '40', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Salad spinner', 'Salad spinner', '180', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Turkey baster', 'Turkey baster', '120', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Pots and pans ', 'Pots and pans ', '60', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cutting board', 'Cutting board', '0', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Baking sheets', 'Baking sheets', '140', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Pizza pan or pizza stone', 'Pizza pan or pizza stone', '80', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Sealable containers ', 'Sealable containers ', '20', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Sharpening rod', 'Sharpening rod', '160', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Splatter guard', 'Splatter guard', '100', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Standing mat', 'Standing mat', '40', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Oven mitts', 'Oven mitts', '180', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cooling wire', 'Cooling wire', '120', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cooling mat', 'Cooling mat', '60', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'French press', 'French press', '0', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Chef’s knife', 'Chef’s knife', '140', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Paring knife', 'Paring knife', '80', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Bread knife', 'Bread knife', '20', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Steak knife set', 'Steak knife set', '160', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Utility knife', 'Utility knife', '100', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Carving knife', 'Carving knife', '40', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Boning knife', 'Boning knife', '180', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Kitchen shears', 'Kitchen shears', '120', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cleaver knife', 'Cleaver knife', '60', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cheese knife set', 'Cheese knife set', '0', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Garbage can', 'Garbage can', '140', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Garbage bags', 'Garbage bags', '80', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Recycling Bags', 'Recycling Bags', '20', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Broom', 'Broom', '160', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Duster', 'Duster', '100', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Magic Eraser', 'Magic Eraser', '40', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Vacuum', 'Vacuum', '180', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Mop', 'Mop', '120', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'i-Robot', 'i-Robot', '60', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cupboard liners', 'Cupboard liners', '0', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Swiffer or duster', 'Swiffer or duster', '140', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Rags', 'Rags', '80', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Microfiber cloths', 'Microfiber cloths', '20', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Windex', 'Windex', '160', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Pot scrubber', 'Pot scrubber', '100', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cling film', 'Cling film', '40', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Ziploc bags', 'Ziploc bags', '180', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Chip clips', 'Chip clips', '120', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Napkins', 'Napkins', '60', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Paper towel', 'Paper towel', '0', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Dishtowels', 'Dishtowels', '140', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Dish soap', 'Dish soap', '80', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Dishrags', 'Dishrags', '20', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Sponge', 'Sponge', '160', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cleaning gloves', 'Cleaning gloves', '100', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Kitchen fridge magnets', 'Kitchen fridge magnets', '40', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Scrubber', 'Scrubber', '180', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Whiteboard', 'Whiteboard', '120', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Ice cube tray', 'Ice cube tray', '60', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Meal planning sheets', 'Meal planning sheets', '0', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Stepping stool', 'Stepping stool', '140', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Reuse-able straws', 'Reuse-able straws', '80', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Tea Steeper', 'Tea Steeper', '20', '12' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Toothpicks', 'Toothpicks', '160', '12' );

INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Mattress', 'Mattress', '140', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Mattress Protector and/or Mattress Pad', 'Mattress Protector and/or Mattress Pad', '80', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Mattress Foundation (Box Spring)', 'Mattress Foundation (Box Spring)', '20', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Dresser', 'Dresser', '160', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Bedside Table or Lamp', 'Bedside Table or Lamp', '100', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Nightstands', 'Nightstands', '40', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Armoire', 'Armoire', '180', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Dresser/Mirror Combo', 'Dresser/Mirror Combo', '120', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Full Length Mirror or Wall of Mirrors', 'Full Length Mirror or Wall of Mirrors', '60', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Curtains, drapes, and blinds', 'Curtains, drapes, and blinds', '0', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Chair or Ottoman', 'Chair or Ottoman', '140', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Blankets and Pillows', 'Blankets and Pillows', '80', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Pillow, Pillow Cases, and Bed Skirts', 'Pillow, Pillow Cases, and Bed Skirts', '20', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Sheets', 'Sheets', '160', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Duvet Covers', 'Duvet Covers', '100', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Blanket or Quilt', 'Blanket or Quilt', '40', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Closet Organizers and Storage', 'Closet Organizers and Storage', '180', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Shelves or additional storage units for your closet', 'Shelves or additional storage units for your closet', '120', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Shoe Rack', 'Shoe Rack', '60', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Shelf or Storage Unit', 'Shelf or Storage Unit', '0', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Over Head Cabinet or Rack', 'Over Head Cabinet or Rack', '140', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Hangers', 'Hangers', '80', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Under Bed Containers or Bins', 'Under Bed Containers or Bins', '20', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Bedroom Lighting Ideas', 'Bedroom Lighting Ideas', '160', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Halogen', 'Halogen', '100', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Floor Lamp', 'Floor Lamp', '40', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Table Lamp', 'Table Lamp', '180', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Chandelier', 'Chandelier', '120', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Ceiling Fan with Light', 'Ceiling Fan with Light', '60', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Ceiling Light', 'Ceiling Light', '0', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Ceiling Lamp', 'Ceiling Lamp', '140', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Wall Sconce', 'Wall Sconce', '80', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Other Optional Bedroom Items', 'Other Optional Bedroom Items', '20', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Bedroom Rug', 'Bedroom Rug', '160', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'TV', 'TV', '100', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Alarm Clock', 'Alarm Clock', '40', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Candles or Oil Diffuser', 'Candles or Oil Diffuser', '180', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Fresh Flowers', 'Fresh Flowers', '120', '13' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Throw Blanket', 'Throw Blanket', '60', '13' );



SET ROLE = 'climate_admin';
REVOKE ALL ON item FROM climate_tester;
REVOKE ALL PRIVILEGES ON item_id_seq FROM climate_tester;

SET ROLE = 'climate_tester';
END;

-- SELECT grantee, privilege_type
-- FROM information_schema.role_table_grants
-- WHERE table_name = 'item';

-- SELECT "current_user"();
-- INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'SHOULD NOT INSERT', 'newspaper', '180', '11' );
-- TRUNCATE TABLE ITEM;
-- SELECT * FROM ITEM ORDER BY id DESC;