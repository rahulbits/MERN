import React, { useEffect, useRef, useState } from "react"

export default function PayPal({ amount }) {
  const paypal = useRef()

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: function (data, actions, err) {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  description: "Order Amount",
                  currency: "USD",
                  value: amount,
                },
              },
            ],
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture()
          console.log(order)
        },
        onError: (err) => {
          console.log(err)
        },
      })
      .render(paypal.current)
  })

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  )
}
