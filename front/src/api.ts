import axios from "axios"

const instance = axios.create({
  // withCredentials: true,
  baseURL: "http://185.225.35.213:3000",
})

export function registration(regData) {
  return instance.post("/auth/registration", regData).then((res) => res.data)
}

export function authorization(authData: { email: string; password: string }) {
  return instance.post("/auth/in", authData).then((res) => res.data)
}

export function logout(email: string) {
  return instance.post(`/auth/out?email=${email}`).then((res) => res.data)
}

export function getUserById(id: number) {
  if (id != null) {
    return instance.get(`/users/one?id=${id}`).then((res) => res.data)
  }
}

export function getExerciseInfo(id: number) {
  return instance.get(`/exercises/one?id=${id}`).then((res) => res.data)
}

export function updateUser(updateData) {
  return instance.put("/users/update", updateData).then((res) => res.data)
}

export function getAllExercisesByGroup(id: number) {
  if (id == 0) {
    return instance.get(`/exercises/all`).then((res) =>
      res.data.map((e) => ({
        id: e.id,
        title: e.title,
      }))
    )
  }
  return instance.get(`/exercises/by-muscle-group?id=${id - 1}`).then((res) =>
    res.data.map((e) => ({
      id: e.id,
      title: e.title,
    }))
  )
}

export function getTraining(userId: number) {
  return instance
    .get(`/users/rec-training?userId=${userId}`)
    .then((res) => res.data.exercises.map((e) => e.exercise.id))
}

export function getFavorites(userId: number) {
  return instance
    .get(`/favorite-exercises/by-user?id=${userId}`)
    .then((res) => res.data.map((e) => e.exercise.id))
}

export function checkForLike(userId: number, exerciseId: number) {
  return instance
    .get(`/favorite-exercises/by-user?id=${userId}`)
    .then((res) => res.data.map((e) => e.exercise.id).includes(exerciseId))
}

export function likeOnOff(userId: number, exerciseId: number, liked: boolean) {
  if (liked)
    return instance.post(
      `/users/remove-favorite-exercise?userId=${userId}&exerciseId=${exerciseId}`
    ).then(res=>res.data)
  return instance.post(
    `/users/add-favorite-exercise?userId=${userId}&exerciseId=${exerciseId}`
  ).then(res=>res.data)
}

export function finishTraining(userId: number, difficulty: number, rating:number) {
  console.log(userId, difficulty, rating)
  return instance
    .post(`/users/rec-training?userId=${userId}`, {difficulty, rating})
    .then((res) => res.data)
}
