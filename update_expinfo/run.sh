#!/usr/bin/env bash

echo `date`

echo "Extracting records to filter.txt"
python extract_records.py > filter.txt

echo "Calling douban.js"
rm -f out.txt
node call_douban.js filter.txt out.txt

echo "Pushing data"
python push_db.py out.txt imglist.txt

echo "Wgetting image"
bash wget_img.sh imglist.txt imgdir

echo "Copying image to server"
cp imgdir/* /home/fbt/fbt_server_py/static/images/res_icon

echo `date`
