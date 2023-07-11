terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.7.0"
    }
  }
  backend "gcs" {
    bucket = "terraform-state-cicdproject"
    prefix = "prod"
  }

  required_version = "~> 1.3.0"
}
provider "google" {
  # Configuration options
  project = var.gcp_project_id
  region  = var.location_name
  zone    = "us-central1-a"
  # credentials = var.sa_key
}

