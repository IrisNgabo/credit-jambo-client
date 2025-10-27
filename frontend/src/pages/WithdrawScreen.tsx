import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { withdrawMoney, clearError } from '../store/slices/savingsSlice';

const WithdrawScreen = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, balance } = useSelector((state: RootState) => state.savings);

  const handleWithdraw = async () => {
    const withdrawAmount = parseFloat(amount);
    
    if (!amount.trim() || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (withdrawAmount < 0.01) {
      Alert.alert('Error', 'Minimum withdrawal amount is $0.01');
      return;
    }

    if (withdrawAmount > balance) {
      Alert.alert('Error', 'Insufficient funds. You cannot withdraw more than your current balance.');
      return;
    }

    // Show confirmation dialog
    Alert.alert(
      'Confirm Withdrawal',
      `Are you sure you want to withdraw $${withdrawAmount.toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Withdraw',
          style: 'destructive',
          onPress: async () => {
            try {
              const result = await dispatch(withdrawMoney({
                amount: withdrawAmount,
                description: description.trim() || undefined,
              }));

              if (withdrawMoney.fulfilled.match(result)) {
                Alert.alert(
                  'Success',
                  `Withdrawal of $${withdrawAmount.toFixed(2)} successful!`,
                  [{ text: 'OK' }]
                );
                setAmount('');
                setDescription('');
              } else if (withdrawMoney.rejected.match(result)) {
                Alert.alert('Withdrawal Failed', result.payload as string);
              }
            } catch (error) {
              Alert.alert('Error', 'An unexpected error occurred');
            }
          },
        },
      ]
    );
  };

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  const setQuickAmount = (quickAmount: number) => {
    if (quickAmount <= balance) {
      setAmount(quickAmount.toString());
    }
  };

  const setMaxAmount = () => {
    setAmount(balance.toString());
  };

  React.useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Withdraw Money</Text>
          <Text style={styles.subtitle}>Withdraw funds from your savings account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>
              ${balance.toFixed(2)}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount to withdraw"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              editable={!isLoading}
            />
            <Text style={styles.inputHint}>Maximum withdrawal: ${balance.toFixed(2)}</Text>
          </View>

          <View style={styles.quickAmountsContainer}>
            <Text style={styles.quickAmountsLabel}>Quick amounts:</Text>
            <View style={styles.quickAmounts}>
              {quickAmounts.map((quickAmount) => (
                <TouchableOpacity
                  key={quickAmount}
                  style={[
                    styles.quickAmountButton,
                    amount === quickAmount.toString() && styles.quickAmountButtonActive,
                    quickAmount > balance && styles.quickAmountButtonDisabled,
                  ]}
                  onPress={() => setQuickAmount(quickAmount)}
                  disabled={isLoading || quickAmount > balance}
                >
                  <Text
                    style={[
                      styles.quickAmountText,
                      amount === quickAmount.toString() && styles.quickAmountTextActive,
                      quickAmount > balance && styles.quickAmountTextDisabled,
                    ]}
                  >
                    ${quickAmount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.maxButton}
              onPress={setMaxAmount}
              disabled={isLoading || balance === 0}
            >
              <Text style={styles.maxButtonText}>Max (${balance.toFixed(2)})</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add a note for this withdrawal"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              editable={!isLoading}
            />
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.withdrawButton,
              isLoading && styles.disabledButton,
              balance === 0 && styles.disabledButton,
            ]}
            onPress={handleWithdraw}
            disabled={isLoading || balance === 0}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.withdrawButtonText}>
                {balance === 0 ? 'No Funds Available' : 'Withdraw Money'}
              </Text>
            )}
          </TouchableOpacity>

          {balance === 0 && (
            <View style={styles.noFundsContainer}>
              <Text style={styles.noFundsText}>
                You don't have any funds available for withdrawal.
              </Text>
              <Text style={styles.noFundsSubtext}>
                Make a deposit first to start withdrawing.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balanceCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  quickAmountsContainer: {
    marginBottom: 20,
  },
  quickAmountsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  quickAmountButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  quickAmountButtonActive: {
    backgroundColor: '#F44336',
    borderColor: '#F44336',
  },
  quickAmountButtonDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  quickAmountText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  quickAmountTextActive: {
    color: '#fff',
  },
  quickAmountTextDisabled: {
    color: '#999',
  },
  maxButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  maxButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: '#fee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#c33',
    fontSize: 14,
    textAlign: 'center',
  },
  withdrawButton: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  noFundsContainer: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  noFundsText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    fontWeight: '500',
  },
  noFundsSubtext: {
    fontSize: 12,
    color: '#856404',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default WithdrawScreen;
