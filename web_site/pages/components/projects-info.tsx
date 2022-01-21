import useSWR from "swr";
import { toast } from 'react-toastify';

const fetcher = (url: string) => fetch(url).then(r => r.json())

const projectsData = () => {
  const { data, error, isValidating, mutate } = useSWR(
    '/api/projects',
    fetcher,
    {
      refreshInterval: 60000
    })
  return { data, error, isValidating, mutate }
}
export default function ProjectsInfo() {
  const fetchProjects = projectsData();

  return (
    <div className="card">
      <div className="card-header">
        爬蟲專案資訊
        <span className="material-icons float-right" style={{ cursor: 'pointer' }} onClick={() => {
          fetchProjects.mutate()
        }}>refresh</span>
      </div>
      <div className="card-body">
        <nav className="nav nav-pills flex-column flex-sm-row">
          {
            fetchProjects.data && fetchProjects.data.map((a: any) => {
              return (
                <a className="flex-sm-fill text-sm-center nav-link active"
                  data-toggle="tab" href={'#' + a.project} role="tab"
                  key={a.project}>{a.project}</a>
              )
            })
          }
        </nav>
        <div className="tab-content" id="nav-tabContent">
          {
            fetchProjects.data && fetchProjects?.data.map((a: any) => {
              return (<div className="tab-pane fade show active" id={a.project} role="tabpanel" key={a.project}>
                <ul className="list-group">
                  {
                    a.spiders.map((s: any) => {
                      return (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={s}>
                          {s}
                          <button type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                          focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 
                          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={
                              async () => {
                                try {
                                  const fetchExecJob = await fetch(`/api/schedule?project=${a.project}&spider=${s}`)
                                  const res = await fetchExecJob.json()
                                  // alert(JSON.stringify(res))
                                  toast(JSON.stringify(res));
                                } catch (error) {
                                  toast(String(error))
                                }
                              }
                            }> 執行爬蟲</button>
                        </li>)
                    })
                  }
                </ul>
              </div>)
            })
          }
        </div>
      </div>
    </div>
  )
}