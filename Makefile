PIXI_JS_DIR := node_modules/pixi.js
PIXI_MIN_JS := $(PIXI_JS_DIR)/dist/pixi.min.js
PIXI_MIN_MAP := $(PIXI_MIN_JS).map
HTTP_SERVER := node_modules/.bin/http-server

dev: $(PIXI_JS_DIR) public/js/lib/pixi.min.js public/js/lib/pixi.min.js.map

serve: public node_modules
	$(HTTP_SERVER) -a 127.0.0.1

public/js/lib/pixi.min.js public/js/lib/pixi.min.js.map: public/js/lib node_modules
	cp $(PIXI_MIN_JS) public/js/lib
	cp $(PIXI_MIN_MAP) public/js/lib

# Create folders if needed
public:
	mkdir public

public/js: public
	mkdir public/js

public/js/lib: public/js
	mkdir public/js/lib

node_modules: package.json
	npm install

.PHONY: dev serve
