cd ~/Desktop/TabacaleraEspert/descubri-tu-blend/public/blends
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126.0 Safari/537.36"
ok=0; fail=0
while IFS= read -r line; do
  dest="${line%%|*}"; id="${line##*|}"
  curl -sL -A "$UA" "https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t" -o "$dest"
  if [ "$(file -b --mime-type "$dest")" = "image/jpeg" ]; then ok=$((ok+1)); else rm -f "$dest"; fail=$((fail+1)); fi
  sleep 1
done < /tmp/vk_miss.txt
echo "OK=$ok FAIL=$fail"
