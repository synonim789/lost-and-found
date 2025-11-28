export const getImage = (imageName: string) => {
  return `${import.meta.env.VITE_BACKEND_URL}${imageName}`
}
