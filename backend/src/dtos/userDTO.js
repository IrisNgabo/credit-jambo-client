/**
 * User DTO
 * Excludes sensitive information when sending user data to frontend
 */

const userDTO = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    balance: parseFloat(user.balance),
    isVerified: user.isVerified,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

const userListDTO = (users) => {
  return users.map(user => userDTO(user));
};

module.exports = {
  userDTO,
  userListDTO
};
