
from flask import Flask
from flask_apscheduler import APScheduler
import logging
import requests
import os
import env_config
logging.basicConfig(level=logging.INFO)
env_config.init_env()
logging.info(os.getenv('SCRAPYD_URL'))
class Config(object):
    SCHEDULER_API_ENABLED = True
scheduler = APScheduler()
app = Flask(__name__)
app.config.from_object(Config())
scheduler.api_enabled = True
scheduler.init_app(app)

@scheduler.task('cron', id='do_collect_proxy_ip', hour=9, minute=37, day_of_week='0-6')
def do_collect_proxy_ip():
    '''
    更新Proxy IP資料
    '''
    settings = [
        ('project', 'default'),
        ('spider', 'proxy_spider'),
    ]
    logging.info('--------------------------'+crawl_url)
    r = requests.post(f'{crawl_url}/schedule.json', data=settings)
    logging.info(r.json())

    # os.system('scrapy crawl proxy_spider  -s ROBOTSTXT_OBEY=False  -O proxy.json')
# do_collect_proxy_ip()
scheduler.start()
if __name__ == '__main__':
    logging.info('---------爬蟲們!!!開怪啦---------')
    app.run(use_reloader=False)  # use_reloader=False
