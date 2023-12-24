cat /proc/meminfo  | grep MemFree | awk '{print $2}'


# test $(cat /proc/meminfo  | grep MemFree | awk '{print $2}' | wc -m) -lt 53 && echo sudo kill node

# ps -eo pid,%mem,comm |grep ' node'| awk '{print $1}' |  xargs kill


# #install crontab
# sudo apt-get install cron
# #cron
# # look if memory has more than 100mb free, if not than kill all node-processes from user
# test $(cat /proc/meminfo  | grep MemFree | awk '{print $2}' | wc -m) -lt 6 && ps -eo pid,%mem,comm |grep ' node'| awk '{print $1}' |  xargs kill

# #5 * * * * nodeuser test $(cat /proc/meminfo  | grep MemFree | awk '{print $2}' | wc -m) -lt 6 && ps -eo pid,%mem,comm |grep ' node'| awk '{print $1}' |  xargs kill

