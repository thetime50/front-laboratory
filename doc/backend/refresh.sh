cd /home/zero/thetime50/io
git pull
# cp -f -r /home/zero/thetime50/io/. /home/zero/thetime50
cp -f -r 'ls -a | grep -v .git | xargs' /home/zero/thetime50
echo `pwd`
echo -

cd /home/zero/thetime50/Bilebilelike
git pull
echo `pwd`
echo -

cd /home/zero/thetime50/front-laboratory
git pull
echo `pwd`
echo -

echo -
echo -- $(date +%Y-%m-%d %H:%m:%s) --
echo -