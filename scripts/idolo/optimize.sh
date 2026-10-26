#!/bin/bash
# raw/*.png → public/idolo/*.webp (opciones 720px, fondos 1080px de ancho)
cd "$(dirname "$0")"
OUT=../../public/idolo
find raw -name '*.png' | while read -r f; do
  rel=${f#raw/}; dst="$OUT/${rel%.png}.webp"; mkdir -p "$(dirname "$dst")"
  [ "$dst" -nt "$f" ] && continue
  if [[ $rel == q/* ]]; then w=720; else w=1080; fi
  cwebp -quiet -q 80 -resize $w 0 "$f" -o "$dst" && echo "$dst"
done
