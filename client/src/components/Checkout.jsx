import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_publishable_key');

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (result.error) {
      console.error('[Stripe Error]', result.error);
      setPaymentError(result.error.message);
    } else {
      // Payment successful, handle payment method id
      console.log('[PaymentMethod]', result.paymentMethod);
      // Send result.paymentMethod.id to your server to complete the payment
    }
  };

  return (
    <section>
      <div>
        <button>Go Back</button>
      </div>
      <form onSubmit={handleSubmit}>
        <h1>CHECKOUT</h1>
        <div>
          <h2>BILLING DETAILS</h2>
          <label>Name</label>
          <input type="text" placeholder="John Doe" />
          <label>Email Address</label>
          <input type="email" placeholder="john@example.com" />
          <label>Phone Number</label>
          <input type="tel" placeholder="123-456-7890" />
        </div>
        <div>
          <h2>SHIPPING INFO</h2>
          <label>Your Address</label>
          <input type="text" placeholder="123 Street" />
          <label>ZIP Code</label>
          <input type="text" placeholder="12345" />
          <label>City</label>
          <input type="text" placeholder="City" />
          <label>Country</label>
          <input type="text" placeholder="Country" />
        </div>
        <div>
          <h2>PAYMENT DETAILS</h2>
          <CardElement />
          {paymentError && <div className="error-message">{paymentError}</div>}
          <button type="submit" disabled={!stripe}>Pay Now</button>
        </div>
      </form>
    </section>
  );
}

export default Checkout;