#!/bin/sh

PROJECT_ROOT="`dirname $0`"
JS_ROOT="$PROJECT_ROOT/src/main/js/"

cd "$JS_ROOT"
exec jrunscript -f "program.js"