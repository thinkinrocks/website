#!/usr/bin/env bash
set -euo pipefail

BASE="https://res.cloudinary.com/dby6mmmff/image/upload"

mkdir -p public/images/about public/images/team

echo "Downloading about page carousel images..."
curl -L "$BASE/w_1200,h_800,c_fill/photo_2026-02-28_19.44.04_o1ovgk" -o public/images/about/lab-workspace-desks.jpg
curl -L "$BASE/w_1200,h_800,c_fill/photo_2026-02-28_19.44.06_pzzzhp" -o public/images/about/lab-interior-main.jpg
curl -L "$BASE/w_1200,h_800,c_fill/photo_2026-02-28_19.44.11_ucz7pf" -o public/images/about/lab-space-overview.jpg
curl -L "$BASE/w_1200,h_800,c_fill/whole-area_v4qg1y" -o public/images/about/lab-main-overview.jpg
curl -L "$BASE/w_1200,h_800,c_fill/shelf-area_sfnum4" -o public/images/about/lab-hardware-shelves.jpg
curl -L "$BASE/w_1200,h_800,c_fill/chill-area_iz650y" -o public/images/about/lab-chill-area.jpg

echo "Downloading team avatar images..."
curl -L "$BASE/w_256,h_256,c_fill/milana-min_yrnyld" -o public/images/team/team-milana.jpg
curl -L "$BASE/w_256,h_256,c_fill/yerzhan-min_gl7gur" -o public/images/team/team-yerzhan.jpg
curl -L "$BASE/w_256,h_256,c_fill/alex-min_ypkkz2" -o public/images/team/team-alex.jpg
curl -L "$BASE/w_256,h_256,c_fill/daniyar-min_kok519" -o public/images/team/team-daniyar.jpg
curl -L "$BASE/w_256,h_256,c_fill/photo_2026-02-28_13.35.24_utmlwr" -o public/images/team/team-arthur.jpg
curl -L "$BASE/w_256,h_256,c_fill/1738858718555_ghqvgp" -o public/images/team/team-vlad.jpg
curl -L "$BASE/w_256,h_256,c_fill/photo_2026-02-28_20.19.07_j1tzdc" -o public/images/team/team-karim.jpg
curl -L "$BASE/w_256,h_256,c_fill/2026_01_viktor_solianoi_0_p63ypw" -o public/images/team/team-viktor.jpg

echo "Done. Local Cloudinary images are in public/images/about and public/images/team."

