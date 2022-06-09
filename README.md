# Scrapper_Proj
This is NodeJS project using mysql for the database and Prisma As the ORM

### Using:

<ol>
 <li>

 `https://localhost:5000/api/get/home`: Starts Scraping the Home page of the `https://downdetector.com/` to get the `page_link, company_name, logo_src and latest statistics` and return a json array list containg all the data in objects ex: </br>
  ```
   [
 {
    "logo_src": "https://cdn2.downdetector.com/static/uploads/c/x40/697d6/download-2_WrQ5dDC.png",
    "company_name": "000webhost",
    "page_link": "https://downdetector.com/status/000webhost/",
    "index": 0,
    "statistics": {
      "label": "reports",
      "data": [
        {
          "x": "2021-11-12T23:07:06+00:00",
          "y": 0
        }
              ]
                 }
  } 
                                                                               ]
 ```

 </li>
 
 <li> 
 
  `https://localhost:5000/api/get/report/{serviceid}`: The serviceId is equal to the `index` object which is uniques, thus we can go to that specifc page_link of that serviceId provided get the latest update of the `latest statistics` then update that specic objects statistics according to the serviceId and return the new object </br>
</ol>
