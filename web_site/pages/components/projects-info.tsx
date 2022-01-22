import useSWR from "swr";
import { toast } from 'react-toastify';
import { FaServer, FaSpider } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { IoServer } from "react-icons/io5";
import { GiSpiderBot } from "react-icons/gi";

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
    <div className="dark:border-yellow-100 dark:bg-gray-700
    border-gray-900  bg-yellow-100 rounded-lg border-5 shadow-md
    hover:border-orange-500
    dark:hover:border-red-500
    drop-shadow-lg
    ">
      <header className="flex justify-between items-center  p-3 bg-green-200 dark:bg-green-700">
        <div className="flex space-x-2">
          <FaServer className="text-sm font-medium text-blue-600 hover:underline
           dark:text-yellow-100 w-5 h-5 hover:cursor-pointer"></FaServer>
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">爬蟲專案資訊</h3>
        </div>
        <FiRefreshCcw className="text-sm font-medium text-blue-600 hover:underline
           dark:text-yellow-100 w-5 h-5 hover:cursor-pointer"
          onClick={() => {
            fetchProjects.mutate()
          }}
        ></FiRefreshCcw>
      </header>

      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px" id="projectTabList" data-tabs-toggle="#projectTabContent" role="tablist">
          {
            fetchProjects.data && fetchProjects?.data.map((a: any, index: number) => {
              let isActive: string = index == 0 ? "active" : "";
              return <li className="mr-2" role="presentation" key={a['project'] + "ll"}>
                <button className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg
                       border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400
                        dark:hover:text-gray-300 `+ isActive}
                  id={a['project'] + "-tab"} data-tabs-target={"#" + a['project']} type="button" role="tab" aria-controls={a['project']}
                  aria-selected="true">
                  {a['project']}
                </button>
              </li>
            })
          }
        </ul>
      </div>
      <div id="projectTabContent">
        {
          fetchProjects.data && fetchProjects?.data.map((a: any, index: number) => {
            let isHidden: string = index == 0 ? "" : "hidden";
            return (
              <div className={`p-2 bg-gray-50 rounded-lg dark:bg-gray-800 ` + isHidden}
                id={a['project']} role="tabpanel" aria-labelledby={a['project'] + "-tab"} key={a['project'] + "lll"}>
                <div className="flow-root p-1">
                  <ul role="list" className="divide-y divide-gray-500 dark:divide-yellow-200">
                    {
                      a['spiders'].map((s: any) => {
                        return <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex space-x-2">
                                <FaSpider className="w-6 h-6 text-gray-800 dark:text-white"></FaSpider>
                                <p className="xl:text-lg md:text-lg lg:text-lg text-sm font-medium text-gray-900 truncate dark:text-white">
                                  {s}
                                </p>
                              </div>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold  ">
                              <button type='button' className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 
                          focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-1 mb-1
                          dark:bg-yellow-200 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500" onClick={
                                  async () => {
                                    try {
                                      const fetchExecJob = await fetch(`/api/schedule?project=${a.project}&spider=${s}`)
                                      const res = await fetchExecJob.json()
                                      toast(JSON.stringify(res));
                                    } catch (error) {
                                      toast(String(error))
                                    }
                                  }
                                }>
                                <div className="flex space-x-2">
                                  <GiSpiderBot className='text-gray-100 dark:text-gray-800 h-5 w-5'></GiSpiderBot>
                                  <span className='text-gray-100 dark:text-gray-800 font-bold'>執行爬蟲</span>
                                </div>
                              </button>
                            </div>
                          </div>
                        </li>
                      })
                    }


                  </ul>
                </div>
              </div>
            )
          })
        }
      </div>


    </div>
    // <div className="card">
    //   <div className="card-header">
    //     爬蟲專案資訊
    //     <span className="material-icons float-right" style={{ cursor: 'pointer' }} onClick={() => {
    //       fetchProjects.mutate()
    //     }}>refresh</span>
    //   </div>
    //   <div className="card-body">
    //     <nav className="nav nav-pills flex-column flex-sm-row">
    //       {
    //         fetchProjects.data && fetchProjects.data.map((a: any) => {
    //           return (
    //             <a className="flex-sm-fill text-sm-center nav-link active"
    //               data-toggle="tab" href={'#' + a.project} role="tab"
    //               key={a.project}>{a.project}</a>
    //           )
    //         })
    //       }
    //     </nav>
    //     <div className="tab-content" id="nav-tabContent">
    //       {
    //         fetchProjects.data && fetchProjects?.data.map((a: any) => {
    //           return (<div className="tab-pane fade show active" id={a.project} role="tabpanel" key={a.project}>
    //             <ul className="list-group">
    //               {
    //                 a.spiders.map((s: any) => {
    //                   return (
    //                     <li className="list-group-item d-flex justify-content-between align-items-center" key={s}>
    //                       {s}
    //                       <button type='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
    //                       focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 
    //                       dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={
    //                           async () => {
    //                             try {
    //                               const fetchExecJob = await fetch(`/api/schedule?project=${a.project}&spider=${s}`)
    //                               const res = await fetchExecJob.json()
    //                               // alert(JSON.stringify(res))
    //                               toast(JSON.stringify(res));
    //                             } catch (error) {
    //                               toast(String(error))
    //                             }
    //                           }
    //                         }> 執行爬蟲</button>
    //                     </li>)
    //                 })
    //               }
    //             </ul>
    //           </div>)
    //         })
    //       }
    //     </div>
    //   </div>
    // </div>
  )
}

{/* <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
          <li className="mr-2" role="presentation">
            <button className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent
             hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 active" id="profile-tab" data-tabs-target="#profile"
             type="button" role="tab" aria-controls="profile" aria-selected="true">Profile</button>
          </li>
          <li className="mr-2" role="presentation">
            <button className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 
            border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 
            active" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard"
             aria-selected="false">Dashboard</button>
          </li>
          <li className="mr-2" role="presentation">
            <button className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg
             border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 
             dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab"
              aria-controls="settings" aria-selected="false">Settings</button>
          </li>
          <li role="presentation">
            <button className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg 
            border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 
            dark:hover:text-gray-300" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" 
            aria-controls="contacts" aria-selected="false">Contacts</button>
          </li>
        </ul>
      </div>
      <div id="myTabContent">
        <div className=" p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the 
          <strong className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
        </div>
        <div className="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
          <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the
           <strong className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
        </div>
        <div className="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="settings" role="tabpanel" aria-labelledby="settings-tab">
          <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the 
          <strong className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
        </div>
        <div className="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
          <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the 
          <strong className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
        </div>
      </div> */}