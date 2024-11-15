// 파일 경로: /src/app/districts/[districtName]/update/page.tsx

'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  title: string
  userId: number
  content: string
}

export default function UpdatePost() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname() // 경로를 가져오기 위한 훅
  const id = searchParams.get('id')

  // 경로에서 `districtName` 추출
  const districtName = pathname.split('/')[2] // 경로가 /districts/[districtName]/update이므로 [2]가 districtName

  const [post, setPost] = useState<Post | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      console.log('Fetching post details for ID:', id)
      fetch(`https://koreanjson.com/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data)
          setTitle(data.title)
          setContent(data.content)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Failed to fetch post details:', error)
          setLoading(false)
        })
    }
  }, [id])

  const handleUpdate = async () => {
    console.log('ID:', id, 'DistrictName:', districtName)

    if (!id || !districtName) {
      console.warn('ID 또는 districtName이 없습니다. 함수 종료')
      return
    }

    try {
      const response = await fetch(`https://koreanjson.com/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })

      if (response.ok) {
        alert('게시물이 수정되었습니다.')
        router.push(`/districts/list?districtName=${districtName}`)
      } else {
        alert('수정에 실패했습니다.')
        console.warn('Failed to update post, response status:', response.status)
      }
    } catch (error) {
      console.error('Failed to update post:', error)
    }
  }

  if (loading) return <CircularProgress />
  if (!post) return <Typography>게시물을 찾을 수 없습니다.</Typography>

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        게시물 수정
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
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        수정 완료
      </Button>
    </Box>
  )
}
