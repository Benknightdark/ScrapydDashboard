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
    <div className="card mt-4 ">
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
                                  cancel
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
    </div>
  );
}
