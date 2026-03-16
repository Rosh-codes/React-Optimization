import { faker } from '@faker-js/faker'
import { writeFileSync } from 'fs'

const categories = ['Electronics', 'Clothing', 'Books', 'Food', 'Sports', 'Home', 'Beauty', 'Toys']

const brands = {
  Electronics: ['Samsung', 'Sony', 'LG', 'Apple', 'Philips', 'Panasonic'],
  Clothing: ['Zara', 'H&M', 'Nike', 'Adidas', 'Levis', 'Uniqlo'],
  Books: ['Penguin', 'HarperCollins', 'Oxford', 'Scholastic', 'Macmillan'],
  Food: ['Nestle', 'Kraft', 'Heinz', 'Kelloggs', 'Unilever'],
  Sports: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour'],
  Home: ['IKEA', 'Dyson', 'Philips', 'Bosch', 'Tefal'],
  Beauty: ['LOreal', 'Nivea', 'Dove', 'Maybelline', 'Garnier'],
  Toys: ['LEGO', 'Mattel', 'Hasbro', 'Fisher-Price', 'Playmobil']
}

const products = Array.from({ length: 5000 }, (_, i) => {
  const category = categories[i % categories.length]
  const baseStock = faker.number.int({ min: 0, max: 500 })

  const stockHistory = Array.from({ length: 30 }, (_, day) => ({
    day: day + 1,
    stock: Math.max(0, baseStock + faker.number.int({ min: -20, max: 20 }))
  }))

  return {
    id: i + 1,
    name: faker.commerce.productName(),
    category: category,
    price: parseFloat(faker.commerce.price({ min: 1, max: 2000 })),
    rating: parseFloat(faker.number.float({ min: 1, max: 5, fractionDigits: 1 })),
    reviewCount: faker.number.int({ min: 0, max: 5000 }),
    stock: baseStock,
    description: faker.lorem.paragraphs(2),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    brand: faker.helpers.arrayElement(brands[category]),
    weight: parseFloat(faker.number.float({ min: 0.1, max: 30, fractionDigits: 1 })),
    stockHistory: stockHistory
  }
})

writeFileSync('./src/data/products.json', JSON.stringify(products, null, 2))
console.log('Done — 5000 products written to src/data/products.json')