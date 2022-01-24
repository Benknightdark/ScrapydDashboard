import { AiOutlineBarChart } from "react-icons/ai";
import { FaServer, FaSpider } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { toast } from "react-toastify";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json())

const historyJobsData = () => {
    const { data, error, isValidating, mutate } = useSWR(
        '/api/history-jobs',
        fetcher,
        {
            refreshInterval: 60000
        })
    return { data, error, isValidating, mutate }
}
export default function HistoryJobsInfo() {
    const fetchHistoryJobs = historyJobsData();

    return (

            <div className="dark:border-yellow-100 dark:bg-gray-700
              border-gray-900  bg-red-100 rounded-lg border-5 shadow-md
              hover:border-orange-500
              dark:hover:border-red-500
              drop-shadow-lg
              ">
      <header className="flex justify-between items-center  p-3 bg-green-200 dark:bg-green-700">
        <div className="flex space-x-2">
          <FaServer className="text-sm font-medium text-blue-600 hover:underline
                     dark:text-yellow-100 w-5 h-5 hover:cursor-pointer"></FaServer>
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">爬蟲歷史作業資訊</h3>
        </div>
        <FiRefreshCcw className="text-sm font-medium text-blue-600 hover:underline
                     dark:text-yellow-100 w-5 h-5 hover:cursor-pointer"
          onClick={() => {
            fetchHistoryJobs.mutate()
          }}
        ></FiRefreshCcw>
      </header>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px" id="projectTabList" data-tabs-toggle="#jobTabContent" role="tablist">
          {
            fetchHistoryJobs.data && fetchHistoryJobs?.data.map((a: any, index: number) => {
              let isActive: string = index == 0 ? "active" : "";
              return <li className="mr-2" role="presentation" key={a['project'] + "ll"}>
                <button className={`inline-block py-4 px-4 text-sm 
                font-medium text-center text-gray-500 rounded-t-lg
                       border-b-2 border-transparent 
                       hover:text-gray-600 hover:border-gray-300 
                       dark:text-gray-400
                        dark:hover:text-gray-300 `+ isActive}
                  id={a['name'] + "-tab"} data-tabs-target={"#" + a['name']} type="button" role="tab" aria-controls={a['name']}
                  aria-selected="true">
                  {a['name']}
                </button>
              </li>
            })  
          }
        </ul>
      </div>
      <div id="jobTabContent">
        {
          fetchHistoryJobs.data && fetchHistoryJobs?.data.map((a: any, index: number) => {
            let isHidden: string = index == 0 ? "" : "hidden";
            return (
              <div className={`p-2 bg-gray-50 rounded-lg dark:bg-gray-800 ` + isHidden}
                id={a['name']} role="tabpanel" aria-labelledby={a['name'] + "-tab"} key={a['name'] + "lll"}>
                <div className="flow-root p-1">
                  <ul role="list" className="divide-y divide-gray-500 dark:divide-yellow-20 overflow-y-auto h-96">
                    {
                      a['jobs'].map((s: any) => {
                        return <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex space-x-2">
                                <FaSpider className="self-center w-6 h-6 text-gray-800 dark:text-white"></FaSpider>
                                <p className="self-center xl:text-lg md:text-lg lg:text-lg text-sm font-medium text-gray-900 truncate dark:text-white">
                                  {s['name']}
                                </p>
                                  {s.create_time && <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 
                                px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                    任務完成時間: {s.create_time}
                                  </span>}
                              </div>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold  ">
                              <button type='button' className={s['type'] + "Btn"}>
                                <div className="flex space-x-2">
                                  <AiOutlineBarChart className='text-gray-100 dark:text-gray-800 h-5 w-5'></AiOutlineBarChart>
                                  <span className='text-gray-100 dark:text-gray-800 font-bold'>狀態: {s['type']}</span>
                                </div>
                              </button>
                              <a
                                href={`/api/logs?project=${a.name}&spider=${s.name}&id=${s.id}&type=history`}
                                className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 
                                focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-1 mb-1
                                dark:bg-yellow-200 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500"
                                target="_blank"
                              >
                                <span className='text-gray-100 dark:text-gray-800 font-bold'>下載Log</span></a>
                              
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
       
    )
}