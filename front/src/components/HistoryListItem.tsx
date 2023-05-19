import { Icon, Image, ListItem, Text } from "@rneui/themed"
import { TouchableOpacity, View } from "react-native"
import { useState } from "react"
import { Props } from "../../App"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

const difficults = ['light', 'normal', 'hard']

export function HistoryListItem({
  navigation,
  date,
  difficulty,
  rating,
  exercises
}: {
  navigation: Props["navigation"]
  date: string
  difficulty: number
  rating: number
  exercises:  {id: number, image:  string}[]
}) {
  const [expanded, setExpanded] = useState(false)
  return (
    <ListItem.Accordion
      bottomDivider
      content={
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500" }}>{date.slice(0, 10)}</Text>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>{difficults[difficulty]}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text h4>{rating}</Text>
              <Icon name="star" type="ionicon" color="#ffc400" size={25} />
            </View>
          </View>
        </View>
      }
      isExpanded={expanded}
      onPress={() => setExpanded(!expanded)}
      icon={<Icon name="chevron-down" type="ionicon" size={35} />}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "center",
          backgroundColor: "white",
          padding: 10,
        }}
      >
        
        {exercises.map((e)=>{
        if(e.id!=null){return<TouchableOpacity onPress={()=>navigation.navigate('Detailed', {id: e.id})}>
          <Image
          style={{
            width: 50,
            height: 50,
            borderColor: "rgb(32, 137, 220)",
            borderWidth: 2,
            borderRadius: 10,
          }}
          source={{
            uri: e.image,
          }}
          
        />
        </TouchableOpacity>}})}
        
      </View>
    </ListItem.Accordion>
  )
}
