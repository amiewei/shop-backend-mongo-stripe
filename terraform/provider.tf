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



# provider "google" {
#   # Configuration options
#   project     = "i-portfolio-363516"
#   region      = "us-central1"
#   zone        = "us-central1-a"
#   credentials = "sa-key.json"

# }
