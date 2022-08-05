# change /dev/disk4 to whatever the thing is

gdd if=/dev/zero of=/dev/disk4 bs=1M status=progress
gdd if=/dev/disk4 of=flag.txt bs=1M status=progress