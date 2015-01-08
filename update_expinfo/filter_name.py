# -*- coding:utf-8 -*-

import pymongo
import sys
import re
import string
    
def filter_name(s):
    identify = string.maketrans('', '')
    delEStr = string.punctuation + ' ' + string.letters  #ASCII 标点符号，空格和字母
    delChstr=["中文字幕","720p","720P",    "1080p","1080P","HD","人人影视","电影天堂",    \
    "高清版",    "高清版","高清","双语字幕","国语双字","中英双字","分辨率",\
    "国产动画","制作","英语双字","【","】","字幕组","迅雷","国语中字","清晰",\
    "枪版","中字","不喜勿下","国英双语","标清","国语","（","）","mp4","MP4",\
    "国粤双语","中英文","双字幕","双语","中英字幕","英文","繁体","简体",\
    "srt","ass","飞鸟影视","阳光电影"]
    #f=open("names","w")
    #reload(sys)
    #sys.setdefaultencoding("utf-8")

    for delstr in delChstr:
        s=s.replace(delstr,"")

    if re.findall(u'[\x80-\xff].', s):    #s为中文   
        s=s.translate(identify, delEStr)
        s=re.sub(u"[0-9]{3,10}","",s)
        return s
    else: #s为英文   
        s=s.replace("."," ")
        year=re.findall("[0-9]{4}",s)
        if (year):
            year=year[0]
            year_pos=s.find(year)
            s=s[:year_pos+4]
        return s
