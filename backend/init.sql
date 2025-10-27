-- Initialize Credit Jambo Database
-- This script runs when the PostgreSQL container starts

-- Create database if it doesn't exist
SELECT 'CREATE DATABASE credit_jambo_client'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'credit_jambo_client')\gexec

-- Connect to the database
\c credit_jambo_client;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create indexes for better performance
-- These will be created by Sequelize, but we can add some custom ones here

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE credit_jambo_client TO postgres;
