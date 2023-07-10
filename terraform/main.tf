module "cloud-run" {
  source = "./cloud-run"

  location_name = var.location_name
  image         = var.image
  service_name  = var.service_name
  mongo_pw      = var.mongo_pw
  mongo_user    = var.mongo_user
}

module "cloud-scheduler" {
  source = "./cloud-scheduler"

  cloud_run_uri = module.cloud-run.uri

}
