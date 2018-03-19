./bash/kill_anny_vote.sh
git pull

cd vote-app
yarn install
yarn build
cd ..

./bash/bg_anny_vote.sh
