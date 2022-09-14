# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import logging
from helpers.error_log_helper import (format_error_msg)
import json
import os


class JsonWriterPipeline:  # (object)
    line = []
    data = None

    def close_spider(self, spider):
        fiel_path = './demo/proxy.json'
        if os.path.isfile(fiel_path):
            self.file = open(fiel_path, 'r')
            self.data = json.load(self.file)
            for line_object in self.line:
                check = any(
                    filter(lambda x: x['proxy'] == line_object['proxy'],
                           self.data))
                print(check)
                if check is False:
                    self.data.append(line_object)
            print('---------------------------------')
            self.file.close()
            print(self.data)
            write_file = open(fiel_path, 'w+')
            write_file.write(json.dumps(self.data))  
        else:
            write_file = open(fiel_path, 'w+')
            write_file.write(json.dumps(self.line))  

    def process_item(self, item, spider):
        logging.info('------------')
        logging.info(item)
        logging.info('------------')
        self.line.append(item)
        return item