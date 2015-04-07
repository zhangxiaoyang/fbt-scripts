#!/usr/bin/env bash

for i in `ls *.html`
do
    echo "Processing $i"
    sed 's/href="http/HREF_HTTP/g' "$i"\
    | sed 's/href="/href="http:\/\/friendsbt.com\//g'\
    | sed 's/HREF_HTTP/href="http/g' > "$i.new"
done

for i in `ls static/css/*.css`
do
    echo "Processing $i"
    sed 's/src="http/SRC_HTTP/g' "$i"\
    | sed 's/src="/src="http:\/\/friendsbt.com\//g'\
    | sed 's/SRC_HTTP/src="http/g' > "$i.new"
done

for i in `ls static/js/*.js`
do
    echo "Processing $i"
    sed 's/src="http/SRC_HTTP/g' "$i"\
    | sed 's/src="/src="http:\/\/friendsbt.com\//g'\
    | sed 's/SRC_HTTP/src="http/g' > "$i.new"
done
