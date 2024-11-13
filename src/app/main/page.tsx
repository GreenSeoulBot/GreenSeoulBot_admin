'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { Sheet } from '@mui/joy'

export default function Main() {
  const router = useRouter()
  const district = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ]

  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(
    district.reduce((acc, name) => {
      acc[name] = false
      return acc
    }, {} as Record<string, boolean>)
  )

  const handleCheckboxChange = (name: string) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }))
  }

  const handleSubmit = () => {
    const selectedDistricts = Object.keys(checkedState).filter((name) => checkedState[name])
    const query = selectedDistricts.map(encodeURIComponent).join(',')
    router.push(`/districts?districtName=${query}`)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Sheet
          variant="outlined"
          sx={{
            width: '70rem',
            maxHeight: 400,
            overflowY: 'auto',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            flexWrap: 'wrap',
            alignContent: 'space-around',
          }}
        >
          {district.map((name) => (
            <FormControlLabel
              key={name}
              control={<Checkbox checked={checkedState[name]} onChange={() => handleCheckboxChange(name)} />}
              label={name}
            />
          ))}
        </Sheet>
      </Box>
      <Button variant="contained" sx={{ marginTop: '20px' }} onClick={handleSubmit}>
        확인하기
      </Button>
    </Box>
  )
}
