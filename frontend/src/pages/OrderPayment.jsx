import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function OrderPayment({ orderDetails }) {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const amount = orderDetails.amount;

  const token = localStorage.getItem('token');


  const showOrderPlacedAlert = () => {
    Swal.fire({
      title: "Order has been placed!",
      text: "Thank you for your purchase. Your order will be processed shortly.",
      icon: "success", 
      confirmButtonText: "OK",
      timer: 3000, 
      timerProgressBar: true,
    });
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const savePaymentToDb = async (razorpayRes, amount, orderId, status) => {
    const payment = {
      orderId: orderId,
      amount: amount,
      razorpayPaymentId: razorpayRes ? razorpayRes.razorpay_payment_id : null,
      razorpayOrderId: razorpayRes ? razorpayRes.razorpay_order_id : null,
      razorpaySignature: razorpayRes ? razorpayRes.razorpay_signature : null,
      paymentDateTime: "",
      status: status,
      mobileNumber: mobileNumber,
    }

    const postData = new FormData();
    postData.append("payment", new Blob([JSON.stringify(payment)], { type: "application/json" }));
    postData.append("orderId", orderDetails.id);

    try {
      const res = await axios.post("http://localhost:8080/api/payment", postData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      window.location.href = '/cart';
      showOrderPlacedAlert();
      
    } catch (error) {
      console.error("Error saving payment to DB:", error);
    }
  }

  const getOptionsObject = (order) => {
    return {
      key: "rzp_test_eDsOsv7EhvfzGB",
      amount: order.data.amount,
      currency: order.data.currency,
      name: "Mahendra Nath",
      image: "https://www.svgrepo.com/show/261072/rupee.svg",
      description: "For Testing purpose",
      order_id: order.data.id,
      handler: async (res) => {
        Swal.fire(
          "Payment Successful!",
          `Your Payment Id is : ${res.razorpay_payment_id}`,
          "success"
        );
        console.log("razorpay_payment_id = ", res.razorpay_payment_id);
        console.log("razorpay_order_id = ", res.razorpay_order_id);
        console.log("razorpay_signature = ", res.razorpay_signature);
        
        await savePaymentToDb(res, amount, order.data.id, "Paid");
        

      },
      prefill: {
        name: name,
        contact: mobileNumber,
      },
      notes: {
        address: "This is test note",
      },
      theme: {
        color: "#3399cc",
      },
    };
  };

  const handlePay = async (e) => {
    e.preventDefault();
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      Swal.fire("Error", "Razorpay SDK failed to load. Are you online?", "error");
      return;
    }

    try {
      const order = await axios.post("http://localhost:8080/api/create_payment_order", {
        amount: amount,
      });

      if (order.data.status === "created") {
        console.log("Order Created ", order);
        const options = getOptionsObject(order);
        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response) {
          savePaymentToDb(response, amount, order.data.id, "Failed");
          Swal.fire(
            "Payment Failed",
            `Error Description : ${response.error.description}`,
            "error"
          );
          setName("");
          setMobileNumber("");
        });

        rzp.open();
      } else {
        Swal.fire("Error", "Order Creation Failed. Check backend code", "error");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      Swal.fire("Error", "Failed to create order. Please try again.", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Order Payment</h2>
      <form onSubmit={handlePay} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="mobnum" className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="tel"
            id="mobnum"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded-md"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default OrderPayment;