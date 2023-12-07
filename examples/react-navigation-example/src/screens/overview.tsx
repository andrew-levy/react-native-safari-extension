import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Image, StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { isSafariExtension } from 'react-native-safari-extension';
import { RootStackParamList } from '../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View>
          <Text style={styles.title}>Hello World from the</Text>
          <Text style={styles.subtitle}>{isSafariExtension() ? 'Extension' : 'App'}</Text>
        </View>
        <Image source={require('../../assets/favicon.png')} width={100} height={100} />
        <BorderlessButton
          style={styles.button}
          onPress={() => navigation.navigate('Details', { name: 'Dan' })}>
          <Text style={styles.buttonText}>Woooo hot reload!!!</Text>
        </BorderlessButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#6366F1',
    borderRadius: 24,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  main: {
    flex: 1,
    maxWidth: 960,
    marginHorizontal: 'auto',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#38434D',
    fontSize: 36,
  },
});
