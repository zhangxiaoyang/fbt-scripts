#!/usr/bin/env python
import pymongo
import json
from bson.objectid import ObjectId
from filter_name import filter_name

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
    
    cursor = all_resources.find({'exp_info': {}, 'main_type': 0})
    count = 0
    for i in cursor:
        file_id = i['file_id'].encode('utf-8')
        file_name = i['file_name'].encode('utf-8')
        new_name = filter_name(file_name)
        print '\t'.join([file_id, file_name, new_name])
        count += 1
    #print "Done %s" % count
