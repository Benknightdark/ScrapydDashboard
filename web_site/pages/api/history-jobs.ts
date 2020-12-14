import { MongoClient } from 'mongodb'
import * as _ from "lodash";

export default async (req, res) => {
    let projects: any[] = []
    const reqProjects = await fetch(`${process.env.SCRAPYD_URL}/listprojects.json`)
    const resProjects = await reqProjects.json()
    // res.json(resProjects)
    for (const item of resProjects.projects) {
        // Connection URL
        const url = process.env.MONGODB_URL //'mongodb://localhost:27017';
        const project = { name: item, jobs: [] }
        // Database Name
        const dbName = item;
        const client = await MongoClient.connect(url);
        const reqSpiders = await fetch(`${process.env.SCRAPYD_URL}/listspiders.json?project=${dbName}`)
        const resSpiders = await reqSpiders.json()
        const db = await client.db(`${dbName}_log`);
        for (const item2 of resSpiders.spiders) {
            const collection = db.collection(`${item2}`);
            // Find some documents
            const docs = await collection.find({}, {
                projection: {
                    _id: true,
                    create_time: true
                }
            }).sort({ create_time: -1 }).toArray();
            if (docs.length > 0) {
                for (const item3 of docs) {
                    const crtime = (new Date(item3['create_time'] * 1000));

                    project.jobs.push(
                        {
                            name: item2,
                            create_time: `${crtime.getFullYear()}-${crtime.getMonth() + 1}-${crtime.getDate()} ${crtime.getHours()}:${crtime.getMinutes()}:${crtime.getSeconds()}`,
                            create_time_stamp: item3.create_time,
                            id: item3._id
                        })
                }
            }
        }
        project.jobs = _.sortBy(project.jobs, 'create_time_stamp').reverse();;
        projects.push(project)
        await client.close();
    }
    res.json(projects)
}
