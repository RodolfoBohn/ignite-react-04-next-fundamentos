import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const price = req.body.priceId
  const successUrl = `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.APP_URL}/`

  if(!price) {
    res.status(400).json({error: "Price is not defined"})
  }

  if (req.method !== 'POST') {
    res.status(405).json({error: "Method not allowed"})
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl, 
    mode: 'payment', 
    line_items: [
      {
        price: price, 
        quantity: 1
      }
    ]
  })
  return res.status(201).json({checkoutUrl: checkoutSession.url})
}