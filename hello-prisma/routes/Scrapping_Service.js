const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { service, report } = new PrismaClient();
const { home_scrape_start } = require("../../HomeScrapping");
const { last_report } = require("../../StatisticsScrapper");
//const moment = require('moment'); // require

router.get("/home", async (req, res) => {
  let report_obj = [];
  const data = await home_scrape_start();
  for (const obj of data) {
    console.log(obj);
    const serviceExists = await service.findFirst({
      where: { data_pageUrl: obj.page_link },
      select: { name: true, id: true }
    });
    if (serviceExists) {
      console.log(serviceExists);

      for (let i = 0; i <= obj.statistics.y; i++) {
        //date =moment().format('YYYY-MM-DD  HH:mm:ss.000Z');
        report_obj.push({ service: serviceExists.id, createdAt: new Date() });
      }
    } else console.log("Not found");
  }
  console.log("report_obj :>> ", report_obj);
  try {
    const newReports = await report.createMany({
      data: report_obj
    });
    res.send("Reports posted successfully");
  } catch (error) {
    console.log("object :>> ", error);
    res.send("Failed to post Reports");
  }
});

router.get("/report/:svid", async (req, res) => {
  let report_obj = [];
  const serviceExists = await service.findUnique({
    where: { id: parseInt(req.params.svid) },
    select: { name: true, data_pageUrl: true, id: true }
  });
  if (serviceExists) {
    console.log(serviceExists);
    const data = await last_report(serviceExists.data_pageUrl);
    console.log("my report =",data)
    if(data.report.y >1){
      for (let i = 0; i <= data.report.y; i++) {
        //date =moment().format('YYYY-MM-DD  HH:mm:ss.000Z');
        report_obj.push({ service: serviceExists.id, createdAt: new Date()});
      }
      console.log("report_obj :>> ", report_obj);
      try {
        const newReports = await report.createMany({
          data: report_obj
        });
        res.send("Report posted successfully");
      } catch (error) {
        console.log("object :>> ", error);
        res.send("Failed to post Report");
      }
    }else{ res.send("No Reports were made to post");
    }
  }


});

module.exports = router;
