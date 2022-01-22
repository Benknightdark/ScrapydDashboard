import NodeInfo from './components/node-info'
import ProjectsInfo from './components/projects-info';
import JobsInfo from './components/jobs-info';
import HistoryJobsInfo from './components/history-jobs-info';
import { ToastContainer } from 'react-toastify';


export default function Home() {
  return (

    <div className="grid gap-4  xl:grid-cols-2 md:grid-cols-1   sm:grid-cols-1 p-5  bg-slate-50 dark:bg-black">
      <div><NodeInfo /></div>
      <div><ProjectsInfo /></div>
      <div> <JobsInfo /></div>
      <div><HistoryJobsInfo /></div>
      <ToastContainer></ToastContainer>

    </div>
  )
}
