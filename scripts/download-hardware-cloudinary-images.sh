#!/usr/bin/env bash
set -euo pipefail

BASE="https://res.cloudinary.com/dby6mmmff/image/upload"

mkdir -p public/images/hardware

echo "Downloading Cloudinary-backed hardware images..."

# Varjo XR-3
curl -L "$BASE/varjo-xr3_t353nm" -o public/images/hardware/hardware-varjo-xr3.jpg

# Doublepoint Dev Kit
curl -L "$BASE/doublepoint_imsl0w" -o public/images/hardware/hardware-doublepoint-dev-kit.jpg

# Alif Ensemble DevKit
curl -L "$BASE/alif_semi_flnyws" -o public/images/hardware/hardware-alifensemble.jpg

# Shelby Computer
curl -L "$BASE/shelby-computer_cndb2j" -o public/images/hardware/hardware-shelby-computer.jpg

# Nexys A7 FPGA
curl -L "$BASE/nexys-a7_g2jiyh" -o public/images/hardware/hardware-nexys-a7-fpga.jpg

# Tenstorrent Blackhole
curl -L "$BASE/tenstorrent_igxdgh" -o public/images/hardware/hardware-tenstorrent-blackhole.jpg

# Jetson Orin Nano
curl -L "$BASE/jetson-nano_dypbw9" -o public/images/hardware/hardware-jetson-orin-nano.jpg

# Lenovo Legion T5
curl -L "$BASE/lenovo-legion-t5_ilvqhw" -o public/images/hardware/hardware-lenovo-legion-t5.jpg

# AMD Kria KR260
curl -L "$BASE/amd-robotics_x3a9q3" -o public/images/hardware/hardware-amd-kria-kr260.jpg

# AMD Kria KV260
curl -L "$BASE/amd-vision_d4flw0" -o public/images/hardware/hardware-amd-kria-kv260.jpg

# OAK-D Pro
curl -L "$BASE/camera_g2vijm" -o public/images/hardware/hardware-oak-d-pro.jpg

# Seetrue ST ONE eye tracker
curl -L "$BASE/st-one-eye-tracker" -o public/images/hardware/hardware-seetrue-eye-tracker.jpg

# Sony mocopi Pro Kit
curl -L "$BASE/sony-mocopi-Pro-Kit" -o public/images/hardware/hardware-mobile-mocap-pro-xyn.jpg

# Bambu Lab P1S + AMS 2 Pro
curl -L "$BASE/bambu-p1s-ams2-pro" -o public/images/hardware/hardware-bambu-lab-p1s-ams2-pro.jpg

# Ultracortex Mark IV + Cyton
curl -L "$BASE/ultracortex-mark-iv-cyton" -o public/images/hardware/hardware-ultracortex-mark-iv-cyton.jpg

# OpenBCI EXG Experiment Bundle
curl -L "$BASE/openbci-exg-experiment-bundle" -o public/images/hardware/hardware-openbci-exg-experiment-bundle.jpg

echo "Done. Hardware images downloaded into public/images/hardware."

