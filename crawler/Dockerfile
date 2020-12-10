FROM python:3
ENV PYMSSQL_BUILD_WITH_BUNDLED_FREETDS=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV TZ=Asia/Taipei
RUN apt-get -y install libffi-dev libssl-dev
# RUN apt-get update \
#     && apt-get install -y cron \
#     && apt-get autoremove -y
EXPOSE 5000
EXPOSE 6800
ADD requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app
ADD . /app

RUN useradd appuser && chown -R appuser /app
USER appuser

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
# CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
CMD ["scrapyd"]