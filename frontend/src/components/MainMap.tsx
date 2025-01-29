import ky from 'ky'
import { Icon } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import icon from '../assets/icon.png'
import { center } from '../constants'
import { ReportType } from '../types'
import PopupContent from './PopupContent'

const MainMap = () => {
  const [reports, setReports] = useState<ReportType[]>([])

  const customIcon = new Icon({
    iconSize: [32, 32],
    iconUrl: icon,
  })

  const getReports = async () => {
    const { data } = await ky
      .get('http://localhost:3000/report')
      .json<{ data: ReportType[] }>()
    console.log(data)

    setReports(data)
  }

  useEffect(() => {
    getReports()
  }, [])

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      {reports.length > 0 &&
        reports.map((report) => {
          return (
            <Marker
              position={[report.latitude, report.longtitude]}
              icon={customIcon}
              key={report.id}
            >
              <Popup>
                <PopupContent report={report} getReports={getReports} />
              </Popup>
            </Marker>
          )
        })}
    </MapContainer>
  )
}
export default MainMap
