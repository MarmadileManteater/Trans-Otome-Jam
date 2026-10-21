#!/bin/bash

project_dir=$1

image_dirs=$(ls $project_dir/img)

for dir in $image_dirs
do
    if [ $dir != "system" ]
    then
        images=$(ls $project_dir/img/$dir)
        for image in $images
        do
            if [ "$(grep -rni "${image:0:-4}" $project_dir/data/*)" == "" ]
            then
                echo "$project_dir/img/$dir/$image removed because it is unused!"
                rm $project_dir/img/$dir/$image
            fi
        done
    fi
done

audio_dirs=$(ls $project_dir/audio)

for dir in $audio_dirs
do
    audios=$(ls $project_dir/audio/$dir)
    for audio in $audios
    do
        if [ "$(grep -rni "${audio:0:-4}" $project_dir/data/*)" == "" ]
        then
            echo "$project_dir/audio/$dir/$audio removed because it is unused!"
            rm $project_dir/audio/$dir/$audio
        fi
    done
done
