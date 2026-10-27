#!/bin/bash
# raw/video/*.mp4 → public/idolo (loop sin corte: fundido de F s entre el final y el inicio)
cd "$(dirname "$0")"
F=0.6
GRADE_V="eq=gamma=1.5:contrast=1.06:saturation=1.12" # ≈ GRADE de optimize.sh
for f in raw/video/*.mp4; do
  n=$(basename "$f" .mp4); dst=../../public/idolo/res/$n.mp4; [ "$n" = welcome ] && dst=../../public/idolo/welcome.mp4
  mkdir -p "$(dirname "$dst")"
  D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  ffmpeg -v error -y -i "$f" -filter_complex \
    "[0:v]split[a][b];[a]trim=0:$F,setpts=PTS-STARTPTS[head];[b]trim=$F:$D,setpts=PTS-STARTPTS[body];[body][head]xfade=transition=fade:duration=$F:offset=$(echo "$D-2*$F" | bc -l),$GRADE_V[v]" \
    -map "[v]" -an -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart "$dst" && echo "$dst"
done
