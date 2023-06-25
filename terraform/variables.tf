
variable "location_name" {
  type        = string
  description = "Location of services"
  default     = "us-central1"
}

variable "service_name" {
  type        = string
  description = "name of the cloud run service"
  default     = "shop-backend-cloud-run"
}

variable "domain" {
  type        = string
  description = "front end url"
  default     = "https://masterchefgeorgi.ddns.net"
}

variable "image" {
  type        = string
  description = "The Docker image for the Cloud Run service."
}

variable "sa_key" {
  type        = string
  description = "path name of key"
}

variable "gcp_project_id" {
  type        = string
  description = "gcp project id"
}
