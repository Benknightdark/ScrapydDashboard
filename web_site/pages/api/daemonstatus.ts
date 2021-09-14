  /**
   * 取得爬蟲伺服器節點資訊
   * 
   */
export default async(req:any, res:any) => {
  const resData = await fetch(`${process.env.SCRAPYD_URL}/daemonstatus.json`)//http://api:8080/
  const json = await resData.json()
  res.json(json)
}
