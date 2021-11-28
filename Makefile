fix:
	yarn run tslint --fix .
	yarn run prettier --config .prettierrc -w src/ dev/

check-format:
	yarn run prettier --config .prettierrc -c src/ dev/
