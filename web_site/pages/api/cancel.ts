
export default async (req:any, res:any) => {
    const project = req.query['project']
    const job = req.query['job']
    console.log(project)
    console.log(job)
    const params = new URLSearchParams();
    params.append('project', project);
    params.append('job', job);

    const resData = await fetch(`${process.env.SCRAPYD_URL}/cancel.json`,
        {
            body: params,
            method: 'POST'
        }
    )
    console.log(resData.statusText)
    const json = await resData.json()
    res.json(json)
}