module "cloud-run" {
  source = "./cloud-run"

  location_name = var.location_name
  image         = var.image
  service_name  = var.service_name
}

module "cloud-scheduler" {
  source = "./cloud-scheduler"

  cloud_run_uri = module.cloud-run.uri

}
