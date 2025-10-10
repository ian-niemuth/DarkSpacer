#!/bin/bash
# Generate secure secrets for production deployment

echo "🔐 Darkspace Campaign Manager - Secret Generator"
echo "================================================"
echo ""
echo "Copy these values to your .env.production file:"
echo ""

echo "# JWT Secret (64 characters)"
echo "JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')"
echo ""

echo "# Session Secret (64 characters)"  
echo "SESSION_SECRET=$(openssl rand -base64 64 | tr -d '\n')"
echo ""

echo "# Database Password (32 characters)"
echo "DB_PASSWORD=$(openssl rand -base64 32 | tr -d '\n')"
echo ""

echo "================================================"
echo "⚠️  IMPORTANT: Keep these secrets safe!"
echo "- Never commit them to git"
echo "- Store them in a password manager"
echo "- Only use them in production .env files"
echo ""
echo "Run this script again if you need to regenerate."
