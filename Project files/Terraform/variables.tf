variable "aws_region" {
  default     = "us-east-1"
  description = "default AWS region for the EKS cluster"
}

variable "vpc_cidr" {
  default     = "10.0.0.0/16"
  description = "default CIDR range of the VPC"
}

variable "instance_types" {
  default     = ["t3.small"]
  description = "default instance types for the EKS managed node group"
}

variable "private_subnets" {
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
  description = "default private subnet CIDR ranges"
}

variable "public_subnets" {
  default     = ["10.0.101.0/24", "10.0.102.0/24"]
  description = "default public subnet CIDR ranges"
}

variable "kubernetes_version" {
  default     = "1.35"
  description = "default Kubernetes version for the EKS cluster"
}