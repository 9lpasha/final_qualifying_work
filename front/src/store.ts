import AsyncStorage from "@react-native-async-storage/async-storage"

export async function storeUserId(id : number) {
  try {
    await AsyncStorage.setItem("@profileId", String(id))
  } catch (e) {
    console.log(e)
  }
}

export async function getStoreUserId() {
  try {
    const value = await AsyncStorage.getItem('@profileId')
    if(value !== null) {
      return +value
    }
  } catch (e) {
    console.log(e)
  }
}
