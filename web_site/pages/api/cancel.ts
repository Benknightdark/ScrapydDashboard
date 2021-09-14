
export default async (req:any, res:any) => {
    const project = req.query['project']
    const spider = req.query['spider']
    console.log(project)
    console.log(spider)
    const params = new URLSearchParams();
    params.append('project', project);
    params.append('spider', spider);

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