
import { ProductDB } from '../models/ProductMode.js';

// ......................................GET ALL PRODUCTS....................................................

export const getAllProducts = async (req, res) => {
  try {
    let query = {};
    if(!req.user || req.user && !req.user.isAdmin){
        query.isBlocked = false;
    }
    const products = await ProductDB.find(query);
    if (!products.length) {
     return res.status(404).json({ message: `No products found` });
    } else {
      res.status(200).json({ message: `Products fetched successfully`, products });
    }
  } catch (error) {
    console.error(`Error in get all products`, error.message);
    res.status(500).json({
      message: `Internal Server Error: Couldn't fetch products`,
      error: error.message
    });
  }
};

// ......................................GET NON BLOCKED PRODUCTS.................................................

// export const getNonBlockedProducts = async (req, res) => {
//   try {
//     const products = await ProductDB.find({ isBlocked: false });
//     if (!products) {
//       res.status(404).json({ message: `No products found` });
//     } else {
//       res.status(200).json({ message: `Products fetched successfully`, products });
//     }
//   } catch (error) {
//     console.error(`Error getting non blocked products`, error.message);
//     res.status(500).json({ message: `Internal Server Error: Couldn't fetch products` });
//   }
// };

// ......................................ADD NEW PRODUCT.................................................

export const createProduct = async (req, res) => {
    console.log(req.body)
  try {
    const { productName, imageUrl, description, price, category, quantity } = req.body;

    const newProduct = new ProductDB({
      productName,
      imageUrl,
      description,
      price,
      category,
      quantity
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding new product', error.message);
    res.status(500).json({
      message: `Internal Server Error: Couldn't add new product`,
      error: error.message
    });
  }
};

// ................................................UPDATE PRODUCT............................................

export const updateProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    const { productName,imageUrl, description,  price, category, quantity } = req.body;
    console.log(imageUrl,'img url')

    const product = await ProductDB.findById(_id);
    if (!product) {
      res.status(404).json({ message: `Product not found` });
    } else {
      product.set({
        productName,
        imageUrl,
        description,
        price,
        category,
        quantity
      });

      const response = await product.save();
      res.status(200).json({ message: 'Product updated successfully', product: response });
    }
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error: Couldn't update product",
      error: error.message
    });
  }
};

// ...............................................UPDATE PRODUCT QUANTITY..........................................

export const updateProductQuantity = async (req, res) => {
  try {
    const { _id } = req.params;
    const { quantity } = req.body;

    const product = await ProductDB.findByIdAndUpdate(_id, { quantity }, { new: true });
    if (!product) {
      res.status(404).json({ message: `Product not found` });
    } else {
      res.status(200).json({ message: 'Product quantity updated successfully', product });
    }
  } catch (error) {
    console.error(`Error updating product quantity: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error: Couldn't update product quantity",
      error: error.message
    });
  }
};

// ......................................GET PRODUCT BY ID.................................................

export const getProductById = async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await ProductDB.findById(_id);
    if (!product) {
      res.status(404).json({ message: `Product not found` });
    } else {
      res.status(200).json({ message: 'Product fetched successfully', product });
    }
  } catch (error) {
    console.error(`Error getting product by ID: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error: Couldn't fetch product",
      error: error.message
    });
  }
};

// ................................................UPDATE PRODUCT STATUS............................................

export const updateProductStatus = async (req, res) => {
    try {
      const { _id } = req.params;
      const product = await ProductDB.findById(_id);
      if (!product) {
        res.status(404).json({ message: `Product not found` });
      } else {
        product.isBlocked = !product.isBlocked;
        const response = await product.save();
        res.status(200).json({
          message: `Product is ${product.isBlocked ? 'blocked' : 'unblocked'} successfully`,
          product: response
        });
      }
    } catch (error) {
      console.error(`Error updating product status: ${error.message}`);
      res.status(500).json({
        message: "Internal Server Error: Couldn't update product status",
        error: error.message
      });
    }
  };




// ...............................................ADD RATING AND REVIEW..........................................

export const addRatingAndReview = async (req, res) => {
  try {
    const { _id } = req.params;
    const { rating, review } = req.body;

    console.log(req.user,'req use')
    if(!req.user){
      return  res.status(400).json({message:'Please Log In!'})
    }


    const product = await ProductDB.findById(_id);
    if (!product) {
      res.status(404).json({ message: `Product not found` });
    } else {
      const reviewData = { user:req.user, rating, review };
      product.reviews.push(reviewData);
      const updatedProduct = await product.save();
      res.status(200).json({ message: 'Review added successfully', product: updatedProduct });
    }
  } catch (error) {
    console.error(`Error adding rating and review: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error: Couldn't add rating and review",
      error: error.message
    });
  }
};

// ................................................BLOCK REVIEW............................................

export const blockReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await ProductDB.findById(productId);
    if (!product) {
      res.status(404).json({ message: `Product not found` });
    } else {
      const review = product.reviews.id(reviewId);
      if (!review) {
        res.status(404).json({ message: `Review not found` });
      } else {
        review.isBlocked = true;
        const updatedProduct = await product.save();
        res.status(200).json({ message: 'Review blocked successfully', product: updatedProduct });
      }
    }
  } catch (error) {
    console.error(`Error blocking review: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error: Couldn't block review",
      error: error.message
    });
  }
};


export const deleteProduct = async (req, res) => {
    try {
      const {_id} = req.params;
      const deletedProduct = await ProductDB.findByIdAndDelete({_id});
      if (!deletedProduct) {
        return res.status(404).json({message: 'Product not found'});
      }
      res.status(200).json({message: 'Product removed successfully'});
    } catch (error) {
      console.error(`Error in remove product: ${error.message}`);
      return res
        .status(500)
        .json({message: 'Internal Server Error', error: error.message});
    }
  };
