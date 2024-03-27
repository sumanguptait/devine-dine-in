import { useContext, createContext, useReducer } from "react";
const CartStatesContext = createContext();
const CartDispatchContext = createContext();
const reducer = (states, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...states,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE":
      return states.filter((item, index) => index !== action.index);

    case "DROP":
      alert("Thank you!! Your order has been Submitted");

      let empArray = [];
      return empArray;
    case "UPDATE":
      let arr = [...states];
      arr.find((food, index) => {
        if (food.id === action.id) {
          // console.log(
          //   food.qty,
          //   parseInt(action.qty),
          //   action.price + food.price
          // );
          // console.log("arr index " + arr[index]);
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + parseInt(food.qty),
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;

    default:
      console.log("Error in Reducer");
  }
};
export const CartProvider = ({ children }) => {
  const [states, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStatesContext.Provider value={states}>
        {children}
      </CartStatesContext.Provider>
    </CartDispatchContext.Provider>
  );
};
export const useCart = () => useContext(CartStatesContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
