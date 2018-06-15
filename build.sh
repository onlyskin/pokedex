#!/bin/bash

OUT=out
TSC=node_modules/typescript/bin/tsc
BROWSERIFY=node_modules/browserify/bin/cmd.js

mkdir -p $OUT
mkdir -p $OUT/img
mkdir -p $OUT/sprites

$TSC 
$BROWSERIFY -o $OUT/index.bundle.js $OUT/index.js

rsync -a html/ $OUT
rsync -a css/ $OUT
rsync -a sprites/ $OUT/sprites
