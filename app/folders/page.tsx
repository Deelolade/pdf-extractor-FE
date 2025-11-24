import DashboardSidebar from '../components/DashboardSidebar'
import FoldersList from '../components/FolderList'
// import UploadedDocumentList from '../components/UploadedDocumentList'

const page = () => {
  return (
    <main className='flex justify-between items-start '>
      <DashboardSidebar/>
      <FoldersList/>
    </main>
  )
}

export default page
