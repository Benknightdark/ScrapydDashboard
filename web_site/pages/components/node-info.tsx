import useSWR from "swr";
import { FiRefreshCcw } from 'react-icons/fi'
import { IoServer } from 'react-icons/io5'
import { AiOutlineBarChart, AiFillCheckCircle } from 'react-icons/ai'
import { MdOutlinePendingActions } from 'react-icons/md'
import { Fragment } from "react";
import { FaServer } from "react-icons/fa";
const fetcher = (url: string) => fetch(url).then(r => r.json())

const daemonStatusData = () => {
    const { data, error, isValidating, mutate } = useSWR(
        '/api/daemonstatus'
        , fetcher, {
        refreshInterval: 60000
    })
    return { data, error, isValidating, mutate }
}
export default function NodeInfo() {
    const fetchDaemonStatus = daemonStatusData();

    return (
        <Fragment>
            <div className="dark:border-yellow-100 dark:bg-gray-700  border-gray-900  bg-white rounded-lg border-5 shadow-md">
                <header className="flex justify-between items-center  p-3 bg-green-200 dark:bg-green-700">
                    <div className="flex space-x-2">
                        <FaServer className="text-sm font-medium text-blue-600 hover:underline
                     dark:text-yellow-100 w-5 h-5 hover:cursor-pointer"></FaServer>
                        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">爬蟲節點資訊</h3>
                    </div>
                    <FiRefreshCcw className="text-sm font-medium text-blue-600 hover:underline
                     dark:text-yellow-100 w-5 h-5 hover:cursor-pointer"
                        onClick={() => {
                            fetchDaemonStatus.mutate()
                        }}
                    ></FiRefreshCcw>
                </header>

                <div className="flow-root p-3">
                    <ul role="list" className="divide-y divide-gray-500 dark:divide-yellow-200">
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex space-x-2">
                                        <IoServer className="w-6 h-6 text-gray-800 dark:text-white"></IoServer>
                                        <p className="xl:text-lg md:text-lg lg:text-lg text-sm font-medium text-gray-900 truncate dark:text-white">
                                            節點名稱
                                        </p>
                                    </div>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <span className="bg-blue-100 text-blue-800 xl:text-lg md:text-lg lg:text-lg text-sm font-medium mr-2 px-2.5
                                     py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{fetchDaemonStatus.data?.node_name}</span>
                                </div>
                            </div>
                        </li>
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex space-x-2">
                                        <AiOutlineBarChart className="w-6 h-6 text-gray-800 dark:text-white"></AiOutlineBarChart>
                                        <p className="xl:text-lg md:text-lg lg:text-lg text-sm font-medium text-gray-900 truncate dark:text-white">
                                            節點狀態
                                        </p>
                                    </div>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <span className="bg-blue-100 text-blue-800 xl:text-lg md:text-lg lg:text-lg text-sm font-medium mr-2 px-2.5
                                     py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{fetchDaemonStatus.data?.status}</span>
                                </div>
                            </div>
                        </li>
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex space-x-2">
                                        <AiFillCheckCircle className="w-6 h-6 text-gray-800 dark:text-white"></AiFillCheckCircle>
                                        <p className="xl:text-lg md:text-lg lg:text-lg text-sm font-medium text-gray-900 truncate dark:text-white">
                                            爬蟲作業已完成總數量
                                        </p>
                                    </div>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <span className="bg-yellow-100 text-yellow-800 xl:text-lg md:text-lg lg:text-lg text-sm font-medium mr-2 px-2.5
                                     py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-800">{fetchDaemonStatus.data?.finished}</span>
                                </div>
                            </div>
                        </li>
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex space-x-2">
                                        <MdOutlinePendingActions className="w-6 h-6 text-gray-800 dark:text-white"></MdOutlinePendingActions>
                                        <p className="xl:text-lg md:text-lg lg:text-lg text-sm font-medium text-gray-900 truncate dark:text-white">
                                            爬蟲作業等待完成總數量
                                        </p>
                                    </div>

                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">

                                    <span className="bg-green-100 text-green-800 xl:text-lg md:text-lg lg:text-lg text-sm font-medium mr-2 px-2.5 py-0.5
                                 rounded dark:bg-green-200 dark:text-green-900">{fetchDaemonStatus.data?.pending}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>

    )
}





