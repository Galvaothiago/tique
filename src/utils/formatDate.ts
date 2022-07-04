export const getFormatDateResult = (date: string) => {
  const dateToTransform = new Date(date)

  return dateToTransform.toLocaleDateString("pt-br")
}
