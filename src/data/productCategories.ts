export interface ProductCategory {
  name: string
  subcategories?: ProductCategory[]
}

export const productCategories: ProductCategory[] = [
  {
    name: "Fruits",
    subcategories: [
      {
        name: "Apples",
        subcategories: [
          { name: "Golden Apple" },
          { name: "Pink Lady Apple" },
          { name: "Red Delicious Apple" },
          { name: "Granny Smith Apple" },
          { name: "Fuji Apple" },
        ],
      },
      {
        name: "Berries",
        subcategories: [
          { name: "Strawberries" },
          { name: "Blueberries" },
          { name: "Blackberries" },
          { name: "Raspberry" },
          { name: "Golden Berries" },
        ],
      },
      {
        name: "Citrus",
        subcategories: [
          { name: "Clementine" },
          { name: "Navel Orange" },
          { name: "Grapefruit" },
          { name: "Lemon" },
          { name: "Lime" },
        ],
      },
      {
        name: "Grapes",
        subcategories: [
          { name: "Red Grapes" },
          { name: "Green Grapes" },
        ],
      },
      {
        name: "Melons",
        subcategories: [
          { name: "Watermelon" },
          { name: "Cantaloupe" },
          { name: "Melon Hami" },
          { name: "Canary Melon" },
          { name: "Honeydew" },
          { name: "Honeydew Golden" },
          { name: "Red Falcon Melon" },
        ],
      },
      {
        name: "Pears",
        subcategories: [
          { name: "Bartlett Pear" },
          { name: "Bosc Pear" },
        ],
      },
      {
        name: "Tropicals",
        subcategories: [
          { name: "Pineapple" },
          { name: "Ataulfo Mango" },
          { name: "Baby Mango" },
          { name: "Passion Fruit" },
          { name: "Granadilla" },
          { name: "Dates" },
        ],
      },
      {
        name: "Stone Fruits",
        subcategories: [
          { name: "Nectarine" },
          { name: "Peach" },
          { name: "Cherries" },
          { name: "White Cherries" },
          { name: "Loquat" },
        ],
      },
      {
        name: "Others",
        subcategories: [
          { name: "Avocado" },
          { name: "Dragon Fruit" },
          { name: "Black Fig" },
          { name: "Kiwi" },
          { name: "Pomegranate" },
          { name: "Cactus Pear" },
          { name: "Quince" },
          { name: "Persimmon" },
        ],
      },
    ],
  },

  {
    name: "Vegetables",
    subcategories: [
      {
        name: "Dry Vegetables",
        subcategories: [
          {
            name: "Potatoes",
            subcategories: [
              { name: "Yellow Potatoes" },
              { name: "Red Potatoes" },
              { name: "Russet Potatoes" },
              { name: "Yukon Mini Potatoes" },
            ],
          },
          {
            name: "Onions",
            subcategories: [
              { name: "Yellow Onions" },
              { name: "Red Onions" },
            ],
          },
          {
            name: "Others",
            subcategories: [
              { name: "Ginger" },
              { name: "Garlic" },
              { name: "Green Beans" },
              { name: "Eggplant" },
              { name: "Artichokes" },
            ],
          },
          {
            name: "Tomatoes",
            subcategories: [
              { name: "Roma Tomatoes" },
              { name: "Grape Tomatoes" },
              { name: "Beefsteak Tomatoes" },
              { name: "Tomato Cherry On The Vine" },
              { name: "Mixed Medley Tomatoes" },
              { name: "Heirloom Tomatoes" },
            ],
          },
          {
            name: "Peppers",
            subcategories: [
              { name: "Green Bell Pepper" },
              { name: "Yellow Bell Pepper" },
              { name: "Red Bell Pepper" },
              { name: "Orange Bell Pepper" },
              { name: "Shepherd Pepper" },
              { name: "Shishito Pepper" },
              { name: "Red Rustico Pepper" },
            ],
          },
        ],
      },
      {
        name: "Wet Vegetables",
        subcategories: [
          { name: "Broccoli Crown" },
          { name: "Spinach" },
          { name: "Celery" },
          { name: "Romaine Lettuce" },
          { name: "Asparagus" },
          { name: "Onion Green" },
          { name: "Bi-Colour Corn" },
          { name: "Radish" },
          { name: "Anise / Fennel" },
          { name: "Sprout Brussels" },
          { name: "French Beans" },
          { name: "Endive Lettuce" },
          { name: "Leeks" },
        ],
      },
    ],
  },

  {
    name: "Organic Fruits",
    subcategories: [
      {
        name: "Apples",
        subcategories: [
          { name: "Golden Apple" },
          { name: "Pink Lady Apple" },
          { name: "Red Delicious Apple" },
          { name: "Granny Smith Apple" },
          { name: "Fuji Apple" },
        ],
      },
      {
        name: "Berries",
        subcategories: [
          { name: "Strawberries" },
          { name: "Blueberries" },
          { name: "Blackberries" },
          { name: "Raspberry" },
        ],
      },
      {
        name: "Citrus",
        subcategories: [
          { name: "Clementine" },
          { name: "Navel Orange" },
          { name: "Grapefruit" },
          { name: "Lemon" },
        ],
      },
      {
        name: "Grapes",
        subcategories: [
          { name: "Red Grapes" },
          { name: "Green Grapes" },
        ],
      },
      {
        name: "Melons",
        subcategories: [
          { name: "Watermelon" },
          { name: "Cantaloupe" },
          { name: "Canary Melon" },
        ],
      },
      {
        name: "Pears",
        subcategories: [
          { name: "Bartlett Pear" },
          { name: "Bosc Pear" },
        ],
      },
      {
        name: "Tropicals",
        subcategories: [
          { name: "Pineapple" },
          { name: "Ataulfo Mango" },
        ],
      },
      {
        name: "Others",
        subcategories: [
          { name: "Nectarine" },
          { name: "Cherries" },
          { name: "Cactus Pear" },
          { name: "Avocado" },
          { name: "Kiwi" },
        ],
      },
    ],
  },

  {
    name: "Organic Vegetables",
    subcategories: [
      {
        name: "Dry Vegetables",
        subcategories: [
          {
            name: "Potatoes",
            subcategories: [
              { name: "Yellow Potatoes" },
              { name: "Red Potatoes" },
              { name: "Russet Potatoes" },
              { name: "Yukon Mini Potatoes" },
            ],
          },
          {
            name: "Onions",
            subcategories: [
              { name: "Yellow Onions" },
              { name: "Red Onions" },
            ],
          },
          {
            name: "Others",
            subcategories: [
              { name: "Green Beans" },
              { name: "Eggplant" },
              { name: "Artichokes" },
            ],
          },
          {
            name: "Tomatoes",
            subcategories: [
              { name: "Grape Tomatoes" },
              { name: "Beefsteak Tomatoes" },
              { name: "Tomato Cherry On The Vine" },
            ],
          },
          {
            name: "Peppers",
            subcategories: [
              { name: "Green Bell Pepper" },
              { name: "Yellow Bell Pepper" },
              { name: "Red Bell Pepper" },
              { name: "Red Rustico Pepper" },
            ],
          },
        ],
      },
      {
        name: "Wet Vegetables",
        subcategories: [
          { name: "Broccoli Crown" },
          { name: "Spinach" },
          { name: "Celery" },
          { name: "Onion Green" },
        ],
      },
    ],
  },
]
