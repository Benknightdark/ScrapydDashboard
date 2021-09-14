/**
 * 下載爬蟲作業log檔
 * 
 */
import { MongoClient, ObjectId } from 'mongodb'

export default async (req:any, res:any) => {
  const project = req.query['project']
  const spider = req.query['spider']
  const id = req.query['id']
  let url = '';
  let logFile = '';
  console.log(req.query)
  if (req.query['type'] !== 'history') {
    url = `${process.env.SCRAPYD_URL}/logs/${project}/${spider}/${id}.log`;
    const resData = await fetch(url)//http://api:8080/
    logFile = await resData.text()
  } else {
    const client = await MongoClient.connect(process.env.MONGODB_URL!);
    const db = await client.db(`${project}_log`);
    const collection = await db.collection(`${spider}`)
    const docs = await collection.findOne({ _id: new ObjectId(id) })//{_id:id}
    console.log(docs)
    logFile = docs?.logs;
  }
  res.setHeader('Content-Type', 'application/force-download')
  res.setHeader('Content-Transfer-Encoding', 'Binary')
  res.setHeader('Content-Disposition', `attachment;filename=${id}.log`)
  res.send(logFile)
}
