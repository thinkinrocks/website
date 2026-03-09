#!/usr/bin/env bash
set -euo pipefail

BASE="https://res.cloudinary.com/dby6mmmff/image/upload"

mkdir -p public/images/hardware

echo "Downloading Cloudinary-backed hardware images..."

# Varjo XR-3
curl -L "$BASE/varjo-xr3_t353nm" -o public/images/hardware/varjo-xr3_t353nm.jpg

# Doublepoint Dev Kit
curl -L "$BASE/doublepoint_imsl0w" -o public/images/hardware/doublepoint_imsl0w.jpg

# Alif Ensemble DevKit
curl -L "$BASE/alif_semi_flnyws" -o public/images/hardware/alif_semi_flnyws.jpg

# Shelby Computer
curl -L "$BASE/shelby-computer_cndb2j" -o public/images/hardware/shelby-computer_cndb2j.jpg

# Nexys A7 FPGA
curl -L "$BASE/nexys-a7_g2jiyh" -o public/images/hardware/nexys-a7_g2jiyh.jpg

# Tenstorrent Blackhole
curl -L "$BASE/tenstorrent_igxdgh" -o public/images/hardware/tenstorrent_igxdgh.jpg

# Jetson Orin Nano
curl -L "$BASE/jetson-nano_dypbw9" -o public/images/hardware/jetson-nano_dypbw9.jpg

# Lenovo Legion T5
curl -L "$BASE/lenovo-legion-t5_ilvqhw" -o public/images/hardware/lenovo-legion-t5_ilvqhw.jpg

# AMD Kria KR260
curl -L "$BASE/amd-robotics_x3a9q3" -o public/images/hardware/amd-robotics_x3a9q3.jpg

# AMD Kria KV260
curl -L "$BASE/amd-vision_d4flw0" -o public/images/hardware/amd-vision_d4flw0.jpg

# OAK-D Pro
curl -L "$BASE/camera_g2vijm" -o public/images/hardware/camera_g2vijm.jpg

# Seetrue ST ONE eye tracker
curl -L "$BASE/st-one-eye-tracker" -o public/images/hardware/st-one-eye-tracker.jpg

# Sony mocopi Pro Kit
curl -L "$BASE/sony-mocopi-Pro-Kit" -o public/images/hardware/sony-mocopi-Pro-Kit.jpg

# Bambu Lab P1S + AMS 2 Pro
curl -L "$BASE/bambu-p1s-ams2-pro" -o public/images/hardware/bambu-p1s-ams2-pro.jpg

# Ultracortex Mark IV + Cyton
curl -L "$BASE/ultracortex-mark-iv-cyton" -o public/images/hardware/ultracortex-mark-iv-cyton.jpg

# OpenBCI EXG Experiment Bundle
curl -L "$BASE/openbci-exg-experiment-bundle" -o public/images/hardware/openbci-exg-experiment-bundle.jpg

echo "Done. Hardware images downloaded into public/images/hardware."

