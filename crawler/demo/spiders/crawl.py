import scrapy
import logging


class CrawlSpider(scrapy.Spider):
    name = 'crawl_spider'
    custom_settings = {
        'DOWNLOADER_MIDDLEWARES': {
            'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware': 110,
            'demo.middlewares.ProxyMiddleware': 100,
        },
        'CLOSESPIDER_PAGECOUNT': 2000,
        'ROBOTSTXT_OBEY': False
    }
    # start_urls = ['https://httpbin.org/ip']
    def start_requests(self):
        for i in range(10):
            yield scrapy.Request('https://httpbin.org/ip', dont_filter=True)

    def parse(self, response):
        logging.info(response.text)
