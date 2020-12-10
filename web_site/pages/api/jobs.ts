import * as _ from "lodash";

const getJobs = async (resProjects) => {
    let projects = []

    for (let i = 0; i < resProjects.projects.length; i++) {
        const reqJobs = await fetch(`${process.env.SCRAPYD_URL}/listjobs.json?project=${resProjects.projects[i]}`)
        let resJobs = await reqJobs.json()
        let jobs = [];
        if (resJobs?.pending.length > 0) {
            for (let i = 0; i < resJobs?.pending.length; i++) {
                resJobs.pending[i]['type'] = 'pending'
                resJobs.pending[i]['btn'] = 'btn-warning'
                jobs.push(resJobs.pending[i])
            }
        }
        if (resJobs?.running.length > 0) {
            for (let i = 0; i < resJobs?.running.length; i++) {
                resJobs.running[i]['type'] = 'running'
                resJobs.running[i]['btn'] = 'btn-danger'

                jobs.push(resJobs.running[i])
            }
        }
        if (resJobs?.finished.length > 0) {
            for (let i = 0; i < resJobs?.finished.length; i++) {
                resJobs.finished[i]['type'] = 'finished'
                resJobs.finished[i]['btn'] = 'btn-success'

                jobs.push(resJobs.finished[i])
            }
        }
        const sortedJobs = _.sortBy(jobs, 'start_time').reverse();
        projects.push({ project: resProjects.projects[i], jobs: sortedJobs })

    }

    return projects
}
const getData = async () => {
    let projects: any[] = []
    const reqProjects = await fetch(`${process.env.SCRAPYD_URL}/listprojects.json`)
    const resProjects = await reqProjects.json()
    if (resProjects.projects.length > 0) {
        projects = await getJobs(resProjects)
    }
    return projects
}
/**
 * 取得爬蟲作業資訊
 */
export default async (req, res) => {
    const data = await getData();
    res.json(data)
}

