module "cloud-run" {
  source = "./cloud-run"

  location_name = var.location_name
  image         = var.image
}

module "cloud-scheduler" {
  source = "./cloud-scheduler"

  cloud_run_uri = module.cloud-run.uri

}
