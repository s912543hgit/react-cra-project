import { createContext } from "react";
function calculateTotalPrice(cartList) {
  return cartList
    .map((item) => item.quanity * item.price)
    .reduce((a, b) => a + b, 0);
}

export const cartInit = {
  cartList: [],
};
export const cartReducer = (state, action) => {
  const cartList = [...state.cartList];
  //1.先取得當前購物車目標品項的索引
  const index = cartList.findIndex((item) => item.id === action.payload.id);
  switch (action.type) {
    case "ADD_TO_CART":
      if (index === -1) {
        //還未加入購物車內
        cartList.push(action.payload);
      } else {
        //當前購物車的項目與加入的項目一致
        cartList[index].quanity += action.payload.quanity;
      }

      return {
        ...state,
        cartList,
        total: calculateTotalPrice(cartList),
      };
    case "CHANGE_CART_QUANTITY":
      cartList[index].quanity += action.payload.quanity;
      return {
        ...state,
        cartList,
        total: calculateTotalPrice(cartList),
      };
    case "REMOVE_CART_ITEM":
      cartList.splice(index, 1);
      return {
        ...state,
        cartList,
        total: calculateTotalPrice(cartList),
      };
    default:
      return state;
  }
};
export const CartContext = createContext({});
