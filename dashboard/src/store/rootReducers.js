import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from "./Reducers/productReducer";
import sellerReducer from "./Reducers/sellerReducer";
import chatReducer from "./Reducers/chatReducer";
import OrderReducer from "./Reducers/OrderReducer";
import PaymentReducer from "./Reducers/PaymentReducer";
import dashboardIndexReducer from "./Reducers/dashboardIndexReducer";
import communityReducer from "./Reducers/communityReducer";
const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  seller: sellerReducer,
  chat: chatReducer,
  order: OrderReducer,
  payment: PaymentReducer,
  dashboardIndex: dashboardIndexReducer,
  community: communityReducer,
};
export default rootReducer;
