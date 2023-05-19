import { Image, Card, Text, AirbnbRating, Button } from "@rneui/themed"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { getExerciseInfo } from "../api"
const muscleGroup = "Back"
const muscleImage = require("../img/muscle.png")
const energyImage = require("../img/energy.png")

export function CurrentTrainingsCard({ id }: { id: number }) {
  const [infoState, setInfoState] = useState(null)
  useEffect(()=>{
    getExerciseInfo(id).then(data=>setInfoState(data))
  },[])
  if(infoState) return (
    <Card containerStyle={{ paddingLeft: 0, borderRadius: 15 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Image
          style={{flex: 1, width: 120, height: 120, resizeMode: 'contain', flexShrink: 2}}
          source={{
            uri: infoState.image,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 10 }}>
            {infoState.title}
          </Text>
          <View style={{marginLeft: -10}}>
            <Text style={{fontSize: 13, fontWeight: "700", marginLeft: 10, marginBottom: 10 }}>Muscle group: {infoState.muscleGroup.title}</Text>
            <AirbnbRating
            reviews={[
              "Dificulty",
              "Dificulty",
              "Dificulty",
              "Dificulty",
              "Dificulty",
            ]}
            defaultRating={Math.ceil(infoState.difficulty/2)}
            size={20}
            reviewSize={13}
            ratingContainerStyle={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
            reviewColor="black"
            starImage={muscleImage}
            selectedColor="#FF5816"
            
            isDisabled
          />
          <AirbnbRating
            reviews={[
                'Energy',
                'Energy',
                'Energy',
                'Energy',
                'Energy',
            ]}
            defaultRating={3}
            size={20}
            reviewSize={13}
            ratingContainerStyle={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
            reviewColor="black"
            starImage={energyImage}
            selectedColor="#FFC516"
            isDisabled
          />
          </View>
          
        </View>
      </View>
    </Card>
  )

  return <></>
  
}
