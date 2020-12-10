import scrapy
import logging

class CrawlSpider(scrapy.Spider):
    name = 'crawl'
    def start_requests(self):
        for i in range(30):
            logging.info(str(i))
            yield scrapy.Request('https://httpbin.org/ip', dont_filter=True)

    def parse(self, response):
        print("-------------------------- => "+response.text)
