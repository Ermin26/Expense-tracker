import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalStyles } from './constants/styles';
import { Ionicons} from '@expo/vector-icons';
import ManageExpense from './screens/ManageScreen';
import RecentExpense from './screens/RecentExpensesScreen';
import AllExpense from './screens/AllExpensesScreen';
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview(){
  return (
    <BottomTab.Navigator screenOptions={{
      headerStyle:{backgroundColor:GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
    }}>
      <BottomTab.Screen name="RecentExpense" component={RecentExpense} options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({size, color}) => <Ionicons name="hourglass" color={color} size={size} />
      }} />
      <BottomTab.Screen name="AllExpense" component={AllExpense} options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({size, color}) => <Ionicons name="calendar" color={color} size={size} />
      }} />
  </BottomTab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='ExpensesOverview'>
          <Stack.Screen name="ManageScreen" component={ManageExpense} />
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{
            headerShown: false  }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

