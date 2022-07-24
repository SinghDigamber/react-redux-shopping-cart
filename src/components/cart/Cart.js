import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import noCart from '../../assets/empty-cart.svg'

import { useDispatch, useSelector } from 'react-redux'
import {
  getCartProducts,
  getSubTotal,
  removeCartItem,
  getCartCount,
  increment,
  decrement,
  calculateTax,
  getTotalAmount,
} from '../../features/useCartSlice'

function Cart() {
  const dispatch = useDispatch()
  const { cartItems, subAmount, tax, totalAmount } = useSelector(
    (state) => state.cart,
  )

  useEffect(() => {
    dispatch(getCartProducts())
    dispatch(getSubTotal())
    dispatch(getCartCount())
    dispatch(calculateTax())
    dispatch(getTotalAmount())
  }, [dispatch])

  let showCart

  if (cartItems !== undefined && cartItems.length > 0) {
    showCart = (
      <>
        <table className="table table-hover mb-3 cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Price</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems !== undefined &&
              cartItems.length > 0 &&
              cartItems.map((product, index) => {
                return (
                  <tr key={product.id}>
                    <td className="col-md-4">
                      <div className="media">
                        <a className="thumbnail pull-left" href="/#">
                          <img className="media-object" src={product.image} alt={product.title} />
                        </a>
                      </div>
                    </td>

                    <td className="col-sm-1 col-md-2 text-center">
                      <div className="cart-quantity">
                        <button
                          className="btn btn-sm btn-outline-primary inline-block"
                          onClick={() => {
                            dispatch(increment(product.id))
                            dispatch(getSubTotal())
                            dispatch(getCartCount())
                            dispatch(calculateTax())
                            dispatch(getTotalAmount())
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus-lg"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                            />
                          </svg>
                        </button>
                        <span className="text-center inline-block">
                          {product.quantity}
                        </span>
                        <button
                          className="btn btn-sm btn-outline-primary inline-block"
                          onClick={() => {
                            dispatch(decrement(product.id))
                            dispatch(getSubTotal())
                            dispatch(getCartCount())
                            dispatch(calculateTax())
                            dispatch(getTotalAmount())
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-dash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="col-sm-1 col-md-1 text-center">
                      <strong>{product.price}</strong>
                    </td>
                    <td className="col-sm-1 col-md-1 text-center">
                      <strong>
                        {parseFloat(product.price * product.quantity).toFixed(
                          2,
                        )}
                      </strong>
                    </td>
                    <td className="col-sm-1 col-md-1">
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(removeCartItem(product.id))
                          dispatch(getSubTotal())
                          dispatch(getCartCount())
                          dispatch(calculateTax())
                          dispatch(getTotalAmount())
                        }}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>

        <div className="col-md-12 cart">
          <div className="col-md-6 p-4 offset-md-6 border alert alert-secondary">
            <div className="d-flex gst">
              <div className="flex-grow-1">GST 18%</div>$
              {parseFloat(tax).toFixed(2)}
            </div>
            <hr />
            <div className="d-flex gst">
              <div className="flex-grow-1">Subtotal</div>$
              {parseFloat(subAmount).toFixed(2)}
            </div>
            <hr />
            <div className="d-flex">
              <div className="flex-grow-1">
                <strong>Total Amount</strong>
              </div>
              <div>
                <strong>${parseFloat(totalAmount).toFixed(2)}</strong>
              </div>
            </div>
            <div className="d-grid mt-3">
              <button type="button" className="btn btn-dark">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    showCart = (
      <div className="w-100">
        <div className="empty-cart mb-2 text-center">
          <img
            src={noCart}
            className="img-thumbnail thumbnail-border-0"
            alt="Empty cart"
          />
        </div>
        <h2 className="h4 text-center mb-3">Your cart is empty</h2>
        <p className="text-center">
          Looks like you have not added anything to your cart. Let's buy some
          products.
        </p>
        <div className="text-center">
          <Link to="/" className="btn btn-danger">
            Shop now
          </Link>
        </div>
      </div>
    )
  }

  return <>{showCart}</>
}

export default Cart
