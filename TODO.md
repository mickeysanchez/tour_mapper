#TODO
* finish layout
* save / share on twitter
	* saves in db - rails?

* refactor / angular best practices


#Schema

users
username | pw/uid

* has_many maps

maps
name | user_id

* belongs_to user
* has_many events

events
map_id | ticket_url | venue_name | address | city | state | country | lat | lon

* belongs_to map