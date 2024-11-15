'use client'

import { useSearchParams } from 'next/navigation'
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Pagination } from '@mui/material'
import { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { useRouter } from 'next/navigation'

interface Comment {
  id: number
  title: string
  userId: number
  createdAt: string
}

export default function Districts() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const districtName = searchParams.get('districtName')

  const [commentArray, setCommentArray] = useState<Comment[]>([])

  useEffect(() => {
    fetch('https://koreanjson.com/posts', {
      method: 'GET', //GET method는 기본값이라서 생략이 가능합니다.
    })
      .then((res) => res.json())

      .then((data) => {
        setCommentArray(data)
      })
  }, [])

  // 쿼리스트링에서 전달받은 구 이름들을 배열로 변환
  const selectedDistricts = typeof districtName === 'string' ? districtName.split(',') : []
  console.log(selectedDistricts)

  // const query = selectedDistricts.map(encodeURIComponent).join(',')
  const query = selectedDistricts[0]
  console.log(query)

  const boardDetail = (id: number) => {
    router.push(`/districts/${query}/detail?id=${id}&districtName=${query}`)
  }

  return (
    <Box sx={{ padding: '20px' }}>
      {selectedDistricts.map((district) => (
        <Box key={district} sx={{ marginBottom: 4 }}>
          <Typography variant="h5">{district}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell sx={{ display: 'hidden' }}>
                  체크
                </TableCell> */}
                <TableCell>분류</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>작성자</TableCell>
                <TableCell>시간</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* API 데이터(commentArray)로 테이블 행을 생성 */}
              {commentArray.map((comment) => (
                <TableRow key={comment.id} onClick={() => boardDetail(comment.id)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{/* <Checkbox color="primary" /> */}</TableCell>
                  <TableCell>{comment.title || '제목 없음'}</TableCell>
                  <TableCell>{comment.userId || '작성자 없음'}</TableCell>
                  <TableCell>{new Date(comment.createdAt).toLocaleDateString() || '시간 없음'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      ))}
      <Pagination count={10} />
      {/* 안넘어감 */}
      <Button
        variant="contained"
        sx={{ marginTop: '20px' }}
        onClick={() => router.push(`/districts/write?districtName=${districtName}`)}
      >
        추가
      </Button>
    </Box>
  )
}
