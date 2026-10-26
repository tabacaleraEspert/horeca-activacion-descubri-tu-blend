#!/bin/bash
# Uso: ./gen.sh [filtro]  — genera assets de Premios Ídolo con Higgsfield (gpt_image_2_5)
# Salida: raw/<nombre>.png. Saltea los que ya existen.
cd "$(dirname "$0")"
STYLE_Q="Square editorial photograph for a premium awards-night campaign. Subject: %s. People seen from behind, cropped or in motion blur so no face is identifiable. Look: cinematic flash photography, deep blacks, glossy magazine style, gold and colored rim light, shallow depth of field, rich saturated color, high contrast. Absolutely no text, no letters, no logos, no cigarettes, no smoking."
STYLE_BG="Vertical cinematic background for a premium awards-night campaign. Scene: %s. No people. Lower third darker for text overlay. Look: glossy, cinematic lighting, volumetric haze, rich saturated color, high contrast, ultra detailed. Absolutely no text, no letters, no logos, no cigarettes, no smoking."
one() {
  IFS=$'\t' read -r name ar res q subj <<<"$1"
  out="raw/$name.png"; [ -f "$out" ] && return
  mkdir -p "$(dirname "$out")"
  if [[ $name == q/* ]]; then p=$(printf "$STYLE_Q" "$subj"); else p=$(printf "$STYLE_BG" "$subj"); fi
  url=$(higgsfield generate create gpt_image_2_5 --aspect_ratio "$ar" --resolution "$res" --quality "$q" --prompt "$p" --wait --json 2>/dev/null | python3 -c "import json,sys; print(json.load(sys.stdin)[0]['result_url'])")
  [ -n "$url" ] && curl -s -o "$out" "$url" && echo "ok $name" || echo "FAIL $name"
}
export -f one; export STYLE_Q STYLE_BG
grep -v '^$' prompts.tsv | grep -- "${1:-}" | tr '\n' '\0' | xargs -0 -P 6 -I{} bash -c 'one "$@"' _ {}
