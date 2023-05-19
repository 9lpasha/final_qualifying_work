import { Button, Icon, Image, Text } from "@rneui/themed"
import React, { useState, useEffect } from "react"
import { Dimensions, ScrollView, View } from "react-native"
import { Props } from "../../App"
import { getExerciseInfo } from "../api"
import { getStoreUserId } from "../store"
import { DeatiledLikeButton } from "../components/DetailedLikeButton"

const technicSteps = [
  "Возьмитесь руками за перекладину удобным Вам хватом: узким, средним, широким или обратным",
  "Стабилизируйте в висе плечи и лопатки",
  "Выполняйте подтягивание так чтобы грудная клетка тянулась к перекладине, происходит сгибание локтей",
  "В конечной точке нужно чтобы было произведено касание подбородком перекладины",
  "Возвращайтесь в исходную позицию и продолжайте повторения",
]

export function DetailedExercise({route, navigation} : Props) {
  const [infoState, setInfoState] = useState(null)
  const [imageSize, setImageSize] = useState(0)
  useEffect(()=>{
    getExerciseInfo(route.params.id).then(data=>setInfoState(data))
    navigation.setOptions({
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
          titleStyle={{ color: "rgb(32, 137, 220)", fontWeight: 500, fontSize: 18 }}
          iconRight
          onPress={()=>navigation.navigate('Search')}
        />
      ),
    })
  },[])
  
  useEffect(() => {
    if(infoState){
      console.log(infoState)
      Image.getSize(infoState.image, (width, height) => setImageSize(height / width))
    }
  }, [infoState])

  if(infoState) return (
    <View style={{height: '100%', backgroundColor: 'white', flex: 1}}>
      <ScrollView style={{ display: "flex"}} contentContainerStyle={{padding:15}}>
        <Text h4 style={{ textAlign: "center", marginBottom: 10 }}>
          {infoState.title}
        </Text>
        <Text style={{ fontSize: 15 }}>
          Подтягивания — базовое всеми известное популярное упражнение
          выполняемое с собственным весом тела. Упражнение является
          многосуставным и отлично прорабатываем много мышечных групп спины и
          руки. Так же подтягивания укрепляют мышечный корсет и улучшают силовые
          показатели, укрепляются не только мышцы, но и связки и сухожилия.
          Вариантов подтягиваний очень много, существует целый вид спорта —
          воркаут.
        </Text>
        <Text h4 style={{ textAlign: "center", marginVertical: 10 }}>
          Техника выполнения
        </Text>

        <Image
          source={{
            uri: infoState.image,
          }}
          containerStyle={{
            width: "100%",
            height: Dimensions.get("window").width - 10 * imageSize,
            marginBottom: 10,
          }}
        />

        {technicSteps.map((text, index) => (
          <View key={index}>
            <View style={{backgroundColor: 'rgb(32, 137, 220)', borderRadius: 30, padding: 10}} >
              <Text selectionColor={'white'}
                style={{ textAlign: "center", fontSize: 17, fontWeight:'700', color:  'white' }}
              >
                {text}
              </Text>
            </View>

            {index < technicSteps.length - 1 ? (
              <Icon name="arrow-down" type="ionicon" />
            ) : (
              ""
            )}
          </View>
        ))}
      </ScrollView>
      <View>
        <DeatiledLikeButton exerciseId={route.params.id} />
      </View>
    </View>
  )
}
