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
  description = "The Docker image for the Cloud Run service."
}

variable "location_name" {
  description = "Location of services"
}

