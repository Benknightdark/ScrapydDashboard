import scrapy
from bs4 import  BeautifulSoup  
import logging

class ShopSpider(scrapy.Spider):
    name = 'shop'
    allowed_domains = ['www.costco.com.tw']
    start_urls = ['https://www.costco.com.tw/Health-Beauty/Vitamins-Herbals-Dietary-Supplements/c/701']
    data=[]
    def closed(self, reason):
        logging.info('fucking closed')
        logging.info(self.data)
    def parse(self, response):
        root =BeautifulSoup(response.body,'lxml')
        ul= root.find('ul',id='list-view-id')
        li_list=ul.find_all('li',attrs={'class':'product-item'})
        i=1
        for  li in li_list:
            imge_el=li.find('div',attrs={'class':'product-image'}).a
            self.data.append({
                'id':i,
                'title':imge_el.img['title'],
                'image':f'https://www.costco.com.tw/{imge_el.img["src"]}',
                'price':li.find('span',attrs={'class':'notranslate'}).text.replace('$','').strip(),
                'eng_title':li.find('a',attrs={'class':'lister-name-en'}).text,
                'url':f'https://www.costco.com.tw/{imge_el["href"]}'
            })
            i=i+1
            print()        
        pass
