import React from "react";
import Swal from "sweetalert2";
import { useDispatchCart, useCart } from "../components/ContextReducer";
import { loadStripe } from "@stripe/stripe-js";
// import { trash } from "../trash.svg";
export default function Cart() {
  let data = useCart();
  let dateAndTime = new Date().toLocaleString();
  // console.log(dateAndTime);
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div className="m-5 w-100 text-center fs-3 text-white">
        The Cart is Empty!!
      </div>
    );
  }

  const handleCheckOut = async () => {
    const stripePromise = loadStripe(
      "pk_test_51QDMcnRtAifqAxFpOdEzk7YcI07jPk2cjUxM86xGPQ9VX6p5mRHa7UzCD0ObxuijUmm1wPKZZtya5McstELMiuMF00dwTvdMDx"
    );
    let userEmail = localStorage.getItem("userEmail");

    if (!userEmail || !data || data.length === 0) {
      console.error("Missing user email or order data.");
      return;
    }

    try {
      const stripe = await stripePromise;

      const response = await fetch(
        "http://localhost:3100/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: data, // Pass cart data
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create checkout session");

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) console.error(result.error);
    } catch (error) {
      console.error("Checkout error:", error.message);
    }
  };
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  console.log("data:", data);
  return (
    <>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive=md">
        <table className="table  table-hover ">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="text-white">
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0 text-white"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            Check Out{" "}
          </button>
        </div>
      </div>
    </>
  );
}
