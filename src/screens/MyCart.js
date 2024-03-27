import { useDispatchCart, useCart } from "../components/ContextReducer";
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
    let userEmail = localStorage.getItem("userEmail");
    console.log(data, localStorage.getItem("userEmail"), new Date());
    const response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: dateAndTime,
      }),
    });
    console.log("response: ", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  //   console.log(data);
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
