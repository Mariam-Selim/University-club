// Types are now handled via JSDoc comments or removed
// This file can be used for documentation purposes

/**
 * @typedef {Object} AuthRequest
 * @property {Object} user
 * @property {string} user.id
 * @property {string} user.type
 * @property {string} user.email
 * @property {Object} admin
 * @property {Object} student
 */

/**
 * @typedef {Object} PaginationQuery
 * @property {number} [page]
 * @property {number} [limit]
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {Array} data
 * @property {Object} pagination
 * @property {number} pagination.page
 * @property {number} pagination.limit
 * @property {number} pagination.total
 * @property {number} pagination.totalPages
 */

export {};

