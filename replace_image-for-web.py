#!/usr/bin/env python3
import os
import sys
import re
import subprocess
from pathlib import Path

# --- KONFIGURATION ---
MAX_WIDTH = 1920
AVIF_QUALITY = 30 
SUPPORTED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.avif', '.av1', '.JPG', '.PNG', '.JPEG'}
PERFORMANCES_DIR = "Performances"
IMG_DIR = "img"
SCRIPT_FILE = "script.js"

def get_image_info(path):
    """Liest Breite und Höhe via ffprobe (perfekt für AV1/AVIF/JPG)."""
    cmd = [
        'ffprobe', '-v', 'error', '-select_streams', 'v:0',
        '-show_entries', 'stream=width,height', '-of', 'csv=s=x:p=0', path
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        return 0, 0
    try:
        w, h = map(int, result.stdout.strip().split('x'))
        return w, h
    except:
        return 0, 0

def process_image_avif(source_path, target_filename):
    """Konvertiert und skaliert zu AVIF mittels FFmpeg."""
    target_path = os.path.join(IMG_DIR, target_filename)
    w, h = get_image_info(source_path)
    
    # Skalierung nur wenn breiter als MAX_WIDTH
    scale_filter = f"scale={MAX_WIDTH}:-1" if w > MAX_WIDTH else "scale=iw:ih"
    
    cmd = [
        'ffmpeg', '-y', '-i', source_path,
        '-vf', scale_filter,
        '-c:v', 'libaom-av1', '-crf', str(AVIF_QUALITY), '-still-picture', '1',
        target_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return f"img/{target_filename}"

def normalize_to_data_id(folder_name):
    manual_mapping = {
    
        "5 D'UNE RIVE À L'AUTRE": "dune-rive-a-lautre",
        "6 RACCORDS - SOLEIL NORD-EST": "raccords-soleil-nord-est",
        "7 DÎNER DE NOËL 2019": "diner-noel-2019",
        "8 LECTURES ET ACCROCHAGE": "lectures-et-accrochage",
        "9 CAPHARNAÜM": "capharnaum",
        "10 SOLEIL NORD-EST - PERFORMANCES SONORES": "soleil-nord-est-performances-sonores",
        "11 DÎNER DE NOËL - PERFORMANCE CULINAIRE ET SONORE": "diner-noel-culinaire-sonore",
    }
    if folder_name in manual_mapping:
        return manual_mapping[folder_name]
    
    normalized = folder_name.lower()
    normalized = re.sub(r'[^a-z0-9]', '', normalized)
    return normalized

def update_script_js(data_id, tags):
    if not os.path.exists(SCRIPT_FILE):
        print(f"!! {SCRIPT_FILE} nicht gefunden.")
        return
    with open(SCRIPT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    pattern = rf'("{re.escape(data_id)}":\s*\{{[^}}]*?images:\s*\[)[^\]]*?(\][^}}]*?\}})'
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        new_content = content[:match.start(1)] + match.group(1) + "\n" + tags + "\n        " + match.group(2) + content[match.end(2):]
        with open(SCRIPT_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  ✓ script.js für '{data_id}' aktualisiert.")
    else:
        print(f"  ⚠ Kein Eintrag für '{data_id}' in script.js gefunden.")

def process_single_folder(folder_name):
    data_id = normalize_to_data_id(folder_name)
    source_folder = os.path.join(PERFORMANCES_DIR, folder_name)
    
    files = sorted([f for f in os.listdir(source_folder) if Path(f).suffix in SUPPORTED_EXTENSIONS])
    if not files:
        return

    processed = []
    print(f"\n--- Verarbeite: {folder_name} (ID: {data_id}) ---")

    for i, fname in enumerate(files, 1):
        path = os.path.join(source_folder, fname)
        w, h = get_image_info(path)
        if w == 0: continue
        
        orient = "landscape" if w > h else "portrait"
        new_name = f"perf-{data_id}-{i:02d}.avif"
        
        rel_path = process_image_avif(path, new_name)
        processed.append((rel_path, orient))
        print(f"  [{i}/{len(files)}] {new_name} ({orient})")

    # Sortierung: Landscape zuerst, dann Portrait
    ordered = [p for p in processed if p[1] == "landscape"] + [p for p in processed if p[1] == "portrait"]
    
    # HTML-Tags generieren
    tag_list = []
    for i, (path, _) in enumerate(ordered):
        comma = "" if i == len(ordered) - 1 else ","
        tag_list.append(f'            {{ src: "{path}", caption: "" }}{comma}')
    
    update_script_js(data_id, "\n".join(tag_list))

def main():
    os.makedirs(IMG_DIR, exist_ok=True)
    
    # Wenn Argumente übergeben wurden, nimm diese. Sonst scanne ALLE Ordner in Performances.
    if len(sys.argv) > 1:
        folders = sys.argv[1:]
    else:
        print(f"Scanne alle Ordner in {PERFORMANCES_DIR}...")
        folders = sorted([f for f in os.listdir(PERFORMANCES_DIR) if os.path.isdir(os.path.join(PERFORMANCES_DIR, f))])
    
    for folder in folders:
        process_single_folder(folder)
    
    print("\n" + "="*30)
    print("ALLE ORDNER ABGEARBEITET!")
    print("="*30)

if __name__ == "__main__":
    main()