// pages/[district]/write.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Box, Typography } from '@mui/material'

export default function WritePage() {
  const router = useRouter()
  // const { district } = router.query // URL의 district 값을 가져옴

  return (
    <Box sx={{ padding: '20px' }}>
      {/* <Typography variant="h4">{district} 글쓰기 페이지</Typography> */}
      <p>글적기</p>
      {/* 글쓰기 페이지에 필요한 추가 내용 작성 */}
    </Box>
  )
}
