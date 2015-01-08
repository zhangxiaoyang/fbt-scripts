#!/usr/bin/env python
import pymongo
import json
from bson.objectid import ObjectId
import re
import sys

def rebuild_info(doubaninfo):
    doubaninfo = json.loads(doubaninfo)
    link = '/static/images/res_icon/%s' % doubaninfo['ilink'].split('/')[-1]
    if doubaninfo.has_key('comments'):
        del doubaninfo['comments']
    doubaninfo['link'] = link
    
    # Clean year
    m = re.search(r'[12][0-9][0-9][0-9]', doubaninfo['year'])
    if m:
        doubaninfo['year'] = int(m.group())
    else:
        doubaninfo['year'] = None
    return doubaninfo

if __name__ == '__main__':
    conn = pymongo.Connection('127.0.0.1', 27017)
    fbt = conn['fbt']
    all_resources = fbt['all_resources']
    hot_resources = fbt['hot_resources']
    
    filename = sys.argv[1]
    imglist = sys.argv[2]
    ilinks = []

    count = 0
    with open(filename, 'r') as f:
        for line in f:
            if not line:
                break
            array = line.split('\t')
            if len(array) != 3:
                print 'Oh, unexpected error!'

            fileid, filename, doubaninfo = array
            if doubaninfo.strip() == "null":
                continue
            info = rebuild_info(doubaninfo)
            all_resources.update({"file_id": fileid}, {"$set":{"exp_info": info}})
            if hot_resources.find({"file_id": fileid}).count():
                hot_resources.update({"file_id": fileid}, {"$set":{"exp_info": info}})
            ilinks.append(info['ilink'])
            count += 1

    with open(imglist, 'w') as f:
        f.write('\n'.join(ilinks))
    print "Done %s" % count
