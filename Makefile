PIXI_JS_DIR := node_modules/pixi.js
PIXI_MIN_JS := $(PIXI_JS_DIR)/dist/pixi.min.js
PIXI_MIN_MAP := $(PIXI_MIN_JS).map
HTTP_SERVER := node_modules/.bin/http-server

# The % syntax used here is known as a "Substitution Reference"
JS_IN = $(wildcard src/*.js)
JS_OUT = $(JS_IN:src/%.js=public/js/%.js)

# Our main .js target depends on all the .js output files
public/js: $(JS_OUT)
public/js/%.js: src/%.js .babelrc
	mkdir -p $(@D)
	node_modules/.bin/babel $< -o $@

dev: $(PIXI_JS_DIR) public/js/lib/pixi.min.js public/js/lib/pixi.min.js.map

serve: public node_modules
	$(HTTP_SERVER) -a 127.0.0.1

public/js/lib/pixi.min.js public/js/lib/pixi.min.js.map: public/js/lib node_modules
	cp $(PIXI_MIN_JS) public/js/lib
	cp $(PIXI_MIN_MAP) public/js/lib

# Create folders if needed
public:
	mkdir -p public

public/js: public
	mkdir -p public/js

public/js/lib: public/js
	mkdir -p public/js/lib

node_modules $(PIXI_JS_DIR): package.json
	npm install

.PHONY: dev serve debug

debug:
	@echo $(JS_IN)
	@echo $(JS_OUT)
