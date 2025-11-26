const products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 50 },
  { id: 2, name: 'Mouse', price: 29.99, category: 'Electronics', stock: 200 }
];

let nextId = 3;

const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;
    let filteredProducts = [...products];
    
    // Search by name
    if (search) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (minPrice) {
      const min = parseFloat(minPrice);
      if (isNaN(min)) {
        return res.status(400).json({ success: false, message: 'Invalid minPrice value' });
      }
      filteredProducts = filteredProducts.filter(p => p.price >= min);
    }
    
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (isNaN(max)) {
        return res.status(400).json({ success: false, message: 'Invalid maxPrice value' });
      }
      filteredProducts = filteredProducts.filter(p => p.price <= max);
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    res.json({ 
      success: true, 
      data: paginatedProducts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredProducts.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  
  res.json({ success: true, data: product });
};

const createProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    
    // Validation
    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Name and price are required' });
    }
    
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({ success: false, message: 'Price must be a positive number' });
    }
    
    const parsedStock = stock ? parseInt(stock) : 0;
    if (isNaN(parsedStock) || parsedStock < 0) {
      return res.status(400).json({ success: false, message: 'Stock must be a non-negative integer' });
    }
    
    // Check for duplicate product name
    const existingProduct = products.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existingProduct) {
      return res.status(409).json({ success: false, message: 'Product with this name already exists' });
    }
    
    const newProduct = {
      id: nextId++,
      name: name.trim(),
      price: parsedPrice,
      category: category?.trim() || 'Uncategorized',
      stock: parsedStock,
      createdAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  
  products[productIndex] = { ...products[productIndex], ...req.body };
  res.json({ success: true, data: products[productIndex] });
};

const deleteProduct = (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  
  products.splice(productIndex, 1);
  res.json({ success: true, message: 'Product deleted successfully' });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
