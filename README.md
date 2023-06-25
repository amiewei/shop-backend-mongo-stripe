Backend NestJs built to handle fetching product info from mongoDB and connect with the Stripe API for payments

1. create terraform service account in gcp

[create service account]
gcloud iam service-accounts create sa-terraform

[add role bindings]
gcloud projects add-iam-policy-binding omega-branch-385519 --member="serviceAccount:sa-terraform@omega-branch-385519.iam.gserviceaccount.com" --role="roles/cloudfunctions.admin" && gcloud projects add-iam-policy-binding omega-branch-385519 --member="serviceAccount:sa-terraform@omega-branch-385519.iam.gserviceaccount.com" --role="roles/run.admin" && gcloud projects add-iam-policy-binding omega-branch-385519 --member="serviceAccount:sa-terraform@omega-branch-385519.iam.gserviceaccount.com" --role="roles/compute.admin" && gcloud projects add-iam-policy-binding omega-branch-385519 --member="serviceAccount:sa-terraform@omega-branch-385519.iam.gserviceaccount.com" --role="roles/storage.admin" && gcloud projects add-iam-policy-binding omega-branch-385519 --member="serviceAccount:sa-terraform@omega-branch-385519.iam.gserviceaccount.com" --role="roles/containerregistry.ServiceAgent"

2. to build container image:
   handled by github action ---automatically rebuild image upon code pushed to repo

3. deploy to cloud run
