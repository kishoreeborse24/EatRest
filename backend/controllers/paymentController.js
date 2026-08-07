import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');

export const createIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(req.body.amount * 100),
      currency: 'usd',
      payment_method_types: ['card']
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const webhook = (req, res) => {
  res.json({ received: true });
};
