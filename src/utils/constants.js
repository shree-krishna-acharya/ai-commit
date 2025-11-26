const ERROR_MESSAGES = {
  VALIDATION: {
    REQUIRED_FIELD: (field) => `${field} is required`,
    INVALID_FORMAT: (field) => `Invalid ${field} format`,
    MIN_LENGTH: (field, min) => `${field} must be at least ${min} characters`,
    MAX_LENGTH: (field, max) => `${field} cannot exceed ${max} characters`,
  },
  AUTH: {
    UNAUTHORIZED: 'Authentication required',
    INVALID_TOKEN: 'Invalid or expired token',
    INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
  },
  RESOURCE: {
    NOT_FOUND: (resource) => `${resource} not found`,
    ALREADY_EXISTS: (resource) => `${resource} already exists`,
  },
  SERVER: {
    INTERNAL_ERROR: 'Internal server error',
    DATABASE_ERROR: 'Database operation failed',
  }
};

const SUCCESS_MESSAGES = {
  CREATED: (resource) => `${resource} created successfully`,
  UPDATED: (resource) => `${resource} updated successfully`,
  DELETED: (resource) => `${resource} deleted successfully`,
};

module.exports = { ERROR_MESSAGES, SUCCESS_MESSAGES };
