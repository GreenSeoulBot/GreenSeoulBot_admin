'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Box, Typography, Paper, CircularProgress, Button } from '@mui/material'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  title: string
  userId: number
  content: string
  createdAt: string
}

export default function DistrictDetail() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const districtName = searchParams.get('districtName')
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  console.log(districtName) // 이제 undefined가 아닌 실제 값이 출력됩니다.

  useEffect(() => {
    if (id) {
      fetch(`https://koreanjson.com/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Failed to fetch post details:', error)
          setLoading(false)
        })
    }
  }, [id])

  if (loading) return <CircularProgress />
  if (!post) return <Typography>게시물을 찾을 수 없습니다.</Typography>

  const handleDelete = async () => {
    if (!id || !districtName) return

    const confirmDelete = window.confirm('정말로 게시물을 삭제하시겠습니까?')
    if (!confirmDelete) return

    try {
      const response = await fetch(`https://koreanjson.com/posts/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('게시물이 삭제되었습니다.')
        // 삭제 후 새로운 delete 페이지로 이동
        router.push(`/districts/${districtName}/delete?id=${id}&districtName=${districtName}`)
      } else {
        alert('게시물 삭제에 실패했습니다.')
        console.error('Failed to delete post, response status:', response.status)
      }
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h6" color="textSecondary">
          분류
        </Typography>
        <Typography variant="h4">{post.id}</Typography>

        <Typography variant="h6" color="textSecondary">
          제목
        </Typography>
        <Typography variant="h4">{post.title}</Typography>

        <Typography variant="h6" color="textSecondary">
          작성자
        </Typography>
        <Typography variant="subtitle1">{post.userId}</Typography>

        <Typography variant="h6" color="textSecondary">
          내용
        </Typography>
        <Typography variant="body1">{post.content}</Typography>

        <Typography variant="h6" color="textSecondary">
          작성 시간
        </Typography>
        <Typography variant="body1">{new Date(post.createdAt).toLocaleString()}</Typography>
      </Paper>

      <Button
        variant="contained"
        sx={{ marginTop: '20px' }}
        onClick={() => router.push(`/districts/${districtName}/update?id=${id}&districtName=${districtName}`)}
      >
        수정
      </Button>

      <Button
        variant="contained"
        sx={{ marginTop: '20px' }}
        color="error"
        onClick={handleDelete} // 괄호 없이 함수 전달
      >
        삭제
      </Button>
    </Box>
  )
}
