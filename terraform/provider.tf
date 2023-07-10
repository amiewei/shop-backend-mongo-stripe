terraform {
  backend "gcs" {
    bucket = "terraform-state-cicdproject"
    prefix = "prod"
  }
}
provider "google" {
  # Configuration options
  project = var.gcp_project_id
  region  = var.location_name
  zone    = "us-central1-a"
  # credentials = var.sa_key
}

