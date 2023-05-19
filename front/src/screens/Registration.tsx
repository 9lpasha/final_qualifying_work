import { Button, ButtonGroup, Image, Input, Text, Icon } from "@rneui/themed"
import { Formik } from "formik"
import React, { useState } from "react"
import { View, ScrollView, TouchableOpacity } from "react-native"
import * as yup from "yup"
import { Props } from "../../App"
import { goalByIndex, musclesList } from "./QuestionPage"
import { registration } from "../api"

const initialValues = {
  password: "",
  age: "",
  weight: "",
  height: "",
  sex: "",
  email: "",
  name: "",
  surname: "",
  lastName: "",
  currentLevel: 5,
  aim: 1,
  trainHands: false,
  trainLegs: false,
  trainBack: false,
  trainPress: false,
  trainChest: false,
  trainShoulders: false,
}

const loginValidationSchema = yup.object().shape({
  password: yup.string().required("Password is required").min(4),
  age: yup
    .number()
    .min(0, "min 0")
    .max(99, "max 99")
    .required("Age is required"),
  weight: yup.number().min(0, "min 0").required("Weight is required"),
  height: yup.number().min(0, "min 0").required("Height is required"),
  sex: yup.string().required("Gender is required").oneOf(["m", "w"]),
  email: yup.string().email().required("Email is required"),
  name: yup.string().required(),
  surname: yup.string().required(),
  lastName: yup.string().required(),
})

export function Registration({ navigation }: Props) {
  const [selectedIndex, setSelectedIndex] = useState()

  return (
    
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingHorizontal: 5,
          paddingVertical: 25,
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(values)
            registration(values).then((data) => {
              console.log(data)
              if (data == "ok") {
                navigation.navigate("Authorization")
              }
            })
          }}
          validationSchema={loginValidationSchema}
        >
          {(props) => (
            <View
              style={{
                width: "100%",
                maxWidth: 500,
                gap: 10,
                paddingVertical: 10,
              }}
            >
              <Input
                placeholder="Email"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
              />
              <Input
                placeholder="Password"
                onChangeText={props.handleChange("password")}
                value={props.values.password}
              />
              <Input
                placeholder="Name"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
              />
              <Input
                placeholder="Surname"
                onChangeText={props.handleChange("surname")}
                value={props.values.surname}
              />
              <Input
                placeholder="Lastname"
                onChangeText={props.handleChange("lastName")}
                value={props.values.lastName}
              />
              <Input
                placeholder="Age"
                onChangeText={props.handleChange("age")}
                value={props.values.age}
                keyboardType="numeric"
              />
              <Input
                placeholder="Weight (kg)"
                onChangeText={props.handleChange("weight")}
                value={props.values.weight}
                keyboardType="numeric"
              />
              <Input
                placeholder="Height (cm)"
                onChangeText={props.handleChange("height")}
                value={props.values.height}
                keyboardType="numeric"
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Gender
              </Text>
              <ButtonGroup
                buttons={["Male", "Female"]}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                  setSelectedIndex(value)
                  const a = ["m", "w"][value]
                  props.setFieldValue("sex", a)
                  console.log(props.values)
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginHorizontal: 10,
                }}
              ></View>

              <View style={{ alignItems: "center" }}>
                <Text h4 style={{ textAlign: "center" }}>
                  What is your goal?
                </Text>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  {goalByIndex(props.values.aim)}
                </Text>
                <ButtonGroup
                  buttons={[
                    <Icon
                      name="leaf"
                      type="ionicon"
                      color="lawngreen"
                      size={80}
                    />,
                    <Icon
                      name="heart"
                      type="ionicon"
                      color="salmon"
                      size={80}
                    />,
                    <Icon name="barbell" type="ionicon" size={80} />,
                  ]}
                  selectedIndex={props.values.aim}
                  onPress={(value) => {
                    props.setFieldValue("aim", value)
                  }}
                  selectedButtonStyle={{
                    borderRadius: 10,
                    borderWidth: 5,
                    borderColor: "rgb(32, 137, 220)",
                    backgroundColor: "white",
                  }}
                  buttonStyle={{ width: 90, height: 90 }}
                  buttonContainerStyle={{
                    width: 90,
                    height: 90,
                    borderWidth: 0,
                    backgroundColor: "white",
                    borderRadius: 10,
                  }}
                  containerStyle={{
                    gap: 10,
                    height: 90,
                    backgroundColor: "transparent",
                    display: "flex",
                    flexDirection: "row",
                    borderWidth: 0,
                    width: 285,
                  }}
                />
              </View>
              {props.values.aim == 2 ? (
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      marginBottom: 5,
                    }}
                  >
                    Select muscles
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      maxWidth: 300,
                      gap: 10,
                    }}
                  >
                    {musclesList.map((item, index) => (
                      <TouchableOpacity
                        key={item.name + index}
                        style={{
                          backgroundColor: "white",
                          padding: 10,
                          borderColor: props.values[item.name]
                            ? "rgb(32, 137, 220)"
                            : "white",
                          borderWidth: 5,
                          borderRadius: 10,
                        }}
                        onPress={() =>
                          props.setFieldValue(
                            item.name,
                            !props.values[item.name]
                          )
                        }
                      >
                        <Image
                          source={{ uri: item.Image }}
                          style={{
                            width: 60,
                            height: 60,
                            tintColor: "black",
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ) : (
                ""
              )}

              <Button
                style={{ width: 202, alignSelf: "center" }}
                onPress={() => {
                  props.handleSubmit()
                }}
              >
                Sign Up
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    
  )
}
