import { Button } from "@rneui/themed"

export function CustomButton({color, onPress, title, icon, style}) {
  return (
    <Button
      buttonStyle={{
        margin: 15,
        borderRadius: 15,
        backgroundColor: color,
      }}
      title={title}
      icon = {icon}
      titleStyle={{ fontSize: 20, fontWeight: "700", letterSpacing: 2 }}
      onPress={onPress}
      style={{position: 'absolute', top: 10, left: 10}}
    />
  )
}
