FROM python:3.7.4
WORKDIR /groceries/
RUN pip install --upgrade pip
COPY test_requirements.txt /groceries/
RUN pip install -r test_requirements.txt
COPY requirements.txt /groceries/
RUN pip install -r requirements.txt
COPY . .
CMD python src/main.py