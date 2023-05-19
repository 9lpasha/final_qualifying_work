import { TabView, Text, Dialog, Button } from "@rneui/themed"
import { ScrollView, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { CurrentTrainingsCard } from "../CurrentTrainingsCard"
import { ExercisesList } from "../ExercisesList"
import { Props } from "../../../App"
import { CustomButton } from "../ui/CustomButton"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getFavorites } from "../../api"
import { getStoreUserId } from "../../store"
export function Favorites({ navigation }: { navigation: Props["navigation"] }) {
  const [userIdState, setUserIdState] = useState(null)
  const [paginatorState, setPaginatorState] = useState(0)
  useEffect(() => {
    getStoreUserId().then((data) => setUserIdState(data))
  }, [])
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryFn: () => getFavorites(userIdState),
    onSuccess: () => console.log(data),
    queryKey: ["favorites", userIdState],
  })
  return (
    <TabView.Item style={{ width: "100%", backgroundColor: "#ccddeb" }}>
      <ScrollView style={{ paddingBottom: 15 }}>
        {data && !isLoading ? (
          <ExercisesList
            navigation={navigation}
            ids={data.slice(0 + paginatorState, 5 + paginatorState)}
            parent="favorites"
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
          onPress={() => {
            if(data.length >= paginatorState + 5){setPaginatorState(paginatorState + 5)}else{setPaginatorState(0)}
              
          }}
        />
      </ScrollView>
    </TabView.Item>
  )
}
