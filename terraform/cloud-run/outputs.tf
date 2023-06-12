output "uri" {
  description = "The URI of the Cloud Run service."
  value       = google_cloud_run_v2_service.cloudrun-tf.uri
}
