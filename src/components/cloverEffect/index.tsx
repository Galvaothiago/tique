import { GiClover } from "react-icons/gi"

interface CloverProps {
  animation?: boolean
  animationType?: "bounce" | "spin"
  size: "small" | "medium" | "large"
}

export function CloverEffect({
  animation = true,
  size,
  animationType,
}: CloverProps) {
  let newSize = ""
  let type = ""

  switch (size) {
    case "small":
      newSize = "text-xl"
      break
    case "medium":
      newSize = "text-5xl"
      break
    case "large":
      newSize = "text-9xl"
      break
    default:
      newSize = "text-5xl"
      break
  }

  switch (animationType) {
    case "bounce":
      type = "animate-bounce"
      break
    case "spin":
      type = "animate-spin"
      break

    default:
      type = "animate-bounce"
      break
  }

  return (
    <GiClover
      className={`${
        animation && type
      } ${newSize} text-green-500 drop-shadow-lg`}
    />
  )
}
