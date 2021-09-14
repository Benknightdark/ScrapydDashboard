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
        <div className="card mt-4 ">
            <div className="card-header">
                爬蟲歷史作業資訊
                <span className="material-icons float-right" style={{ cursor: 'pointer' }} onClick={() => {
                    fetchHistoryJobs.mutate()
                }}>refresh</span>
            </div>


            <div className="card-body">
                <nav className="nav nav-pills flex-column flex-sm-row">

                    {
                        fetchHistoryJobs.data && fetchHistoryJobs.data.map((a: any) => {
                            return (
                                <a className="flex-sm-fill text-sm-center nav-link active"
                                    data-toggle="tab" href={'#' + a.name} role="tab"
                                    key={a.name}>{a.name}</a>
                            )

                        })
                    }
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    {
                        fetchHistoryJobs.data && fetchHistoryJobs?.data.map((a: any) => {
                            return (<div className="tab-pane fade show active" id={a.name} role="tabpanel" key={a.name}>
                                <ul className="list-group">
                                    {
                                        a.jobs.map((s: any) => {
                                            return (
                                                <li className="list-group-item" key={s.id}>
                                                    <div className='row'>
                                                        <div className='col'>
                                                            {s.name}
                                                        </div>
                                                        <div className='col'>
                                                            {s.create_time}
                                                        </div>
                                                        <div className='col'>
                                                            <button type='button' className={"btn btn-" + s.reason}>{s.reason}</button>
                                                        </div>

                                                        <div className='col'>
                                                            <a href={`/api/logs?project=${a.name}&spider=${s.name}&id=${s.id}&type=history`} className='btn btn-info' target='_blank'>下載Log</a>
                                                        </div>
                                                    </div>
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