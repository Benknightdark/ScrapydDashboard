import NodeInfo from './components/node-info'
import ProjectsInfo from './components/projects-info';
import JobsInfo from './components/jobs-info';
import HistoryJobsInfo from './components/history-jobs-info';


export default function Home() {
  return (
    <div className="container-fluid">
      <div className='row justify-content-center  px-2   no-gutters'>
        <div className='col-md-4  col-sm-12'>
          <div className='row justify-content-center  px-2   no-gutter'>
            <div className="p-3 mt-3 col-md-12  col-sm-12">
              <NodeInfo />
            </div>
          </div>
          <div className='row justify-content-center  px-2   no-gutter'>
            <div className="p-3 mt-3 col-md-12 col-sm-12">
              <ProjectsInfo />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          <JobsInfo />
          <HistoryJobsInfo />
        </div>
      </div>
    </div>
  )
}
