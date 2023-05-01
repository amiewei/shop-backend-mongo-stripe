MONGO DB

1. add products to db, only add if itemname is not the same (case insentitve search) - open
2. get all products from db - done
3. send to front end - done
4. prefill with stripe data? - cache product and price information in my database and sync it in Stripe as needed.

---

STRIPE API
1.create checkout session - complete
how to show order confirmation upon successful checkout?

2.How to link stripe price to mongodb price? --- once a day sync? how to sync? just need to get product info like latest price, description, bulgarian name etc. what about imageId? is mongodb's purpose just to cache product info? then shoul i use Redis instead? how does redis work? stripe is the source of truth for now.

2.1 how to schedule the update to run? cronjob?

2.2 apigee so clients access apigee first and get authenticated before being routed to backend servers for specific tasks
https://cloud.google.com/apigee/docs/api-platform/get-started/what-apigee

3.Fulfill order --- stripe webhook can be deployed via cloud function
https://stripe.com/docs/payments/checkout/fulfill-orders
upon successful checkout event (checkout.session.completed), Stripe will automatically send POST request. TODO: send email to warehouse to fulfill order.
// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = 'whsec\_...';

performance:
how to cache results from backend? -- getting product info is from db. is that too much on mongodb?
