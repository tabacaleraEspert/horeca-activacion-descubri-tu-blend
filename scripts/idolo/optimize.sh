#!/bin/bash
# raw/*.png → public/idolo/*.webp (opciones 720px, fondos 1080px de ancho)
# GRADE: look común (sombras abiertas + algo de saturación); el arte crudo sale
# con negros muy profundos. Mantener en sintonía con GRADE_V de loop.sh.
cd "$(dirname "$0")"
GRADE=(-level 0%,100%,1.6 -sigmoidal-contrast 2,45% -modulate 104,112)
OUT=../../public/idolo
find raw/q raw/bg raw/res -name '*.png' | while read -r f; do
  rel=${f#raw/}; dst="$OUT/${rel%.png}.webp"; mkdir -p "$(dirname "$dst")"
  [ "$dst" -nt "$f" ] && [ "$dst" -nt "$0" ] && continue
  # opciones (q/): objetos sobre fondo liso, ya salen luminosas → sin GRADE
  if [[ $rel == q/* ]]; then w=720; g=(); else w=1080; g=("${GRADE[@]}"); fi
  magick "$f" -resize ${w}x "${g[@]}" -quality 80 "$dst" && echo "$dst"
done
