resource "google_cloud_scheduler_job" "job" {
  name        = "db_sync_tf2"
  description = "Sync stripe data with MongoDB"
  schedule    = var.schedule
  time_zone   = "America/Chicago"

  retry_config {
    retry_count = 1
  }

  http_target {
    http_method = "POST"
    uri         = "${var.cloud_run_uri}/api/products/process-stripe-data"
  }
}
