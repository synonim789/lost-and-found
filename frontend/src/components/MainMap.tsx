import { useQuery } from '@tanstack/react-query'
import { Icon } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { api } from '../api/ky'
import icon from '../assets/icon.png'
import { center } from '../constants'
import { ReportType } from '../types'
import PopupContent from './PopupContent'

const MainMap = () => {
  const customIcon = new Icon({
    iconSize: [32, 32],
    iconUrl: icon,
  })

  const getReports = async (): Promise<ReportType[]> => {
    const { data } = await api.get('report').json<{ data: ReportType[] }>()
    return data
  }

  const { data: reports } = useQuery({
    queryKey: ['allReports'],
    queryFn: getReports,
    initialData: [],
  })

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom={false}
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
              <Popup autoPan={true} autoPanPaddingTopLeft={[50, 150]}>
                <PopupContent report={report} />
              </Popup>
            </Marker>
          )
        })}
    </MapContainer>
  )
}
export default MainMap
