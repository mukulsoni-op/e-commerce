import Axios from "axios";
import {
  ADD_TO_CART,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
