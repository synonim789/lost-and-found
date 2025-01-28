import ky from 'ky'
import { Icon } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import icon from '../assets/icon.png'
import { ReportType } from '../types'

const MainMap = () => {
  const [reports, setReports] = useState<ReportType[]>([])

  const customIcon = new Icon({
    iconSize: [32, 32],
    iconUrl: icon,
  })

  useEffect(() => {
    const getReports = async () => {
      const { data } = await ky
        .get('http://localhost:3000/report')
        .json<{ data: ReportType[] }>()
      setReports(data)
    }

    getReports()
  }, [])

  return (
    <MapContainer
      center={[52.409538, 16.931992]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      {reports.length > 0 &&
        reports.map((report) => (
          <Marker
            position={[report.latitude, report.longtitude]}
            icon={customIcon}
            key={report.id}
          >
            <Popup>
              <h2>{report.title}</h2>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  )
}
export default MainMap
