#!/usr/bin/env bash
set -euo pipefail

BASE="https://res.cloudinary.com/dby6mmmff/image/upload"

mkdir -p public/images/about public/images/team

echo "Downloading about page carousel images..."
curl -L "$BASE/w_1200,h_800,c_fill/photo_2026-02-28_19.44.04_o1ovgk" -o public/images/about/photo_2026-02-28_19.44.04_o1ovgk.jpg
curl -L "$BASE/w_1200,h_800,c_fill/photo_2026-02-28_19.44.06_pzzzhp" -o public/images/about/photo_2026-02-28_19.44.06_pzzzhp.jpg
curl -L "$BASE/w_1200,h_800,c_fill/photo_2026-02-28_19.44.11_ucz7pf" -o public/images/about/photo_2026-02-28_19.44.11_ucz7pf.jpg
curl -L "$BASE/w_1200,h_800,c_fill/whole-area_v4qg1y" -o public/images/about/whole-area_v4qg1y.jpg
curl -L "$BASE/w_1200,h_800,c_fill/shelf-area_sfnum4" -o public/images/about/shelf-area_sfnum4.jpg
curl -L "$BASE/w_1200,h_800,c_fill/chill-area_iz650y" -o public/images/about/chill-area_iz650y.jpg

echo "Downloading team avatar images..."
curl -L "$BASE/w_256,h_256,c_fill/milana-min_yrnyld" -o public/images/team/milana-min_yrnyld.jpg
curl -L "$BASE/w_256,h_256,c_fill/yerzhan-min_gl7gur" -o public/images/team/yerzhan-min_gl7gur.jpg
curl -L "$BASE/w_256,h_256,c_fill/alex-min_ypkkz2" -o public/images/team/alex-min_ypkkz2.jpg
curl -L "$BASE/w_256,h_256,c_fill/daniyar-min_kok519" -o public/images/team/daniyar-min_kok519.jpg
curl -L "$BASE/w_256,h_256,c_fill/photo_2026-02-28_13.35.24_utmlwr" -o public/images/team/photo_2026-02-28_13.35.24_utmlwr.jpg
curl -L "$BASE/w_256,h_256,c_fill/1738858718555_ghqvgp" -o public/images/team/1738858718555_ghqvgp.jpg
curl -L "$BASE/w_256,h_256,c_fill/photo_2026-02-28_20.19.07_j1tzdc" -o public/images/team/photo_2026-02-28_20.19.07_j1tzdc.jpg
curl -L "$BASE/w_256,h_256,c_fill/2026_01_viktor_solianoi_0_p63ypw" -o public/images/team/2026_01_viktor_solianoi_0_p63ypw.jpg

echo "Done. Local Cloudinary images are in public/images/about and public/images/team."

