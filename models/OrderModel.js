
import mongoose from "mongoose";

const { Schema } = mongoose;
const {ObjectId} = Schema.Types

const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true
  },
  userId: {
    type:ObjectId,
    ref: 'User',
    required: true
  },
  orderDate: {
    type: Date,
    required: true
  },
  items: [{
    productId: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  }
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
