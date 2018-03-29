# anny-vote
simple voting app for ANNY

## setup

### react fe

install
```
cd vote-app
yarn install
```
dev
```
cd vote-app
yarn start
```
prod
```
cd vote-app
yarn build
# serve contents of build directory via nginx
```

### api server

setup
```
virtualenv -p python3 venv
source venv/bin/activate
pip install -r install/requirements.txt
./bash/create_db.sh
```
dev
```
./bash/server_anny_vote.sh
```
prod
```
./bash/bg_anny_vote.sh
```

## todo

- diff pages for different events
- admin page that has nav for different pages
- all time page
  - calculate all time best via "highest density", ie most votes per participant
- charts
  - https://www.fusioncharts.com/react-charts
  - bar graph for votes
- caluclating correlation
  - most related yes and no
  - least related for yes and no
