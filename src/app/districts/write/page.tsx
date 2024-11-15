'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'

export default function WritePost() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const districtName = searchParams.get('districtName') // 쿼리에서 districtName 가져오기

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!title || !content || !districtName) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('https://koreanjson.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          userId: 1, // 사용자 ID는 예제로 고정
          districtName,
        }),
      })

      if (response.ok) {
        alert('게시글이 작성되었습니다.')
        router.push(`/districts/list?districtName=${districtName}`)
      } else {
        alert('게시글 작성에 실패했습니다.')
      }
    } catch (error) {
      console.error('Failed to submit post:', error)
      alert('게시글 작성 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        게시글 작성
      </Typography>
      <TextField fullWidth label="제목" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
      <TextField
        fullWidth
        label="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? '작성 중...' : '작성'}
      </Button>
    </Box>
  )
}
