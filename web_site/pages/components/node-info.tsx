import useSWR from "swr";

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

        <div className="bg-white rounded-lg border shadow-md p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">爬蟲節點資訊</h3>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    View all
                </a>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Neil Sims
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                $320
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

       
    )
}





 {/* <div classNameName="card">
        //     <div classNameName="card-header">
        //         爬蟲節點資訊
        //         <span classNameName="material-icons float-right"
        //             style={{ cursor: 'pointer' }}
        //             onClick={() => {
        //                 fetchDaemonStatus.mutate()
        //             }}>refresh</span>
        //     </div>
        //     <div classNameName="card-body">
        //         <ul classNameName="list-group">
        //             <li classNameName="list-group-item d-flex justify-content-between align-items-center">
        //                 節點名稱   <span classNameName="badge bg-primary rounded-pill">{fetchDaemonStatus.data?.node_name}</span>
        //             </li>
        //             <li classNameName="list-group-item d-flex justify-content-between align-items-center">
        //                 節點狀態   <span classNameName="badge bg-info rounded-pill">{fetchDaemonStatus.data?.status}</span>
        //             </li>
        //             <li classNameName="list-group-item d-flex justify-content-between align-items-center">
        //                 爬蟲作業等待完成總數量   <span classNameName="badge bg-warning rounded-pill">{fetchDaemonStatus.data?.pending}</span>
        //             </li>
        //             <li classNameName="list-group-item d-flex justify-content-between align-items-center">
        //                 爬蟲作業已完成總數量   <span classNameName="badge bg-success rounded-pill">{fetchDaemonStatus.data?.finished}</span>
        //             </li>
        //         </ul>
        //     </div>
        // </div> */}