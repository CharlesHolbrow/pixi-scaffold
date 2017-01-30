PIXI_JS_DIR := node_modules/pixi.js
PIXI_MIN_JS := $(PIXI_JS_DIR)/dist/pixi.min.js
PIXI_MIN_MAP := $(PIXI_MIN_JS).map
HTTP_SERVER := node_modules/.bin/http-server

# The % syntax used here is known as a "Substitution Reference"
INPUT_JS  := $(wildcard src/*.js)
COMMON_JS := $(INPUT_JS:src/%.js=tmp/%.js)

JS_ENTRY := src/index.js
JS_ENTRY := $(JS_ENTRY:src/%.js=tmp/%.js)

dev: public/js/pixi.min.js public/js/pixi.min.js.map public/js/bundle.js

serve: public node_modules
	$(HTTP_SERVER) -a 127.0.0.1

# Our main .js target depends on all the .js output files
public/js/bundle.js: $(COMMON_JS)
	node_modules/.bin/browserify -d $(JS_ENTRY) > $@

.INTERMEDIATE: $(COMMON_JS)
.DELETE_ON_ERROR: public/js/bundle.js

tmp/%.js: src/%.js .babelrc
	mkdir -p $(@D)
	node_modules/.bin/babel $< -o $@ --source-maps inline

# Copy pixi linto the public/js directory
public/js/pixi.min.js: $(PIXI_JS_DIR)
	cp $(PIXI_MIN_JS) public/js

public/js/pixi.min.js.map: $(PIXI_JS_DIR)
	cp $(PIXI_MIN_MAP) public/js

node_modules $(PIXI_JS_DIR): package.json
	npm install

clean:
	rm public/js/bundle.js

debug:
	@echo $(JS_ENTRY)

.PHONY: dev serve debug clean
