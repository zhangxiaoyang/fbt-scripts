#!/usr/bin/env bash

awk '
BEGIN{
    FS=OFS="\t";
}
{
    id=$1;
    year=$2; 
    match(year"", /[12][0-9][0-9][0-9]/);
    if(RSTART) {
        print id, substr(year, RSTART, 4);
    }
    else {
        print id, "null";
    }
}
' year.txt > year.txt.cleaned
