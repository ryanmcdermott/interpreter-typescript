.PHONY: build watch clean

build:
	tsc

watch:
	tsc --watch

clean:
	rm -rf ./build
