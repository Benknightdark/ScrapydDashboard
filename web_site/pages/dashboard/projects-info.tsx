import useSWR from "swr";
import { toast } from 'react-toastify';
import { FaServer, FaSpider } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { IoServer } from "react-icons/io5";
import { GiSpiderBot } from "react-icons/gi";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import { AiOutlineFullscreenExit } from "react-icons/ai";

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
  const router = useRouter();
  const [cardIcon, setCardIcon] = useState(router.route.includes("dashboard"))
  return (
    <div className="p-3">
      <div className="dark:border-yellow-100 dark:bg-gray-700
    border-gray-900  bg-yellow-100 rounded-lg border-5 shadow-md
    hover:border-orange-500
    dark:hover:border-red-500
    drop-shadow-lg
    ">
        <header className="flex justify-between items-center  p-3 bg-green-200 dark:bg-green-700">
          <div className="flex space-x-2">
            <FaServer className="cardTitleIcon"></FaServer>
            <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">爬蟲專案資訊</h3>
            {
              !cardIcon ? <BsArrowsFullscreen
                className="cardTitleIcon"
                onClick={() => {
                  router.push('/dashboard/projects-info')
                }}
              ></BsArrowsFullscreen> : <AiOutlineFullscreenExit
                className="cardTitleIcon"
                onClick={() => {
                  router.push('/')
                }}
              ></AiOutlineFullscreenExit>
            }
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
                  <button className={`inline-block py-4 px-4 text-sm 
                font-medium text-center text-gray-500 rounded-t-lg
                       border-b-2 border-transparent 
                       hover:text-gray-600 hover:border-gray-300 
                       dark:text-gray-400
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
              let customHeight: string = !cardIcon ? "max-h-80" : ""

              return (
                <div className={`p-2 bg-gray-50 rounded-lg dark:bg-gray-800 ` + isHidden}
                  id={a['project']} role="tabpanel" aria-labelledby={a['project'] + "-tab"} key={a['project'] + "lll"}>
                  <div className="flow-root p-1">
                    <ul role="list" className={`"divide-y divide-gray-500 dark:divide-yellow-200  overflow-y-auto ${customHeight}"`}>
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
    </div>

  )
}

