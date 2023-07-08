Backend NestJs built to handle fetching product info from mongoDB and connect with the Stripe API for payments

1. create terraform service account in gcp

[create service account]
gcloud iam service-accounts create sa-terraform

test

[add role bindings]

2. to build container image:
   handled by github action ---automatically rebuild image upon code pushed to repo

3. deploy to cloud run
