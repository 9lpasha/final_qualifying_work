import React, { useState, useEffect } from "react"
import { Props } from "../../App"
import { Dimensions, ScrollView, View } from "react-native"
import { Button, Dialog, Icon, SearchBar, Text } from "@rneui/themed"
import { StackActions } from "@react-navigation/native"
import { ExercisesList } from "../components/ExercisesList"
import SelectDropdown from "react-native-select-dropdown"
import { useQuery } from "@tanstack/react-query"
import { getAllExercisesByGroup } from "../api"


const recomendationIds = [1, 2]
const groups = [
  "all",
  "lower arms",
  "chest",
  "upper legs",
  "shoulders",
  "waist",
  "upper arms",
  "cardio",
  "lower legs",
  "back",
  "neck",
]

export function SearchPage({ navigation }: Props) {
  const [inputText, setInputText] = useState("")
  const [laodingState, setLoadingState] = useState(false)
  const [groupState, setGroupState] = useState(0)
  const [sortState, setSortState] = useState("hard")
  const [paginationCounter, setPaginfationCounter] = useState(1)
  const popAction = StackActions.pop(1)
  const { data } = useQuery({
    queryFn: () => getAllExercisesByGroup(groupState),
    queryKey: [groupState],
  })
  useEffect(() => {
    navigation.setOptions({
      title: "",
      header: () => (
        <SearchBar
          value={inputText}
          onChangeText={(e) => setInputText(e)}
          containerStyle={{ backgroundColor: "white", borderColor: "white" }}
          inputContainerStyle={{ backgroundColor: "white" }}
          cancelIcon={
            <Icon
              name="arrow-back"
              type="ionicon"
              color="black"
              size={25}
              onPress={() => navigation.dispatch(popAction)}
            />
          }
          searchIcon={
            <Icon
              name="arrow-back"
              type="ionicon"
              color="black"
              size={25}
              onPress={() => navigation.dispatch(popAction)}
            />
          }
          clearIcon={
            <Icon
              name="close"
              type="ionicon"
              color="black"
              size={25}
              onPress={() => setInputText("")}
            />
          }
          platform="android"
          showLoading={laodingState}
        />
      ),
    })
  }, [inputText])
  useEffect(() => setPaginfationCounter(1), [groupState, sortState])
  function loadMore() {
    setPaginfationCounter(paginationCounter + 5)
  }
  return (
    <ScrollView style={{ flexDirection: "column" }}>
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          marginTop: 10,
          flex: 1,
        }}
      >
        <View style={{ alignItems: "center", width: 80 }}>
          <Text>Group</Text>
          <SelectDropdown
            data={groups}
            onSelect={(selectedItem, index) => {
              setGroupState(index)
            }}
            defaultValueByIndex={0}
            dropdownStyle={{ borderRadius: 10 }}
          />
        </View>
        <View style={{ alignItems: "center", width: 80 }}>
          <Text>Sort</Text>
          <SelectDropdown
            data={["hard", "light"]}
            onSelect={(selectedItem) => {
              setSortState(selectedItem)
              console.log(sortState)
            }}
            defaultValueByIndex={0}
            dropdownStyle={{ borderRadius: 10 }}
          />
        </View>
      </View>
      {data ? (
        <ExercisesList
          ids={
            sortState == "hard"
              ? data
                  .filter((e) => e.title.includes(inputText.toLowerCase()))
                  .slice(paginationCounter, paginationCounter + 5)
                  .map((e) => e.id)
              : data
                  .filter((e) => e.title.includes(inputText.toLowerCase()))
                  .reverse()
                  .slice(paginationCounter, paginationCounter + 5)
                  .map((e) => e.id)
          }
          parent="search"
          navigation={navigation}
        />
      ) : (
        <Dialog.Loading />
      )}
      <Button
        buttonStyle={{
          margin: 15,
          borderRadius: 15,
          backgroundColor: "grey",
        }}
        title="More"
        titleStyle={{
          fontSize: 20,
          fontWeight: "700",
          letterSpacing: 2,
          color: "white",
        }}
        onPress={loadMore}
      />
      <Text h4 style={{ textAlign: "center" }}>
        Рекомендации
      </Text>
      <ExercisesList
        ids={recomendationIds}
        parent="search"
        navigation={navigation}
      />
    </ScrollView>
  )
}
