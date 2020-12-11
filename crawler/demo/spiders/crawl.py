import scrapy
import logging
from scrapy_distributed.spiders.sitemap import SitemapSpider
from scrapy_distributed.common.queue_config import RabbitQueueConfig
from scrapy_distributed.dupefilters.redis_bloom import RedisBloomConfig
class CrawlSpider(scrapy.Spider):
    name = 'crawl'
    queue_conf: RabbitQueueConfig = RabbitQueueConfig(
        name="example",
        durable=True,
        arguments={"x-queue-mode": "lazy", "x-max-priority": 255},
        properties={"delivery_mode": 2}
    )
    item_conf: RabbitQueueConfig = RabbitQueueConfig(
        name="example:items:new",
        durable=True,
        arguments={"x-queue-mode": "lazy", "x-max-priority": 255},
    )
    redis_bloom_conf: RedisBloomConfig = RedisBloomConfig(
        key="example:dupefilter", error_rate=0.001, capacity=100_0000,
        exclude_url_query_params=False
    )
    def start_requests(self):
        for i in range(30):
            logging.info(str(i))
            yield scrapy.Request('https://httpbin.org/ip', dont_filter=True)

    def parse(self, response):
        print("-------------------------- => "+response.text)
