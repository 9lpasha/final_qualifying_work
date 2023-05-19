import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React, { useState } from "react";
import { HomePage } from "./src/screens/HomePage";
import { Authorization } from "./src/screens/Authorization";
import { QuestionPage } from "./src/screens/QuestionPage";
import { DetailedExercise } from "./src/screens/DeatiledExercise";
import { Registration } from "./src/screens/Registration";
import { SearchPage } from "./src/screens/SearchPage";
import { CustomButton } from "./src/components/ui/CustomButton";
import { Button, Input } from "@rneui/themed";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const Stack = createNativeStackNavigator();
type RootStackParamList = {
  Home: undefined;
  Detailed: {id :  number};
  Authorization: undefined;
  Questions: undefined;
  SignUp: undefined;
  Search: undefined;
};
export type Props = NativeStackScreenProps<RootStackParamList>;

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Authorization"
            component={Authorization}
            options={{
              title: "Authorization",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: 'rgb(32, 137, 220)'
              }
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={Registration}
            options={{
              title: "Sign Up",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: 'rgb(32, 137, 220)'
              }
            }}
          />
          <Stack.Screen
            name="Questions"
            component={QuestionPage}
            options={{
              title: "Questions",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: 'rgb(32, 137, 220)'
              }
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{
              title: "",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: 'rgb(32, 137, 220)'
              },
              gestureEnabled: false,
              headerRight: () => (
                <Button
                  icon={{
                    name: "search",
                    type: "ionicon",
                    color: "white",
                    size: 25,
                  }}
                  style={{ paddingRight: 10 }}
                  titleStyle={{
                    color: "rgb(32, 137, 220)",
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                  iconRight
                />
              ),
              headerLeft: () => (
                <Button
                  icon={{
                    name: "exit",
                    type: "ionicon",
                    color: "rgb(28, 28, 30)",
                    size: 25,
                  }}
                  style={{ paddingRight: 10 }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Detailed"
            component={DetailedExercise}
            options={{
              title: "УПРАЖНЕНИЕ",
              headerTitleAlign: "center",
              headerTintColor: "rgb(32, 137, 220)",
              headerRight: () => (
                <Button
                  icon={{
                    name: "search",
                    type: "ionicon",
                    color: "rgb(32, 137, 220);",
                    size: 25,
                  }}
                  color="white"
                  style={{ paddingRight: 10 }}
                  titleStyle={{
                    color: "rgb(32, 137, 220)",
                    fontWeight: "500",
                    fontSize: 18,
                  }}
                  iconRight
                />
              ),
            }}
          />
          <Stack.Screen name="Search" component={SearchPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
export default App;
