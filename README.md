# Document for setting up project

## 1. Install OS

- Linux is required (Ubuntu Desktop/Server 16.04)

## 2. Install needed packages

- Aptitude tool: For higher performance and more active than apt-get
```
$ sudo apt-get update
$ sudo apt-get install aptitude
```

- Python3.5/3.6 and python virtual environment
```
$ sudo aptitude install python3.5
$ sudo aptitude install python3.5-venv
```

- Postgresql version 9 or later
```
$ sudo aptitude install postgresql
```

- Python3.5-dev / python3.6-dev
```
$ aptitude install python3.5-dev
```


- Git (Source code management tool)
```
$ aptitude install git
```

## 3. Initialize Project Environment

- Create python3.5 venv folder (this is only environment of the project)


`if app is running on python2.* environment`

 replace **$ python3.5 -m venv crm/** by **$ virtualenv folder_name**

```
$ cd ~/Documents/workspace/
$ mkdir crm
$ python3.5 -m venv crm/
$ cd crm/
$ source bin/activate
```

- Create or clone project into "repo" directory
```
$ git clone http://xxx.com/cuongnc/ANND-CRM.git repo
```

- 2 more required libraries (GonrinJS lib & GonrinUI)
```
$ cd ./repo/static/js
$ git clone https://github.com/gonrin/GonrinJS.git lib
$ cd ../vendor
$ git clone https://github.com/gonrin/GonrinUI.git
```

## 4. Run project

- Before running app, need to create database postgresql user to access db
```
$ sudo su postgres
$ psql
```

- then follow the document of PostgreSQL below: password and username in repo/alembic.ini
 PostgreSQL Docs: [Postgresql](http://wiki.gonrin.com/Postgresql)
 (*using Ctrl + D to logout PostgreSQL*)

- Go to repo directory to run app
```
$ cd ../../
$ pip install -r requirements.txt
$ alembic revision --autogenerate -m "init db" (this command is used in case creating new app)
$ alembic upgrade head
$ python manage.py run
```
