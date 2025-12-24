# Kubernetes Deployment Guide

This directory contains all the necessary Kubernetes manifests to deploy the jesseinit portfolio application.

## Prerequisites

- Kubernetes cluster (local or cloud)
- kubectl CLI installed and configured
- Docker for building the image
- (Optional) kustomize for managing configurations

## Files Overview

- `deployment.yaml` - Kubernetes Deployment with 2 replicas, health checks, and resource limits
- `service.yaml` - ClusterIP Service exposing the application on port 80
- `ingress.yaml` - Ingress resource for external access (requires ingress controller)
- `configmap.yaml` - ConfigMap for environment variables
- `kustomization.yaml` - Kustomize configuration for easy deployment management

## Quick Start

### 1. Build the Docker Image

```bash
# Build the image
docker build -t jesseinit-portfolio:latest .

# If using a registry, tag and push
docker tag jesseinit-portfolio:latest <your-registry>/jesseinit-portfolio:latest
docker push <your-registry>/jesseinit-portfolio:latest
```

### 2. Update Image Reference (if using a registry)

Edit `k8s/kustomization.yaml` and update the image reference:

```yaml
images:
  - name: jesseinit-portfolio
    newName: <your-registry>/jesseinit-portfolio
    newTag: latest
```

### 3. Deploy to Kubernetes

#### Option A: Using kubectl

```bash
# Apply all manifests
kubectl apply -f k8s/

# Verify deployment
kubectl get pods -l app=jesseinit-portfolio
kubectl get svc jesseinit-portfolio
kubectl get ingress jesseinit-portfolio
```

#### Option B: Using Kustomize

```bash
# Deploy using kustomize
kubectl apply -k k8s/

# Or build and preview first
kubectl kustomize k8s/ | kubectl apply -f -
```

### 4. Configure Ingress (Optional)

Edit `k8s/ingress.yaml` to match your setup:

1. Update the `host` field with your domain
2. Set the correct `ingressClassName` (nginx, traefik, etc.)
3. Uncomment TLS section if using HTTPS
4. Add appropriate annotations for your ingress controller

Example for NGINX with cert-manager:

```yaml
annotations:
  nginx.ingress.kubernetes.io/ssl-redirect: "true"
  cert-manager.io/cluster-issuer: "letsencrypt-prod"
```

### 5. Add Environment Variables (Optional)

Edit `k8s/configmap.yaml` to add any required environment variables:

```yaml
data:
  API_URL: "https://api.example.com"
  NEXT_PUBLIC_SITE_URL: "https://jesseinit.com"
```

## Local Development with Minikube

```bash
# Start minikube
minikube start

# Build image in minikube's Docker daemon
eval $(minikube docker-env)
docker build -t jesseinit-portfolio:latest .

# Deploy
kubectl apply -k k8s/

# Access the application
minikube service jesseinit-portfolio
```

## Monitoring

### Check Pod Status

```bash
kubectl get pods -l app=jesseinit-portfolio
kubectl logs -l app=jesseinit-portfolio -f
kubectl describe pod <pod-name>
```

### Check Service

```bash
kubectl get svc jesseinit-portfolio
kubectl describe svc jesseinit-portfolio
```

### Port Forward for Local Testing

```bash
kubectl port-forward svc/jesseinit-portfolio 8080:80
# Access at http://localhost:8080
```

## Scaling

```bash
# Scale to 3 replicas
kubectl scale deployment jesseinit-portfolio --replicas=3

# Or edit deployment.yaml and reapply
```

## Updating the Application

```bash
# Build new image with new tag
docker build -t jesseinit-portfolio:v2 .
docker push <your-registry>/jesseinit-portfolio:v2

# Update the image
kubectl set image deployment/jesseinit-portfolio portfolio=<your-registry>/jesseinit-portfolio:v2

# Or update kustomization.yaml and reapply
kubectl apply -k k8s/
```

## Troubleshooting

### Pods not starting

```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

### Service not accessible

```bash
kubectl get endpoints jesseinit-portfolio
kubectl describe svc jesseinit-portfolio
```

### Image pull errors

If using a private registry, create an image pull secret:

```bash
kubectl create secret docker-registry regcred \
  --docker-server=<your-registry> \
  --docker-username=<username> \
  --docker-password=<password> \
  --docker-email=<email>
```

Then add to `deployment.yaml`:

```yaml
spec:
  imagePullSecrets:
  - name: regcred
```

## Resource Management

The deployment includes default resource requests and limits:

- Requests: 128Mi memory, 100m CPU
- Limits: 512Mi memory, 500m CPU

Adjust these in `deployment.yaml` based on your application's needs.

## Cleanup

```bash
# Delete all resources
kubectl delete -k k8s/

# Or delete individually
kubectl delete -f k8s/
```

## Production Considerations

1. **Use a specific image tag** instead of `latest` for better version control
2. **Set up HorizontalPodAutoscaler** for automatic scaling
3. **Configure persistent storage** if needed (for logs, cache, etc.)
4. **Add network policies** for security
5. **Set up monitoring** with Prometheus/Grafana
6. **Configure TLS/SSL** certificates for HTTPS
7. **Use secrets** for sensitive data instead of ConfigMaps
8. **Implement resource quotas** and limit ranges
9. **Set up backup and disaster recovery** procedures
10. **Use namespace isolation** for multi-environment deployments
