PIXI_MIN_JS := node_modules/pixi.js/dist/pixi.min.js
PIXI_MIN_MAP := $(PIXI_MIN_JS).map

# The % syntax used here is known as a "Substitution Reference"
INPUT_JS  := $(wildcard src/*.js)
COMMON_JS := $(INPUT_JS:src/%.js=commonjs/%.js)

INPUT_JS_TESTS := $(wildcard test/*.js)
COMMON_JS_TESTS := $(INPUT_JS_TESTS:test/%.js=commonjs/%.js)

BABELED_JS_TESTS := $(INPUT_JS_TESTS:test/%.test.js=floss/%.test.js)

JS_ENTRY := src/index.js
JS_ENTRY := $(JS_ENTRY:src/%.js=commonjs/%.js)

dev: public/js/pixi.min.js public/js/pixi.min.js.map public/js/bundle.js

serve: public/ node_modules
	node_modules/.bin/http-server -a 127.0.0.1

# Our main .js target depends on all the .js output files
public/js/bundle.js: $(COMMON_JS)
	node_modules/.bin/browserify -d $(JS_ENTRY) > $@

.SECONDARY: $(COMMON_JS) $(COMMON_JS_TESTS)
.DELETE_ON_ERROR: public/js/bundle.js

tests: $(BABELED_JS_TESTS)

# Every test depends on a commonjs file (compiled by babel)
# with this naming convention:
#
# commonjs/Example.test.js && commonjs/Example.js
#
# We browserify the .test.js file, which is responsible for
# importing symbols from the .js file
floss/%.test.js: commonjs/%.test.js commonjs/%.js
	mkdir -p $(@D)
	node_modules/.bin/browserify -d $< > $@

commonjs/%.test.js: test/%.test.js .babelrc
	mkdir -p $(@D)
	node_modules/.bin/babel $< -o $@ --source-maps inline

commonjs/%.js: src/%.js .babelrc
	mkdir -p $(@D)
	node_modules/.bin/babel $< -o $@ --source-maps inline

# Copy pixi into the public/js/ directory
public/js/pixi.min.js: node_modules
	cp $(PIXI_MIN_JS) public/js

public/js/pixi.min.js.map: node_modules
	cp $(PIXI_MIN_MAP) public/js

node_modules: package.json
	npm install
	touch node_modules

clean:
	rm -f public/js/bundle.js
	rm -f $(COMMON_JS) $(COMMON_JS_TESTS)
	rm -f $(BABELED_JS_TESTS)

debug:
	@echo $(JS_ENTRY)

.PHONY: dev serve debug clean tests
