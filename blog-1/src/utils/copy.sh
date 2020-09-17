#!/bin/sh
cd ~
cd Documents/Imooc/Node/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
