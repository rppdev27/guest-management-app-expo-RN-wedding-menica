import { View, Text, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screexxn</Text>
        <Button
            title="Go To Guest"
            onPress={() => navigation.navigate('Guest')}
        />
      </View>
    );
  };

export default HomeScreen