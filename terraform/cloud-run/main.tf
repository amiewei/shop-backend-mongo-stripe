resource "google_cloud_run_v2_service" "cloudrun-tf" {
  name     = var.service_name
  location = var.location_name

  template {
    containers {
      image = var.image
      //environment variables will be exposed in the environment while secrets are in secret mgr
      env {
        name  = "YOUR_DOMAIN"
        value = var.domain
      }
      env {
        name = "STRIPE_API_KEY"
        value_source {
          secret_key_ref {
            secret  = "STRIPE_API_KEY"
            version = "1"
          }
        }
      }
      env {
        name  = "MONGO_USER"
        value = var.mongo_user
      }
      env {
        name  = "MONGO_PW"
        value = var.mongo_pw
      }
    }
  }

}


data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_v2_service.cloudrun-tf.location
  project  = google_cloud_run_v2_service.cloudrun-tf.project
  service  = google_cloud_run_v2_service.cloudrun-tf.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

