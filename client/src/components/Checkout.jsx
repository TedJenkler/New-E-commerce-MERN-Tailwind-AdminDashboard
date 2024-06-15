import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import img from "../assets/check.png"
import { Link } from 'react-router-dom';

const stripePromise = loadStripe('your_publishable_key');

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const cart = useSelector((state) => state.shop.cart)
  const [radio, setRadio] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', postal: '', city: '', country: '' })
  const [formErrors, setFormErrors] = useState({});
  console.log(formData)
  console.log(formErrors)

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const deliveryPrice = 50;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleValidate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.postal) errors.postal = "Postal code is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.country) errors.country = "Country is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }
 
  const handleSubmitStripe = async (event) => {
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

  const handleSubmit = () => {
    handleValidate()
    if(formErrors.length === 0) {
      setOrderConfirmed(true);
    }
  }

  return (
    <section className='bg-greywhite pb-24 xl:pt-20 xl:px-40 xl:pb-32'>
      {orderConfirmed ? 
      <div className='absolute bg-white p-8 w-11/12 rounded-lg left-1/2 -translate-x-1/2 top-56 md:w-[70%] md:p-12 xl:w-[37%]'>
        <img className='mb-6 md:mb-8' src={img} alt='check' />
        <p className='text-2xl font-bold  text-black2 tracking-[0.86px] mb-4 md:text-32xl md:tracking-[1.14px] md:mr-40 md:mb-6'>THANK YOU FOR YOUR ORDER</p>
        <p className='text-sbase font-medium text-bordergrey mb-6 md:mb-8'>You will receive an email confirmation shortly.</p>
        <div className='mb-6 md:flex md:w-full md:mb-12'>
          <div className='bg-greywhite rounded-t-lg p-8 pb-6 flex flex-col md:rounded-l-lg md:rounded-r-none md:w-[56%] md:p-6'>
            <div className='flex justify-between pb-3 border-b border-bordergrey/25 mb-3'>
              <div className='flex gap-4'>
                <img className='w-[50px] h-[50px]' src={cart ? cart[0].img : null} alt={cart ? cart[0].name : null} />
                <div className='flex flex-col'>
                  <p className='text-sbase font-bold text-black2'>{cart ? cart[0].name : null}</p>
                  <p className='text-sm font-bold text-bordergrey'>$ {cart ? cart[0].price : null}</p>
                </div>
              </div>
              <div>
                <p className='text-sbase font-bold text-bordergrey'>x{cart ? cart[0].quantity : null}</p>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <p className='text-xs text-bordergrey font-bold tracking-[0.21px]'>and {cart.length} other {cart.length > 1 ? "item(s)" : "item"}</p>
            </div>
          </div>
          <div className='bg-black2 text-white rounded-b-lg pt-4 pb-5 px-6 md:rounded-r-lg md:rounded-l-none md:w-[44%] md:py-10 md:px-6'>
            <p className='text-bordergrey text-sbase font-medium md:mb-2'>GRAND TOTAL</p>
            <p className='text-white text-lg font-bold'>$ {totalPrice + deliveryPrice}</p>
          </div>
        </div>
        <Link to="/" className='bg-darkorange hover:bg-lightorange text-white text-sm font-bold tracking-[1px] w-full block text-center py-4'>BACK TO HOME</Link>
      </div> : null}
      <div className='py-4 px-6 md:pt-12 md:pb-6 md:px-10 xl:pt-0 xl:pb-10'>
        <Link className='hover:text-darkorange' to="/">Go Back</Link>
      </div>
      <div className='xl:flex'>
      <form className='py-4 bg-white mx-6 p-6 rounded-lg mb-8 flex flex-col md:mx-10 md:py-8 md:px-7 xl:w-[65%] xl:m-0'>
        <h1 className='text-28xl font-bold tracking-[1px] text-black2 mb-8 md:text-32xl md:tracking-[1.14px] md:mb-10'>CHECKOUT</h1>
        <div className='flex flex-col md:mb-14'>
          <h2 className='text-darkorange text-sm font-bold tracking-[0.93px] mb-4'>BILLING DETAILS</h2>
          <div className='md:flex md:gap-4'>
            <div className='md:w-1/2'>
              <div className='flex justify-between'>
                <label className={`text-xs font-bold text-black2 tracking-[-0.21px] mb-2 ${formErrors.name ? "text-red" : ""}`}>Name</label>
                <p className='text-xs font-medium tracking-[-0.21px] mb-2 text-red'>{formErrors.name}</p>
              </div>
              <input onChange={handleChange} value={formData.name} name='name' className={`h-14 w-full px-6 py-4 border border-inputborder rounded-lg mb-6 text-sm font-bold tracking-[-0.25px] focus:outline-darkorange ${formErrors.name ? "border-2 border-red" : ""}`} type="text" placeholder="John Doe" />
            </div>
            <div className='md:w-1/2'>
              <div className='flex justify-between'>
                <label className={`text-xs font-bold text-black2 tracking-[-0.21px] mb-2 ${formErrors.email ? "text-red" : ""}`}>Email</label>
                <p className='text-xs font-medium tracking-[-0.21px] mb-2 text-red'>{formErrors.email}</p>
              </div>
              <input onChange={handleChange} value={formData.email} name='email' className={`h-14 w-full px-6 py-4 border border-inputborder rounded-lg mb-6 text-sm font-bold tracking-[-0.25px] focus:outline-darkorange ${formErrors.email ? "border-2 border-red" : ""}`} type="email" placeholder="john@example.com" />
            </div>
          </div>
          <div className='md:flex md:gap-4'>
          <div className='md:w-1/2'>
            <div className='flex justify-between'>
              <label className={`text-xs font-bold text-black2 tracking-[-0.21px] mb-2 ${formErrors.phone ? "text-red" : ""}`}>Phone</label>
              <p className='text-xs font-medium tracking-[-0.21px] mb-2 text-red'>{formErrors.phone}</p>
            </div>
            <input onChange={handleChange} value={formData.phone} name='phone' className={`h-14 w-full px-6 py-4 border border-inputborder rounded-lg mb-6 text-sm font-bold tracking-[-0.25px] focus:outline-darkorange ${formErrors.phone ? "border-2 border-red" : ""}`} type="tel" placeholder="123-456-7890" />
          </div>
          <div className='md:w-1/2'></div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='md:mb-16'>
            <h2 className='text-darkorange text-sm font-bold tracking-[0.93px] mb-4'>SHIPPING INFO</h2>
            <div className='flex justify-between'>
              <label className={`text-xs font-bold text-black2 tracking-[-0.21px] mb-2 ${formErrors.address ? "text-red" : ""}`}>Your Address</label>
              <p className='text-xs font-medium tracking-[-0.21px] mb-2 text-red'>{formErrors.address}</p>
            </div>
            <input onChange={handleChange} value={formData.address} name='address' className={`h-14 w-full px-6 py-4 border border-inputborder rounded-lg mb-6 text-sm font-bold tracking-[-0.25px] focus:outline-darkorange ${formErrors.address ? "border-2 border-red" : ""}`} type="text" placeholder="123 Street" />
            <div>
              <div className='md:flex md:gap-4'>
                <div className='md:w-1/2'>
                  <div className='flex justify-between'>
                    <label className={`text-xs font-bold text-black2 tracking-[-0.21px] mb-2 ${formErrors.postal ? "text-red" : ""}`}>Zip Code</label>
                    <p className='text-xs font-medium tracking-[-0.21px] mb-2 text-red'>{formErrors.postal}</p>
                  </div>
                  <input onChange={handleChange} value={formData.postal} name='postal' className={`h-14 w-full px-6 py-4 border border-inputborder rounded-lg mb-6 text-sm font-bold tracking-[-0.25px] focus:outline-darkorange ${formErrors.postal ? "border-2 border-red" : ""}`} type="text" placeholder="12345" />
                </div>
                <div className='md:w-1/2'>
                  <div className='flex justify-between'>
                    <label className={`text-xs font-bold text-black2 tracking-[-0.21px] mb-2 ${formErrors.city ? "text-red" : ""}`}>City</label>
                    <p className='text-xs font-medium tracking-[-0.21px] mb-2 text-red'>{formErrors.city}</p>
                  </div>
                  <input onChange={handleChange} value={formData.city} name='city' className={`h-14 w-full px-6 py-4 border border-inputborder rounded-lg mb-6 text-sm font-bold tracking-[-0.25px] focus:outline-darkorange ${formErrors.city ? "border-2 border-red" : ""}`} type="text" placeholder="City" />
                </div>
              </div>
              <div className='md:flex md:gap-4'>
                <div className='md:w-1/2'>              
                  <div className='flex justify-between'>
                    <label className={`text-xs font-bold text-black2 tracking-[-0.21px] mb-2 ${formErrors.country ? "text-red" : ""}`}>Country</label>
                    <p className='text-xs font-medium tracking-[-0.21px] mb-2 text-red'>{formErrors.country}</p>
                  </div>
                  <input onChange={handleChange} value={formData.country} name='country' className={`h-14 w-full px-6 py-4 border border-inputborder rounded-lg mb-6 text-sm font-bold tracking-[-0.25px] focus:outline-darkorange ${formErrors.country ? "border-2 border-red" : ""}`} type="text" placeholder="Country" />
                </div>
                <div className='md:w-1/2'>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <h2 className='text-darkorange text-sm font-bold tracking-[0.93px] mb-4'>PAYMENT DETAILS</h2>
          <label className='h-14 w-full px-4 flex items-center gap-4 border border-inputborder rounded-lg mb-4 focus-within:outline focus-within:outline-1 focus-within:outline-darkorange'>
            <input onClick={(e) => setRadio(false)} className='w-5 h-5 peer' type='radio' checked={radio === false} name='payment'></input>
            <p className='text-sm font-bold text-black2 tracking-[-0.25px]'>Stripe</p>
          </label>
          <label className='h-14 w-full px-4 flex items-center gap-4 border border-inputborder rounded-lg mb-6 focus-within:outline focus-within:outline-1 focus-within:outline-darkorange'>
            <input onClick={(e) => setRadio(true)} className='w-5 h-5 peer' type='radio' checked={radio === true} name='payment'></input>
            <p className='text-sm font-bold text-black2 tracking-[-0.25px]'>Cash on Delivery</p>
          </label>
          <div className='h-14 w-full border border-inputborder px-4 flex flex-col justify-center rounded-lg mb-4'>
            {radio ? <p className='text-center'>Pay when you get it in cash</p> : <CardElement />}
          </div>
          {paymentError && <div className="error-message">{paymentError}</div>}
        </div>
      </form>
      <div className='bg-white mx-6 py-8 px-6 rounded-lg md:mx-10 md:p-8 xl:w-[31%] xl:h-full'>
        <h2 className='text-lg text-black2 tracking-[1.29px] font-bold mb-8'>SUMMARY</h2>
        {cart.map((item) => {
          return (
            <div className='flex justify-between mb-6'>
              <div className='flex gap-4'>
                <div>
                  <img className='h-16 min-w-16 rounded-lg' src={item.img} alt={item.name} />
                </div>
                <div className='flex flex-col justify-center'>
                  <p className='text-sbase font-bold text-black2'>{item.name}</p>
                  <p className='text-sm font-bold text-bordergrey'>$ {item.price}</p>
                </div>
              </div>
                <div className='flex pt-3'>
                  <p className='text-sbase font-bold text-bordergrey'>x {item.quantity}</p>
                </div>
            </div>
          )
        })}
        <div className='flex justify-between mb-2'>
          <p className='text-sbase text-bordergrey font-medium'>TOTAL</p>
          <p className='text-lg text-black2 font-bold'>$ {totalPrice}</p>
        </div>
        <div className='flex justify-between mb-2'>
          <p className='text-sbase text-bordergrey font-medium'>SHIPPING</p>
          <p className='text-lg text-black2 font-bold'>$ {deliveryPrice}</p>
        </div>
        <div className='flex justify-between mb-6'>
          <p className='text-sbase text-bordergrey font-medium'>VAT (INCLUDED)</p>
          <p className='text-lg text-black2 font-bold'>$ {Math.ceil(totalPrice * 0.20)}</p>
        </div>
        <div className='flex justify-between mb-8'>
          <p className='text-sbase text-bordergrey font-medium'>GRAND TOTAL</p>
          <p className='text-lg text-black2 font-bold xl:text-darkorange'>$ {totalPrice + deliveryPrice}</p>
        </div>
        
        {radio ? <button className='bg-darkorange hover:bg-lightorange text-white w-full py-4' onClick={handleSubmit}>CONTINUE & PAY</button> : <button className='bg-darkorange hover:bg-lightorange text-white w-full py-4' onClick={handleSubmitStripe} disabled={!stripe}>CONTINUE & PAY</button> }
      </div>
      </div>
    </section>
  );
}

export default Checkout;