import { Button, ButtonGroup, Icon, Image, Text } from "@rneui/themed"
import React, { useState } from "react"
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native"
import { Props } from "../../App"

export const musclesList = [
  {
    name: "trainLegs",
    Image:
      "https://icons.iconarchive.com/icons/icons8/windows-8/256/Sports-Leg-icon.png",
  },
  {
    name: "trainHands",
    Image:
      "https://icons.iconarchive.com/icons/icons8/windows-8/256/Sports-Hand-Biceps-icon.png",
  },
  {
    name: "trainShoulders",
    Image:
      "https://icons.iconarchive.com/icons/icons8/windows-8/512/Sports-Shoulders-icon.png",
  },
  {
    name: "trainBack",
    Image:
      "https://icons.iconarchive.com/icons/icons8/android/512/Sports-Back-icon.png",
  },
  {
    name: "trainChest",
    Image: "https://icon-library.com/images/muscles-icon/muscles-icon-27.jpg",
  },
  {
    name: "trainPress",
    Image:
      "https://icons.iconarchive.com/icons/icons8/windows-8/256/Sports-Prelum-icon.png",
  },
]

export function goalByIndex(index: number) {
  switch (index) {
    case 0:
      return "Slim"
    case 1:
      return "Health"
    case 2:
      return "Straight"
  }
}

export function QuestionPage({ navigation } : Props) {
  const [goalState, setGoalState] = useState(1)
  const [musclesState, setMusclesState] = useState<string[]>([])
  function musclesHandler(name: string) {
    if (musclesState.includes(name)) {
      setMusclesState(musclesState.filter((s) => s != name))
    } else {
      setMusclesState([...musclesState, name])
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        gap: 10,
      }}
    >
      <View>
        <Text h4 style={{ textAlign: "center" }}>
          What is your goal?
        </Text>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          {goalByIndex(goalState)}
        </Text>
        <ButtonGroup
          buttons={[
            <Icon name="leaf" type="ionicon" color="lawngreen" size={80} />,
            <Icon name="heart" type="ionicon" color="salmon" size={80} />,
            <Icon name="barbell" type="ionicon" size={80} />,
          ]}
          selectedIndex={goalState}
          onPress={(value) => {
            setGoalState(value)
          }}
          selectedButtonStyle={{ backgroundColor: "grey" }}
          buttonStyle={{width: 90, height: 90}}
          buttonContainerStyle={{width: 90, height: 90}}
          containerStyle={{width: 270, height: 90}}
        />
      </View>
      {goalState == 2 ? (
        <View>
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom:5 }}>
            Select muscles
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 0,
              justifyContent: "center",
              maxWidth: 287,
            }}
          >
            {musclesList.map((item, index) => (
              <TouchableOpacity
                key={item.name + index}
                style={{
                  backgroundColor: musclesState.includes(item.name)
                    ? "grey"
                    : "white",
                  padding: 10,
                  borderColor: musclesState.includes(item.name)
                    ? "dimgrey"
                    : "gainsboro",
                  borderWidth: 1,
                  borderRadius: 2,
                }}
                onPress={() => musclesHandler(item.name)}
              >
                <Image
                  source={{ uri: item.Image }}
                  style={{
                    width: 70,
                    height: 70,
                    tintColor: musclesState.includes(item.name)
                      ? "white"
                      : "black",
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
        style={{ width: 202 }}
        onPress={() => {
          navigation.navigate("Authorization")
        }}
      >
        Sign Up
      </Button>
    </ScrollView>
  )
}
