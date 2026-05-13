import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaMariaDb(connectionString!);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Admin & Demo Users
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@aurelia.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: hashedPassword,
      role: "USER",
    },
  });

  // 2. Create Categories
  const men = await prisma.category.create({
    data: { name: "Men", slug: "men", description: "Modern menswear for every occasion." },
  });

  const women = await prisma.category.create({
    data: { name: "Women", slug: "women", description: "Elegant womenswear and luxury apparel." },
  });

  const accessories = await prisma.category.create({
    data: { name: "Accessories", slug: "accessories", description: "The perfect finishing touches." },
  });

  // 3. Create Brands
  const aurelia = await prisma.brand.create({
    data: { name: "Aurelia Signature", slug: "aurelia-signature" },
  });

  const heritage = await prisma.brand.create({
    data: { name: "Heritage Craft", slug: "heritage-craft" },
  });

  // 4. Create Products
  const products = [
    {
      name: "Minimalist Cashmere Blend Coat",
      slug: "minimalist-cashmere-blend-coat",
      description: "A timeless coat crafted from a luxurious cashmere blend. Features a relaxed silhouette, notched lapels, and side pockets. Perfect for layering over winter essentials.",
      price: 249.00,
      stock: 50,
      categoryId: men.id,
      brandId: aurelia.id,
      isFeatured: true,
      images: ["/hero.png"],
      variants: [
        { size: "S", color: "Camel", stock: 10 },
        { size: "M", color: "Camel", stock: 20 },
        { size: "L", color: "Camel", stock: 20 },
      ],
    },
    {
      name: "Silk Evening Gown",
      slug: "silk-evening-gown",
      description: "An ethereal evening gown made from 100% pure silk. Features a bias cut for a flattering drape and delicate spaghetti straps.",
      price: 399.00,
      stock: 25,
      categoryId: women.id,
      brandId: aurelia.id,
      isFeatured: true,
      images: ["/women.png"],
      variants: [
        { size: "XS", color: "Midnight Blue", stock: 5 },
        { size: "S", color: "Midnight Blue", stock: 10 },
        { size: "M", color: "Midnight Blue", stock: 10 },
      ],
    },
    {
      name: "Structured Wool Blazer",
      slug: "structured-wool-blazer",
      description: "A precision-cut blazer in Italian wool. Features padded shoulders and a nipped-in waist for a powerful silhouette.",
      price: 289.00,
      stock: 30,
      categoryId: women.id,
      brandId: heritage.id,
      isNew: true,
      images: ["/hero.png"],
      variants: [
        { size: "S", color: "Black", stock: 10 },
        { size: "M", color: "Black", stock: 15 },
        { size: "L", color: "Black", stock: 5 },
      ],
    },
    {
      name: "Premium Leather Chelsea Boots",
      slug: "premium-leather-chelsea-boots",
      description: "Handcrafted boots in full-grain leather. Features elasticated side gussets and a durable Goodyear-welted sole.",
      price: 189.00,
      stock: 100,
      categoryId: accessories.id,
      brandId: heritage.id,
      images: ["/men.png"],
      variants: [
        { size: "40", color: "Tan", stock: 25 },
        { size: "42", color: "Tan", stock: 50 },
        { size: "44", color: "Tan", stock: 25 },
      ],
    },
    {
      name: "Velvet Cocktail Dress",
      slug: "velvet-cocktail-dress",
      description: "A stunning cocktail dress in plush velvet. Features a sweetheart neckline and a cinched waist.",
      price: 299.00,
      salePrice: 199.00,
      stock: 15,
      categoryId: women.id,
      brandId: aurelia.id,
      images: ["/women.png"],
      variants: [
        { size: "S", color: "Burgundy", stock: 5 },
        { size: "M", color: "Burgundy", stock: 10 },
      ],
    },
    {
      name: "Classic Oxford Shirt",
      slug: "classic-oxford-shirt",
      description: "A staple in every man's wardrobe. Made from breathable cotton with a button-down collar.",
      price: 89.00,
      salePrice: 59.00,
      stock: 80,
      categoryId: men.id,
      brandId: heritage.id,
      images: ["/hero.png"],
      variants: [
        { size: "M", color: "White", stock: 40 },
        { size: "L", color: "White", stock: 40 },
      ],
    },
  ];

  for (const productData of products) {
    const { images, variants, ...rest } = productData;
    const product = await prisma.product.create({
      data: {
        ...rest,
        images: {
          create: images.map((url) => ({ url })),
        },
        variants: {
          create: variants,
        },
      },
    });
    console.log(`Created product: ${product.name}`);
  }

  // 5. Create some Mock Orders
  await prisma.order.create({
    data: {
      userId: customer.id,
      totalAmount: 648.00,
      status: "DELIVERED",
      shippingAddress: "123 Luxury Ave, New York, NY",
      items: {
        create: [
          { productId: (await prisma.product.findFirst({ where: { slug: "minimalist-cashmere-blend-coat" } }))!.id, quantity: 1, price: 249.00 },
          { productId: (await prisma.product.findFirst({ where: { slug: "silk-evening-gown" } }))!.id, quantity: 1, price: 399.00 },
        ],
      },
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
