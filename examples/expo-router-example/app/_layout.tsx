import { Feather } from '@expo/vector-icons';

import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Layout() {
  const router = useRouter();

  const BackButton = () => (
    <TouchableOpacity onPress={router.back}>
      <View style={styles.backButton}>
        <Feather name="chevron-left" size={16} color="#007AFF" />
        <Text style={styles.backButtonText}>Back</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Overview' }} />
      <Stack.Screen
        name="details"
        options={{ title: 'Details', headerLeft: () => <BackButton /> }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
  },
  backButtonText: {
    color: '#007AFF',
    marginLeft: 4,
  },
});
