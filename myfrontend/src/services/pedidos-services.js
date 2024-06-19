// In services/orderService.js
import axios from 'axios';


export const fetchOrders = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/contractor/');
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching orders:", error);
    throw error; // Re-throw to handle it in the component
  }
};

export default fetchOrders;