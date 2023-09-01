import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {onAuthStateChanged} from 'firebase/auth';
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { setUser } from "../redux/slices/user";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import AddTripScreen from "../screens/AddTripScreen";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import TripExpensesScreen from "../screens/TripExpenseScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();
 
export default function AppNavigation() {
  const {user} = useSelector(state=>state.user);

  const dispatch = useDispatch();

  const auth = getAuth();

  onAuthStateChanged(auth, u=>{
    console.log("got user:",u);
    dispatch(setUser(u));
  })


  if(user){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
            <Stack.Screen name="AddTrip" component={AddTripScreen} options={{headerShown:false}} />
            <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{headerShown:false}} />
            <Stack.Screen name="TripExpenses" component={TripExpensesScreen} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
      )
  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown:false,presentation:"modal"}} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false,presentation:"modal"}} />
        </Stack.Navigator>
      </NavigationContainer>
      )
  }
}