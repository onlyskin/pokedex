#!/bin/bash

OUT=out
TSC=node_modules/typescript/bin/tsc
BROWSERIFY=node_modules/browserify/bin/cmd.js

mkdir -p $OUT

$TSC 
$BROWSERIFY -o $OUT/index.bundle.js $OUT/index.js

rsync -a html/ $OUT
rsync -a css/ $OUT
cp img_trans.gif $OUT/img_trans.gif
