import { Box } from '@mui/material'
import PostPage from '../components/Posts'
import FilterSection from '../components/Posts/FilterSection'
import CreatePost from '../components/Posts/CreatePost'

const Homepage = () => {
  return (
    <Box sx={{
      backgroundColor: '#F4F6FF'
    }}>
      <Box sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'space-between',
        px: 4
      }}>
        <FilterSection />
        <CreatePost />
      </Box>
      <PostPage />
    </Box>
  )
}

export default Homepage