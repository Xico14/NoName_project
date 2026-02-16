.PHONY: openapi-export openapi-check

OPENAPI_FILE := openapi/openapi.v1.json

openapi-export:
	python3 scripts/export_openapi.py --output $(OPENAPI_FILE)

openapi-check:
	@tmp_file=$$(mktemp); \
	python3 scripts/export_openapi.py --output $$tmp_file; \
	diff -u $(OPENAPI_FILE) $$tmp_file; \
	rm -f $$tmp_file
