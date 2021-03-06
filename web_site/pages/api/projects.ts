// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const getSpiders = async (resProjects) => {
    let projects = []

    for (let i=0;i<resProjects.projects.length;i++){
        const reqSpiders = await fetch(`${process.env.SCRAPYD_URL}/listspiders.json?project=${resProjects.projects[i]}`)
        const resSpiders = await reqSpiders.json()
        projects.push({ project: resProjects.projects[i], spiders: resSpiders.spiders })
    }

    return projects
}
const getData = async () => {
    let projects: any[] = []
    const reqProjects = await fetch(`${process.env.SCRAPYD_URL}/listprojects.json`)
    const resProjects = await reqProjects.json()
    if (resProjects.projects.length > 0) {
        projects = await getSpiders(resProjects)
    }

    // return projects
    return projects
}
/**
 * 取得每個專案的爬蟲資訊
 */
export default async (req, res) => {
   const  data =await getData();
   res.json(data)
     
}
