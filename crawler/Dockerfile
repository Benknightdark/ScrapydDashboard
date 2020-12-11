FROM python:3
ENV PYMSSQL_BUILD_WITH_BUNDLED_FREETDS=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV TZ=Asia/Taipei
RUN apt-get -y install libffi-dev libssl-dev
EXPOSE 5000
EXPOSE 6800
ADD requirements.txt .
RUN python -m pip install -r requirements.txt
WORKDIR /app
ADD . /app
RUN useradd appuser && chown -R appuser /app
USER appuser
CMD ["scrapyd"]