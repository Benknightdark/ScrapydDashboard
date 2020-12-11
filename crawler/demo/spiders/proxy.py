import scrapy
from bs4 import BeautifulSoup
import json
import logging


class ProxySpiders(scrapy.Spider):
    name = 'proxy'
    allowed_domains = ['www.free-proxy-list.net']
    start_urls = ['https://free-proxy-list.net/']
    custom_settings = {
        'ITEM_PIPELINES': {
            'demo.pipelines.JsonWriterPipeline': 300,
        }
    }
    data = []

    def proxy_check_available(self, response):
        proxy_ip = response.meta['_proxy_ip']
        logging.info('------------------------------'+proxy_ip)
        logging.info('------------------------------' +
                     json.loads(response.text)['origin'])

        if proxy_ip.split(':')[0] == json.loads(response.text)['origin']:
            self.data.append(response.meta['_proxy_scheme']+"://"+proxy_ip)
            yield {
                'scheme': response.meta['_proxy_scheme'],
                'proxy': response.meta['proxy'],
                'port': response.meta['port']
            }

    def closed(self, reason):
        logging.info('fucking closed')
        logging.info(json.dumps(self.data, sort_keys=True, indent=4))
        if (len(self.data) > 0):
            data_string = '已撈到的Proxy IP => \n'+'\n'.join(self.data)
            logging.info(data_string)

    def parse(self, response):
        soup = BeautifulSoup(response.text, 'lxml')
        trs = soup.find('div', id='raw').find('textarea')
        proxies_url = trs.text.split('\n')[3:]
        logging.info(proxies_url)
        for tr in proxies_url:
            logging.info(tr)
            meta = {
                'port': tr.split(':')[1],
                'proxy': 'http://'+tr,
                'dont_retry': True,
                'download_timeout': 3,
                '_proxy_scheme': 'http',
                '_proxy_ip': tr
            }
            meta2 = {
                'port': tr.split(':')[1],
                'proxy': 'https://'+tr,
                'dont_retry': True,
                'download_timeout': 3,
                '_proxy_scheme': 'https',
                '_proxy_ip': tr
            }
            logging.info(meta)
            yield scrapy.Request('https://httpbin.org/ip', callback=self.proxy_check_available, meta=meta, dont_filter=True)
            yield scrapy.Request('https://httpbin.org/ip', callback=self.proxy_check_available, meta=meta2, dont_filter=True)
        pass
