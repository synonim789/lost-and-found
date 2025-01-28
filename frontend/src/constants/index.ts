export const center = {
  lat: 52.409538,
  lng: 16.931992,
}

type TypeOfReport = {
  label: string
  value: string
  color: string
}

export const REPORT_TYPE: TypeOfReport[] = [
  {
    label: 'Found',
    value: 'FOUND',
    color: 'text-blue-400',
  },
  {
    label: 'Lost',
    value: 'LOST',
    color: 'text-red-500',
  },
]
