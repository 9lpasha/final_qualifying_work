import { Button, Dialog } from "@rneui/themed"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { checkForLike, likeOnOff } from "../api"
import { getStoreUserId } from "../store"

export function DeatiledLikeButton({ exerciseId }: { exerciseId: number }) {
  console.log("button" + exerciseId)
  const [loadingState, setLoadingState] = useState(true)
  const [userIdState, setUserIdState] = useState(null)
  useEffect(() => {
    getStoreUserId().then((data) => setUserIdState(data))
  }, [])
  const queryClient = useQueryClient()
  const { data, refetch } = useQuery({
    queryFn: () => checkForLike(userIdState, exerciseId, data),
    onSuccess: () => setLoadingState(false),
    queryKey: ["likeButton", userIdState],
  })

  const {mutate} = useMutation({
    mutationFn: ()=>likeOnOff(userIdState, exerciseId, data),
    onMutate: ()=>setLoadingState(true),
    onSuccess: () => {
        console.log('success')
        queryClient.refetchQueries({ type: 'active'})
        // queryClient.invalidateQueries({ queryKey: ["likeButton", "favorites"] })
      },
  })

  if (data!=undefined && !loadingState)
    return (
      <Button
        buttonStyle={{
          backgroundColor: data ? "red" : "grey",
          height: 62,
        }}
        title={data ? "Liked" : "Add to favorites"}
        icon={{ name: "heart", type: "ionicon", color: "white", size: 30 }}
        titleStyle={{ fontSize: 20, fontWeight: "700", letterSpacing: 2 }}
        onPress={()=>mutate()}
      />
    )
  return <Dialog.Loading />
}
