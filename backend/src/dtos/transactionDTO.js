/**
 * Transaction Data Transfer Object
 * Formats transaction data for API responses
 */

const transactionDTO = (transaction) => {
  return {
    id: transaction.id,
    type: transaction.type,
    amount: parseFloat(transaction.amount),
    balanceBefore: parseFloat(transaction.balanceBefore),
    balanceAfter: parseFloat(transaction.balanceAfter),
    description: transaction.description,
    status: transaction.status,
    reference: transaction.reference,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt
  };
};

const transactionListDTO = (transactions) => {
  return transactions.map(transaction => transactionDTO(transaction));
};

module.exports = {
  transactionDTO,
  transactionListDTO
};
