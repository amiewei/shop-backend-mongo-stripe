variable "service_name" {
  type        = string
  description = "name of the cloud run service"
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

variable "mongo_user" {
  description = "mongodb user"
  default     = "admin"
}

