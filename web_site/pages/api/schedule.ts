// const fetch = require('node-fetch');
// const { URLSearchParams } = require('url');

export default async (req, res) => {
    const project = req.query['project']
    const spider = req.query['spider']
    console.log(project)
    console.log(spider)
    const params = new URLSearchParams();
    params.append('project', project);
    params.append('spider', spider);

    const resData = await fetch(`${process.env.SCRAPYD_URL}/schedule.json`,
        {
            body: params,
            method: 'POST'
        }

    )//http://api:8080/
    const json = await resData.json()
    res.json(json)
}