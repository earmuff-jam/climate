

BEGIN;

SET SEARCH_PATH = 'climate';
SET ROLE = 'climate_admin';
SET SCHEMA 'climate';

INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Fine salt', 'Fine salt', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Black peppercorns', 'Black peppercorns', '80', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Extra virgin olive oil', 'Extra virgin olive oil', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Vegetable oil', 'Vegetable oil', '160', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Apple cider vinegar', 'Apple cider vinegar', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Red wine vinegar', 'Red wine vinegar', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Balsamic or sherry vinegar', 'Balsamic or sherry vinegar', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Rice vinegar (unseasoned)', 'Rice vinegar (unseasoned)', '120', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Nice Kitchen hutch with baking ingredients on display in glass jars - alchemy style',
        'Nice Kitchen hutch with baking ingredients on display in glass jars - alchemy style', '60', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('nedjelly', 'nedjelly', '0', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Flour: all purpose whole wheat or pastry', 'Flour: all purpose whole wheat or pastry', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Baking soda', 'Baking soda', '80', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Baking powder', 'Baking powder', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Cream of tartar', 'Cream of tartar', '160', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Cocoa powder (unsweetened)', 'Cocoa powder (unsweetened)', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Chocolate: chips or bar', 'Chocolate: chips or bar', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Evaporated milk', 'Evaporated milk', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Pure vanilla extract', 'Pure vanilla extract', '120', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Sweeteners', 'Sweeteners', '60', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Granulated sugar', 'Granulated sugar', '0', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Confectioners sugar', 'Confectioners sugar', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Brown sugar', 'Brown sugar', '80', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Maple syrup', 'Maple syrup', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Honey', 'Honey', '160', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Agave syrup', 'Agave syrup', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Drinks', 'Drinks', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Coffee', 'Coffee', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Tea', 'Tea', '120', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Rice and Grains', 'Rice and Grains', '60', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Long-grain white rice', 'Long-grain white rice', '0', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Brown rice', 'Brown rice', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Grains: bulgur quinoa couscous or farro', 'Grains: bulgur quinoa couscous or farro', '80', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Pasta: standard whole grain rice noodles or egg noodles',
        'Pasta: standard whole grain rice noodles or egg noodles', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Polenta', 'Polenta', '160', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Breadcrumbs: plain or panko', 'Breadcrumbs: plain or panko', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Snacks and Cereals', 'Snacks and Cereals', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Crackers', 'Crackers', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Tortillas', 'Tortillas', '120', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Cookies or biscuits', 'Cookies or biscuits', '60', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Pretzels', 'Pretzels', '0', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Marshmallows', 'Marshmallows', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Popcorn kernels', 'Popcorn kernels', '80', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Dried fruit: raisins apricots or cherries', 'Dried fruit: raisins apricots or cherries', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Seeds: sunflower chia or hemp', 'Seeds: sunflower chia or hemp', '160', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Peanut butter or almond butter', 'Peanut butter or almond butter', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Applesauce', 'Applesauce', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Breakfast cereal', 'Breakfast cereal', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Old-fashioned rolled oats', 'Old-fashioned rolled oats', '120', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Canned Goods', 'Canned Goods', '60', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Chicken broth', 'Chicken broth', '0', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Beans: cannellini chickpeas or black', 'Beans: cannellini chickpeas or black', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Vegetables: hominy corn or green beans', 'Vegetables: hominy corn or green beans', '80', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Olives or capers', 'Olives or capers', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Chiles: chipotles in adobo or pickled jalapenos', 'Chiles: chipotles in adobo or pickled jalapenos', '160',
        '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Salsa', 'Salsa', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Tomatoes', 'Tomatoes', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Tomato paste', 'Tomato paste', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Roasted red peppers', 'Roasted red peppers', '120', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Tuna', 'Tuna', '60', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Anchovy fillets or paste', 'Anchovy fillets or paste', '0', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Dried Herbs and Spices', 'Dried Herbs and Spices', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Bay leaves', 'Bay leaves', '80', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Cajun seasoning', 'Cajun seasoning', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Cayenne pepper', 'Cayenne pepper', '160', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Chile powder', 'Chile powder', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Crushed red pepper', 'Crushed red pepper', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Curry powder', 'Curry powder', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Fennel or dill seed', 'Fennel or dill seed', '120', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Granulated garlic', 'Granulated garlic', '60', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Ground cinnamon', 'Ground cinnamon', '0', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Ground cloves', 'Ground cloves', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Ground cumin', 'Ground cumin', '80', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Ground ginger', 'Ground ginger', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Oregano', 'Oregano', '160', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Paprika: sweet and smoked', 'Paprika: sweet and smoked', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Rosemary', 'Rosemary', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Sesame seeds', 'Sesame seeds', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Thyme', 'Thyme', '120', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Whole nutmeg', 'Whole nutmeg', '60', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Dairy and Eggs', 'Dairy and Eggs', '0', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Milk', 'Milk', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Plain yogurt: regular or Greek', 'Plain yogurt: regular or Greek', '80', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Unsalted butter', 'Unsalted butter', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Cheddar or mozzarella', 'Cheddar or mozzarella', '160', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Goat cheese', 'Goat cheese', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Parmesan (wedge)', 'Parmesan (wedge)', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Eggs', 'Eggs', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Fresh Produce', 'Fresh Produce', '120', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Apples', 'Apples', '60', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Avocados', 'Avocados', '0', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Bananas', 'Bananas', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Bell peppers', 'Bell peppers', '80', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Broccoli or cauliflower', 'Broccoli or cauliflower', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Carrots', 'Carrots', '160', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Celery', 'Celery', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Lemons', 'Lemons', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Limes', 'Limes', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Leafy greens: spinach kale or chard', 'Leafy greens: spinach kale or chard', '120', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Lettuce: romaine Boston or mixed greens', 'Lettuce: romaine Boston or mixed greens', '60', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Cilantro', 'Cilantro', '0', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Flat-leaf parsley', 'Flat-leaf parsley', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Scallions', 'Scallions', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Garlic', 'Garlic', '160', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Ginger', 'Ginger', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Potatoes: sweet white or new', 'Potatoes: sweet white or new', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Onions', 'Onions', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Tomatoes: grape cherry or seasonal beefsteak', 'Tomatoes: grape cherry or seasonal beefsteak', '120', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Condiments', 'Condiments', '60', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Jelly jam or preserves', 'Jelly jam or preserves', '0', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Ketchup', 'Ketchup', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Mayonnaise', 'Mayonnaise', '80', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Mustard: Dijon or whole grain', 'Mustard: Dijon or whole grain', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Pickles', 'Pickles', '160', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Hot sauce: Tabasco Sriracha or sambal', 'Hot sauce: Tabasco Sriracha or sambal', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Worcestershire sauce', 'Worcestershire sauce', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Soy sauce or tamari', 'Soy sauce or tamari', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Asian fish sauce', 'Asian fish sauce', '120', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Toasted sesame oil', 'Toasted sesame oil', '60', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Ground beef  ground turkey or Italian sausage', 'Ground beef  ground turkey or Italian sausage', '0', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Boneless  skinless chicken breasts', 'Boneless  skinless chicken breasts', '140', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Bacon', 'Bacon', '80', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Bread: baguette or sandwich bread', 'Bread: baguette or sandwich bread', '20', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Vegetables: peas  chopped spinach or corn', 'Vegetables: peas  chopped spinach or corn', '160', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Fruit: berries peaches or mangos', 'Fruit: berries peaches or mangos', '100', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Nuts: almonds  walnuts or pecans', 'Nuts: almonds  walnuts or pecans', '40', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Dough: pizza  pie or puff pastry', 'Dough: pizza  pie or puff pastry', '180', '1');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Vanilla ice cream', 'Vanilla ice cream', '120', '1');

INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Wrench', 'Wrench', '140', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Paint Cans', 'Paint Cans', '80', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('Ladder', 'Ladder', '20', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('hose', 'hose', '160', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('garbage cans', 'garbage cans', '100', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('motor oil', 'motor oil', '40', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('gloves', 'gloves', '180', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('toolbox', 'toolbox', '120', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('flower pots', 'flower pots', '60', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('nails', 'nails', '0', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('screws', 'screws', '140', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('pet stuffs', 'pet stuffs', '80', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('pest removal', 'pest removal', '20', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('basketball', 'basketball', '160', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('glass cleaner', 'glass cleaner', '100', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('dustpan', 'dustpan', '40', '2');
INSERT INTO item(item_name, item_description, category_id, created_by, sharable_groups)
VALUES ('newspaper', 'newspaper', '180', '2');

INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Frying Pan', 'Frying Pan', '140', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Non-Stick Skillet', 'Non-Stick Skillet', '80', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Sauce Pan', 'Sauce Pan', '20', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Wok', 'Wok', '160', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Large Stockpot', 'Large Stockpot', '100', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Roasting Pan', 'Roasting Pan', '40', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Grill pan', 'Grill pan', '180', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Griddle', 'Griddle', '120', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Baking Dishes', 'Baking Dishes', '60', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Baking Sheet Pans', 'Baking Sheet Pans', '0', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Dutch Oven', 'Dutch Oven', '140', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Measuring cups', 'Measuring cups', '80', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Measuring spoons', 'Measuring spoons', '20', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Rolling pin', 'Rolling pin', '160', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Wisk', 'Wisk', '100', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Tongs', 'Tongs', '40', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Spatula ', 'Spatula ', '180', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Bottle opener', 'Bottle opener', '120', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Colander', 'Colander', '60', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Ice cube trays', 'Ice cube trays', '0', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Pizza Cutter', 'Pizza Cutter', '140', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Zester', 'Zester', '80', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Vegetable Peeler', 'Vegetable Peeler', '20', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Potato Masher', 'Potato Masher', '160', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Shears ', 'Shears ', '100', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Corning Ware', 'Corning Ware', '40', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cheese Grater', 'Cheese Grater', '180', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Garlic Press', 'Garlic Press', '120', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Mixing Bowls', 'Mixing Bowls', '60', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Set of bowls', 'Set of bowls', '0', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Plates', 'Plates', '140', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Eating utensils ', 'Eating utensils ', '80', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Steak knives', 'Steak knives', '20', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Drawer organizer for utensils ', 'Drawer organizer for utensils ', '160', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Coffee mugs ', 'Coffee mugs ', '100', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Bowls', 'Bowls', '40', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Glasses', 'Glasses', '180', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Wine glasses', 'Wine glasses', '120', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Food trays or a serving platter', 'Food trays or a serving platter', '60', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Parchment paper', 'Parchment paper', '0', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Tinfoil', 'Tinfoil', '140', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Wax paper', 'Wax paper', '80', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Drying rack and drip tray', 'Drying rack and drip tray', '20', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Kitchen scale', 'Kitchen scale', '160', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Can opener', 'Can opener', '100', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Meat thermometer', 'Meat thermometer', '40', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Salad spinner', 'Salad spinner', '180', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Turkey baster', 'Turkey baster', '120', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Pots and pans ', 'Pots and pans ', '60', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cutting board', 'Cutting board', '0', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Baking sheets', 'Baking sheets', '140', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Pizza pan or pizza stone', 'Pizza pan or pizza stone', '80', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Sealable containers ', 'Sealable containers ', '20', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Sharpening rod', 'Sharpening rod', '160', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Splatter guard', 'Splatter guard', '100', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Standing mat', 'Standing mat', '40', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Oven mitts', 'Oven mitts', '180', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cooling wire', 'Cooling wire', '120', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cooling mat', 'Cooling mat', '60', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'French press', 'French press', '0', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Chef’s knife', 'Chef’s knife', '140', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Paring knife', 'Paring knife', '80', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Bread knife', 'Bread knife', '20', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Steak knife set', 'Steak knife set', '160', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Utility knife', 'Utility knife', '100', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Carving knife', 'Carving knife', '40', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Boning knife', 'Boning knife', '180', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Kitchen shears', 'Kitchen shears', '120', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cleaver knife', 'Cleaver knife', '60', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cheese knife set', 'Cheese knife set', '0', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Garbage can', 'Garbage can', '140', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Garbage bags', 'Garbage bags', '80', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Recycling Bags', 'Recycling Bags', '20', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Broom', 'Broom', '160', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Duster', 'Duster', '100', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Magic Eraser', 'Magic Eraser', '40', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Vacuum', 'Vacuum', '180', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Mop', 'Mop', '120', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'i-Robot', 'i-Robot', '60', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cupboard liners', 'Cupboard liners', '0', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Swiffer or duster', 'Swiffer or duster', '140', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Rags', 'Rags', '80', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Microfiber cloths', 'Microfiber cloths', '20', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Windex', 'Windex', '160', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Pot scrubber', 'Pot scrubber', '100', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cling film', 'Cling film', '40', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Ziploc bags', 'Ziploc bags', '180', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Chip clips', 'Chip clips', '120', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Napkins', 'Napkins', '60', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Paper towel', 'Paper towel', '0', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Dishtowels', 'Dishtowels', '140', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Dish soap', 'Dish soap', '80', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Dishrags', 'Dishrags', '20', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Sponge', 'Sponge', '160', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Cleaning gloves', 'Cleaning gloves', '100', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Kitchen fridge magnets', 'Kitchen fridge magnets', '40', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Scrubber', 'Scrubber', '180', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Whiteboard', 'Whiteboard', '120', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Ice cube tray', 'Ice cube tray', '60', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Meal planning sheets', 'Meal planning sheets', '0', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Stepping stool', 'Stepping stool', '140', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Reuse-able straws', 'Reuse-able straws', '80', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Tea Steeper', 'Tea Steeper', '20', '3' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Toothpicks', 'Toothpicks', '160', '3' );

INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Mattress', 'Mattress', '140', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Mattress Protector and/or Mattress Pad', 'Mattress Protector and/or Mattress Pad', '80', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Mattress Foundation (Box Spring)', 'Mattress Foundation (Box Spring)', '20', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Dresser', 'Dresser', '160', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Bedside Table or Lamp', 'Bedside Table or Lamp', '100', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Nightstands', 'Nightstands', '40', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Armoire', 'Armoire', '180', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Dresser/Mirror Combo', 'Dresser/Mirror Combo', '120', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Full Length Mirror or Wall of Mirrors', 'Full Length Mirror or Wall of Mirrors', '60', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Curtains, drapes, and blinds', 'Curtains, drapes, and blinds', '0', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Chair or Ottoman', 'Chair or Ottoman', '140', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Blankets and Pillows', 'Blankets and Pillows', '80', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Pillow, Pillow Cases, and Bed Skirts', 'Pillow, Pillow Cases, and Bed Skirts', '20', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Sheets', 'Sheets', '160', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Duvet Covers', 'Duvet Covers', '100', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Blanket or Quilt', 'Blanket or Quilt', '40', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Closet Organizers and Storage', 'Closet Organizers and Storage', '180', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Shelves or additional storage units for your closet', 'Shelves or additional storage units for your closet', '120', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Shoe Rack', 'Shoe Rack', '60', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Shelf or Storage Unit', 'Shelf or Storage Unit', '0', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Over Head Cabinet or Rack', 'Over Head Cabinet or Rack', '140', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Hangers', 'Hangers', '80', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Under Bed Containers or Bins', 'Under Bed Containers or Bins', '20', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Bedroom Lighting Ideas', 'Bedroom Lighting Ideas', '160', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Halogen', 'Halogen', '100', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Floor Lamp', 'Floor Lamp', '40', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Table Lamp', 'Table Lamp', '180', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Chandelier', 'Chandelier', '120', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Ceiling Fan with Light', 'Ceiling Fan with Light', '60', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Ceiling Light', 'Ceiling Light', '0', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Ceiling Lamp', 'Ceiling Lamp', '140', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Wall Sconce', 'Wall Sconce', '80', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Other Optional Bedroom Items', 'Other Optional Bedroom Items', '20', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Bedroom Rug', 'Bedroom Rug', '160', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'TV', 'TV', '100', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Alarm Clock', 'Alarm Clock', '40', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Candles or Oil Diffuser', 'Candles or Oil Diffuser', '180', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Fresh Flowers', 'Fresh Flowers', '120', '4' );
INSERT INTO item(item_name, item_description, quantity , category_id) VALUES( 'Throw Blanket', 'Throw Blanket', '60', '4' );

SET ROLE = 'climate_admin';
REVOKE ALL ON item FROM climate_tester;
REVOKE ALL PRIVILEGES ON item_id_seq FROM climate_tester;

SET ROLE = 'climate_tester';
END;