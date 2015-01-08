#!/usr/bin/env python
import pymongo
import json
from bson.objectid import ObjectId

if __name__ == '__main__':
    conn = pymongo.Connection('127.0.0.1', 27017)
    fbt = conn['fbt']
    all_resources = fbt['all_resources']
    
    cursor = all_resources.find()
    for record in cursor:
        if 'exp_info' in record and record['exp_info']:
            if 'year' in record['exp_info']:
                print '%s\t%s' % (record['_id'], record['exp_info']['year'].encode('utf-8').strip())
