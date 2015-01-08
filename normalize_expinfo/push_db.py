#!/usr/bin/env python
import pymongo
import json
from bson.objectid import ObjectId

def rebuild_info(doubaninfo):
    doubaninfo = json.loads(doubaninfo)
    link = '/static/images/res_icon/%s' % doubaninfo['ilink'].split('/')[-1]
    if doubaninfo.has_key('comments'):
        del doubaninfo['comments']
    doubaninfo['link'] = link
    return doubaninfo

if __name__ == '__main__':
    conn = pymongo.Connection('127.0.0.1', 27017)
    fbt = conn['fbt']
    all_resources = fbt['all_resources']
    
    count = 0
    with open('year.txt.cleaned', 'r') as f:
        for line in f:
            if not line:
                break
            array = line.split('\t')
            if len(array) != 2:
                print 'Oh, unexpected error!'
                exit(1)

            objectid, year = array
            objectid = objectid.strip()
            year = year.strip()
            if year == "null":
                year = None
                all_resources.update({"_id": ObjectId(objectid)}, {"$set":{"exp_info.year": year}})
            else:
                all_resources.update({"_id": ObjectId(objectid)}, {"$set":{"exp_info.year": int(year)}})
            count += 1

    print "Done %s" % count
