# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import logging
from helpers.error_log_helper import (format_error_msg)
import json
class JsonWriterPipeline(object):
    line=[]
    def open_spider(self, spider):
        self.file = open('proxy.json', 'w')
        # Your scraped items will be saved in the file 'scraped_items.json'.
        # You can change the filename to whatever you want.
        # self.file.write("[")

    def close_spider(self, spider):
        # self.file.write(self.line[:-2])

        # self.file.write("]")
        self.file.write(json.dumps(self.line))
        self.file.close()

    def process_item(self, item, spider):
        logging.info('------------')
        logging.info(item)
        logging.info('------------')
        self.line.append(item)
        # self.line = json.dumps(
        #     dict(item),
        #     indent = 4,
        #     sort_keys = True,
        #     separators = (',', ': ')
        # ) + ",\n"
        # self.file.write(line)
        return item