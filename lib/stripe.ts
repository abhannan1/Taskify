import  { Stripe } from "stripe"

const apiKey = process.env.STRIPE_API_KEY as string

export const stripe = new Stripe(apiKey, {
    apiVersion:"2024-04-10",
    typescript:true
})