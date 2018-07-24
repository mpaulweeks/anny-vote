fe:
	cd vote-app && yarn start

api:
	./bash/server_anny_vote.sh

pytest:
	source venv/bin/activate && cd py && python -m unittest
