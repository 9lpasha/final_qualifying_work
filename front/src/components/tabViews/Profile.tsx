import {
  ButtonGroup,
  Divider,
  Icon,
  Image,
  Input,
  TabView,
  Text,
} from "@rneui/themed"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { HistoryListItem } from "../HistoryListItem"
import { Props } from "../../../App"
import { useEffect, useState } from "react"
import { goalByIndex, musclesList } from "../../screens/QuestionPage"
import { Button, Dialog } from "@rneui/base"
import { getStoreUserId } from "../../store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import NumericInput from "react-native-numeric-input"
import { getUserById, updateUser } from "../../api"

export function Profile({ navigation }: { navigation: Props["navigation"] }) {
  const [musclesState, setMusclesState] = useState<string[]>([])
  const [userIdState, setUserIdState] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  useEffect(() => {
    getStoreUserId().then((data) => setUserIdState(data))
  }, [])
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ["userInfo", userIdState],
    queryFn: () => getUserById(userIdState),
    refetchInterval: 10000,
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (updateData) => updateUser(updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] })
    },
  })

  if (!data || isLoading) {
    return (
      <TabView.Item style={{ width: "100%", backgroundColor: "#ccddeb" }}>
        <ScrollView>
          <Dialog.Loading />
        </ScrollView>
      </TabView.Item>
    )
  }
  if (data)
    return (
      <TabView.Item style={{ width: "100%", backgroundColor: "#ccddeb" }}>
        <ScrollView>
          <View style={{ padding: 15, alignItems: "center" }}>
            <Text h4 style={{ textAlign: "center", marginBottom: 15 }}>
              {data.email}
            </Text>

            <View>
              <Input
                rightIcon={
                  <Icon
                    name="pencil"
                    type="ionicon"
                    size={20}
                    color="rgb(32, 137, 220)"
                  />
                }
                containerStyle={{ width: 100, alignSelf: "center" }}
                inputStyle={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "black",
                  width: 50,
                  textAlign: "right",
                }}
                labelStyle={{
                  fontSize: 20,
                  fontWeight: "400",
                  color: "dimgrey",
                }}
                label="Мой вес"
                keyboardType="numeric"
                textAlign="right"
                placeholderTextColor="black"
                placeholder={data.weight}
                onEndEditing={(e) =>
                  mutate({ id: userIdState, weight: e.nativeEvent.text })
                }
                onBlur={(e) =>
                  mutate({ id: userIdState, weight: e.nativeEvent.text })
                }
                maxLength={3}
              />

              <Text
                style={{ textAlign: "center", fontSize: 20, color: "dimgrey" }}
              >
                Моя цель:{" "}
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  {goalByIndex(+data.aim)}
                </Text>
              </Text>

              <ButtonGroup
                buttons={[
                  <Icon
                    name="leaf"
                    type="ionicon"
                    color="lawngreen"
                    size={70}
                  />,
                  <Icon name="heart" type="ionicon" color="salmon" size={70} />,
                  <Icon name="barbell" type="ionicon" size={70} />,
                ]}
                selectedIndex={+data.aim}
                onPress={(value) => {
                  mutate({ id: userIdState, aim: value })
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
            {data.aim == 2 ? (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginBottom: 5,
                    color: "dimgrey",
                  }}
                >
                  Приоритетные мышцы
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
                        borderColor: data[item.name]
                          ? "rgb(32, 137, 220)"
                          : "white",
                        borderWidth: 5,
                        borderRadius: 10,
                      }}
                      onPress={() =>
                        mutate({
                          id: userIdState,
                          [item.name]: !data[item.name],
                        })
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
          </View>
          <Button
            title="Выйти  "
            type="clear"
            color="error"
            titleStyle={{ color: "red" }}
            icon={<Icon name="exit" type="ionicon" size={30} color="red" />}
            iconRight
            onPress={() => setDialogOpen(true)}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginTop: 10,
              marginBottom: 5,
              color: "dimgrey",
            }}
          >
            История тренировок
          </Text>
          <Divider />
          {data.trainings
            .slice(0, -1)
            .reverse()
            .map((e) => (
              <HistoryListItem
               key={'history'+e.id}
                navigation={navigation}
                date={e.datetime_start}
                difficulty={e.difficulty}
                rating={e.rating}
                exercises={e.exercises.map((ex)=>{
                  if(ex.exercise){
                    return {id: ex.exercise.id, image: ex.exercise.image}
                  }else{
                    return {id: null, image: null}
                  }
                })}
              />
            ))}
          <Dialog
            isVisible={dialogOpen}
            onBackdropPress={() => setDialogOpen(false)}
            overlayStyle={{ backgroundColor: "white" }}
          >
            <Text h4 style={{ textAlign: "center", marginBottom: 10 }}>
              Вы уверены?
            </Text>
            <Button
              title="Выйти"
              color="error"
              onPress={() => {
                navigation.addListener("beforeRemove", (e) =>
                  navigation.dispatch(e.data.action)
                )
                navigation.navigate("Authorization")
              }}
            />
          </Dialog>
        </ScrollView>
      </TabView.Item>
    )
}
