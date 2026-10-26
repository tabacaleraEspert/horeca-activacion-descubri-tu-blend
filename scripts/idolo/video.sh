#!/bin/bash
# Loops de video (Seedance 2.5) desde los fondos 9:16: inicio = fin → loop sin corte.
# Uso: ./video.sh [filtro]. Salida: raw/video/<nombre>.mp4
cd "$(dirname "$0")"
MOTION="Seamless looping background. Slow gentle camera push-in, spotlight beams slowly sweeping, floating particles and confetti drifting, haze moving, subtle light flicker. Keep the composition and the empty center. No people, no text, no logos."
one() {
  name=$1; dur=$2; src="raw/bg/$name.png"; [ -f "raw/res/$name.png" ] && src="raw/res/$name.png"
  out="raw/video/$name.mp4"; [ -f "$out" ] && return
  mkdir -p raw/video
  url=$(higgsfield generate create seedance_2_5 --mode omni_reference --start-image "$src" --end-image "$src" \
    --prompt "$MOTION" --duration "$dur" --resolution 720p --aspect_ratio 9:16 --generate_audio false \
    --wait --wait-timeout 30m --json 2>/dev/null | python3 -c "import json,sys; print(json.load(sys.stdin)[0]['result_url'])")
  [ -n "$url" ] && curl -s -o "$out" "$url" && echo "ok $name" || echo "FAIL $name"
}
export -f one; export MOTION
printf '%s\n' "welcome 10" mellow\ 5 native\ 5 hazel\ 5 blossom\ 5 vid\ 5 mine\ 5 american\ 5 \
  | grep -- "${1:-}" | xargs -P 4 -L 1 bash -c 'one "$@"' _
