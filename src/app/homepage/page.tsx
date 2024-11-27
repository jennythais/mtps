import { Box } from '@mui/material'
import PostPage from '../components/Posts'
import FilterSection from '../components/Posts/FilterSection'
import CreatePost from '../components/Posts/CreatePost'

const Homepage = () => {
  return (
    <div className='bg-homepage' >
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
    </div>
  )
}

export default Homepage