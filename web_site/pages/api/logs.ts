  /**
   * 下載爬蟲作業log檔
   * 
   */
  export default async(req, res) => {
    const project = req.query['project']
    const spider = req.query['spider']
    const id=req.query['id']  
    const resData = await fetch(`${process.env.SCRAPYD_URL}/logs/${project}/${spider}/${id}.log`)//http://api:8080/
    const logFile = await resData.text()
    res.setHeader('Content-Type', 'application/force-download')
    res.setHeader('Content-Transfer-Encoding', 'Binary')
    res.setHeader('Content-Disposition', `attachment;filename=${id}.log`)
    res.send(logFile)
  }
  