import { Icon, Marker as MarkerType } from 'leaflet'
import { Dispatch, SetStateAction, useMemo, useRef } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import icon from '../assets/icon.png'
import { center } from '../constants'

type Props = {
  position: {
    lat: number
    lng: number
  }
  setPosition: Dispatch<
    SetStateAction<{
      lat: number
      lng: number
    }>
  >
}

const AddReportMap = ({ position, setPosition }: Props) => {
  const customIcon = new Icon({
    iconSize: [32, 32],
    iconUrl: icon,
  })

  const markerRef = useRef<MarkerType | null>(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    []
  )

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      className="md:w-1/2"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />

      <Marker
        position={position}
        icon={customIcon}
        ref={markerRef}
        eventHandlers={eventHandlers}
        draggable={true}
      ></Marker>
    </MapContainer>
  )
}
export default AddReportMap
