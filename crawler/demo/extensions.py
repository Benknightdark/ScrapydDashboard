import logging
from scrapy import signals
from scrapy.exceptions import NotConfigured
from scrapy.utils.project import get_project_settings
import os
import glob
from pymongo import MongoClient
from datetime import datetime

settings = get_project_settings()

logger = logging.getLogger(__name__)

class SpiderOpenCloseLogging:

    def __init__(self, item_count):
        self.item_count = item_count
        self.items_scraped = 0
    @classmethod
    def from_crawler(cls, crawler):
        # first check if the extension should be enabled and raise
        # NotConfigured otherwise
        if not crawler.settings.getbool('MYEXT_ENABLED'):
            raise NotConfigured

        # get the number of items from settings
        item_count = crawler.settings.getint('MYEXT_ITEMCOUNT', 1000)

        # instantiate the extension object
        ext = cls(item_count)

        # connect the extension object to signals
        crawler.signals.connect(ext.spider_closed, signal=signals.spider_closed)

        # return the extension object
        return ext

    def spider_closed(self, spider):
        logger.info("closed spider %s", spider.name)
        project_name=settings.get('BOT_NAME')
        # logger.info(f'./data/logs/{project_name}/{spider.name}/*')
        files = glob.glob(f'./data/logs/{project_name}/{spider.name}/*')
        # logger.info(len(files))
        # logger.info(max(files , key = os.path.getctime)) 
        with open(max(files , key = os.path.getctime),'r') as file:
            db_uri =os.getenv('MONGODB_URL')
 #settings.getbool('MONGODB_URL') #settings.getbool('MONGODB_URL') #
            db_name =  f'{project_name}_log'
            db_client = MongoClient(db_uri)
            # dblist = self.db_client.list_database_names()
            # if db_name not in  dblist:
            #     print("The database exists.")
            file_data = file.read()

            now = datetime.now()
            timestamp = datetime.timestamp(now)
            db = db_client[db_name]
            db[spider.name].insert_one({
                'create_time':timestamp,
                'logs':file_data
            })


