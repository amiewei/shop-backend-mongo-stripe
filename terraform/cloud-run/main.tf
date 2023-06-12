resource "google_cloud_run_v2_service" "cloudrun-tf" {
  name     = "shop-backend-stripe-mongo"
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
            secret  = "SHOP_STRIPE_API_KEY"
            version = "1"
          }
        }
      }
      env {
        name = "VAULT_ROLE_ID"
        value_source {
          secret_key_ref {
            secret  = "VAULT_ROLE_ID"
            version = "1"
          }
        }
      }
      env {
        name = "VAULT_SECRET_ID"
        value_source {
          secret_key_ref {
            secret  = "VAULT_SECRET_ID"
            version = "1"
          }
        }
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

