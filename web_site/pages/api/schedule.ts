import type { NextApiRequest, NextApiResponse } from 'next'
export default async (req: NextApiRequest,res: NextApiResponse) => {
    const project = req?.query['project']?.toString()
    const spider = req?.query['spider']?.toString()
    console.log(project)
    console.log(spider)
    const params = new URLSearchParams();
    params.append('project', project!);
    params.append('spider', spider!);

    const resData = await fetch(`${process.env.SCRAPYD_URL}/schedule.json`,
        {
            body: params,
            method: 'POST'
        }
    )
    console.log(resData.statusText)
    const json = await resData.json()
    res.json(json)
}