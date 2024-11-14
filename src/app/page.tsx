'use client'

import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [form, setForm] = useState({
    id: '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  console.log(form.id)
  console.log(form.password)

  return (
    <Box component="form" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="ID"
        name="id"
        variant="standard"
        sx={{ width: '300px' }}
        value={form.id}
        onChange={handleChange}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        variant="standard"
        sx={{ width: '300px' }}
        value={form.password}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        disableElevation
        sx={{ width: '300px', marginTop: '50px' }}
        onClick={() => router.push('/districts')}
      >
        로그인
      </Button>
    </Box>
  )
}
