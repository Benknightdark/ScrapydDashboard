import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then(r => r.json())

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
        <div className="card">
            <div className="card-header">
                爬蟲節點資訊
                <span className="material-icons float-right"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        fetchDaemonStatus.mutate()
                    }}>refresh</span>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        節點名稱   <span className="badge bg-primary rounded-pill">{fetchDaemonStatus.data?.node_name}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        節點狀態   <span className="badge bg-info rounded-pill">{fetchDaemonStatus.data?.status}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        爬蟲作業等待完成總數量   <span className="badge bg-warning rounded-pill">{fetchDaemonStatus.data?.pending}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        爬蟲作業已完成總數量   <span className="badge bg-success rounded-pill">{fetchDaemonStatus.data?.finished}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}