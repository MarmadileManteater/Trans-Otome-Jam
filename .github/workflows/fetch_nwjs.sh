#!/bin/bash

build_type=$1

latest_version=$(curl https://dl.nwjs.io/ | grep -o '<a href="\([^"]*\)"' | tail -1)
latest_version="${latest_version:9:-2}"

archive="zip"

if [ $build_type == "linux-x64" ]
then
    archive="tar.gz"
fi

echo https://dl.nwjs.io/$latest_version/nwjs-$latest_version-$build_type.$archive

wget https://dl.nwjs.io/$latest_version/nwjs-$latest_version-$build_type.$archive -O $build_type.$archive

mkdir -p temp

if [ $archive == "tar.gz" ]
then
    tar -xf $build_type.$archive -C temp
fi

if [ $archive == "zip" ]
then
    unzip $build_type.$archive -d temp
fi

mv temp/*/ $build_type
rm temp -rf
rm $build_type.$archive