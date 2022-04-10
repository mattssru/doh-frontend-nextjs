#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
echo "192.168.10.10 kaotajai.com" >> /etc/hosts
echo "192.168.10.10 www.kaotajai.com" >> /etc/hosts
echo "192.168.10.13 storage.kaotajai.com" >> /etc/hosts
export NODE_OPTIONS=--max_old_space_size=8192
ln -sf /usr/share/zoneinfo/Asia/Bangkok /etc/localtime
#cd /data/server_web/anamai
mkdir -p  /var/www/app
#rsync -av /data/server_web/anamai/ /var/www/app/
cd /var/www/app/
#chmod -R 777 /var/www/app
#npm run build:production
#npm run start-k8s:production
pm2 start npm --name "web" -- run "start-k8s:production"
pm2 logs -f 0
tail -f /dev/null
