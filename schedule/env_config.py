from dotenv import load_dotenv
from pathlib import Path  # Python 3.6+ only
import os
def init_env():
    '''
    初始化環境變數
    '''
    if(os.getenv('SYSTEM_ENVIRONMENT')==None):
        env_path = Path('.') / 'development.env'
        load_dotenv(dotenv_path=env_path)
