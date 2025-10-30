import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { store } from './src/store';
import { loadStoredAuth, clearAuthCache } from './src/store/slices/authSlice';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    // Clear any cached authentication data first to ensure clean state
    store.dispatch(clearAuthCache()).then(() => {
      // Then load stored authentication on app start
      store.dispatch(loadStoredAuth());
    });
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
      <StatusBar style="auto" />
      <Toast />
    </Provider>
  );
}
