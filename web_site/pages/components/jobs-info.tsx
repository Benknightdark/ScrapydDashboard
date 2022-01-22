import { FaServer, FaSpider } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { GiSpiderBot } from "react-icons/gi";
import { toast } from "react-toastify";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const jobsData = () => {
  const { data, error, isValidating, mutate } = useSWR("/api/jobs", fetcher, {
    refreshInterval: 60000,
  });
  return { data, error, isValidating, mutate };
};
export default function JobsInfo() {
  const fetchJobs = jobsData();

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
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">爬蟲作業資訊</h3>
        </div>
        <FiRefreshCcw className="text-sm font-medium text-blue-600 hover:underline
                     dark:text-yellow-100 w-5 h-5 hover:cursor-pointer"
          onClick={() => {
            fetchJobs.mutate()
          }}
        ></FiRefreshCcw>
      </header>
      <div id="projectInfoTabContent">
        {
          fetchJobs.data && fetchJobs?.data.map((a: any, index: number) => {
            let isHidden: string = index == 0 ? "" : "hidden";
            return (
              <div className={`p-2 bg-gray-50 rounded-lg dark:bg-gray-800 ` + isHidden}
                id={a['project']} role="tabpanel" aria-labelledby={a['project'] + "-tab"} key={a['project'] + "lll"}>
                <div className="flow-root p-1">
                  <ul role="list" className="divide-y divide-gray-500 dark:divide-yellow-200">
                    {
                      a['jobs'].map((s: any) => {
                        return <li className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex space-x-2">
                                <FaSpider className="self-center w-6 h-6 text-gray-800 dark:text-white"></FaSpider>
                                <p className="self-center xl:text-lg md:text-lg lg:text-lg text-sm font-medium text-gray-900 truncate dark:text-white">
                                  {s['spider']}
                                </p>
                                <div className="lg:flex xl:flex md:flex flex-col hidden">
                                  <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 
                                px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                    開始: {s.start_time && s.start_time.split(".")[0]}
                                  </span>
                                  <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 
                                px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 self-center">
                                    |
                                  </span>
                                  <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 
                                px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                    結束: {s.end_time && s.end_time.split(".")[0]}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold  ">
                              <button type='button' className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 
                          focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-1 mb-1
                          dark:bg-yellow-200 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500">
                                <div className="flex space-x-2">
                                  <GiSpiderBot className='text-gray-100 dark:text-gray-800 h-5 w-5'></GiSpiderBot>
                                  <span className='text-gray-100 dark:text-gray-800 font-bold'>{s['type']}</span>
                                </div>
                              </button>

                              <a
                                href={`/api/logs?project=${a.project}&spider=${s.spider}&id=${s.id}`}
                                className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 
                                focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-1 mb-1
                                dark:bg-yellow-200 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500"
                                target="_blank"
                              >
                                下載Log
                              </a>
                              {
                                s.type != 'finished' && <button type='button' className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 
                                focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-1 mb-1
                                dark:bg-yellow-200 dark:hover:bg-yellow-400 dark:focus:ring-yellow-500"
                                  onClick={
                                    async () => {
                                      console.log(s)
                                      try {
                                        const fetchExecJob = await fetch(`/api/cancel?project=${a.project}&job=${s.id}`)
                                        const res = await fetchExecJob.json()
                                        alert(JSON.stringify(res))
                                      } catch (error) {
                                        alert(error)
                                      }
                                    }
                                  }
                                >

                                  <div className="flex space-x-2">
                                    <GiSpiderBot className='text-gray-100 dark:text-gray-800 h-5 w-5'></GiSpiderBot>
                                    <span className='text-gray-100 dark:text-gray-800 font-bold'>取消爬蟲任務</span>
                                  </div>
                                </button>
                              }


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
  );
}



{/* <div className="card mt-4 ">
<div className="card-header">爬蟲作業資訊
  <span className="material-icons float-right" style={{ cursor: 'pointer' }} onClick={() => {
    fetchJobs.mutate()
  }}>refresh</span>
</div>
<div className="card-body">
  <nav className="nav nav-pills flex-column flex-sm-row">
    {fetchJobs.data &&
      fetchJobs.data.map((a: any) => {
        return (
          <a
            className="flex-sm-fill text-sm-center nav-link active"
            data-toggle="tab"
            href={"#" + a.project}
            role="tab"
            key={a.project}
          >
            {a.project}
          </a>
        );
      })}
  </nav>
  <div className="tab-content" id="nav-tabContent">
    {fetchJobs.data &&
      fetchJobs?.data.map((a: any) => {
        return (
          <div
            className="tab-pane fade show active"
            id={a.project}
            role="tabpanel"
            key={a.project}
          >
            <ul className="list-group">
              {a.jobs.map((s: any) => {
                return (
                  <li className="list-group-item" key={s.id}>
                    <div className="row">
                      <div className="col">{s.spider}</div>
                      <div className="col">
                        {s.start_time && s.start_time.split(".")[0]}
                      </div>
                      <div className="col">
                        {s.end_time && s.end_time.split(".")[0]}
                      </div>
                      <div className="col">
                        <button type="button" className={"btn " + s.btn}>
                          {s.type}
                        </button>
                      </div>

                      <div className="col">
                        {s.type != 'finished' &&
                          <button type="button" className='btn btn-secondary' onClick={
                            async () => {
                              console.log(s)
                              try {
                                const fetchExecJob = await fetch(`/api/cancel?project=${a.project}&job=${s.id}`)
                                const res = await fetchExecJob.json()
                                alert(JSON.stringify(res))
                              } catch (error) {
                                alert(error)
                              }
                            }
                          }>
                            取消爬蟲任務
                          </button>
                        }
                        <a
                          href={`/api/logs?project=${a.project}&spider=${s.spider}&id=${s.id}`}
                          className="btn btn-info"
                          target="_blank"
                        >
                          下載Log
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
  </div>
</div>
</div> */}