import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripe = (publishKey: string): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishKey);
  }
  return stripePromise;
};

export default getStripe;
