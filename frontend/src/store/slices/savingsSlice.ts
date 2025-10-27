import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { savingsAPI } from '../../services/api';

// Types
interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description?: string;
  status: 'pending' | 'completed' | 'failed';
  reference?: string;
  createdAt: string;
  updatedAt: string;
}

interface SavingsState {
  balance: number;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface DepositData {
  amount: number;
  description?: string;
}

interface WithdrawData {
  amount: number;
  description?: string;
}

interface HistoryParams {
  page?: number;
  limit?: number;
  type?: 'deposit' | 'withdrawal';
  startDate?: string;
  endDate?: string;
}

// Async thunks
export const depositMoney = createAsyncThunk(
  'savings/deposit',
  async (data: DepositData, { rejectWithValue }) => {
    try {
      const response = await savingsAPI.deposit(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Deposit failed'
      );
    }
  }
);

export const withdrawMoney = createAsyncThunk(
  'savings/withdraw',
  async (data: WithdrawData, { rejectWithValue }) => {
    try {
      const response = await savingsAPI.withdraw(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Withdrawal failed'
      );
    }
  }
);

export const fetchBalance = createAsyncThunk(
  'savings/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const response = await savingsAPI.getBalance();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch balance'
      );
    }
  }
);

export const fetchTransactionHistory = createAsyncThunk(
  'savings/fetchHistory',
  async (params: HistoryParams = {}, { rejectWithValue }) => {
    try {
      const response = await savingsAPI.getHistory(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch transaction history'
      );
    }
  }
);

// Initial state
const initialState: SavingsState = {
  balance: 0,
  transactions: [],
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  },
};

// Slice
const savingsSlice = createSlice({
  name: 'savings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearTransactions: (state) => {
      state.transactions = [];
      state.pagination = {
        page: 1,
        limit: 20,
        total: 0,
        pages: 0,
      };
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Deposit
    builder
      .addCase(depositMoney.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(depositMoney.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload.newBalance;
        // Add transaction to the beginning of the list
        state.transactions.unshift(action.payload.transaction);
        state.error = null;
      })
      .addCase(depositMoney.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Withdraw
    builder
      .addCase(withdrawMoney.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(withdrawMoney.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload.newBalance;
        // Add transaction to the beginning of the list
        state.transactions.unshift(action.payload.transaction);
        state.error = null;
      })
      .addCase(withdrawMoney.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch balance
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.balance = action.payload.balance;
        state.error = null;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch transaction history
    builder
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload.transactions;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearTransactions, updateBalance } = savingsSlice.actions;
export default savingsSlice.reducer;
