#!/usr/bin/env python3
"""
process_expo.py - Verarbeitet Bilder einer Ausstellung für die Houloc-Website.

Verwendung: python process_expo.py <ordnername>
Beispiel: python process_expo.py "FLAT-O-RAMA"

Das Skript:
1. Sucht alle Bilder im Ordner Expositions/<ordnername>/
2. Optimiert sie für Web (max 1920px Breite)
3. Speichert sie in img/ mit Präfix expo-<data-id>-XX.jpg
4. Fügt die <img> Tags in script.js ein (archiveData)
"""

import os
import sys
import re
from pathlib import Path
from PIL import Image

# Konfiguration
MAX_WIDTH = 1920
JPEG_QUALITY = 85
SUPPORTED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}
EXPOSITIONS_DIR = "Expositions"
IMG_DIR = "img"
SCRIPT_FILE = "script.js"


def normalize_to_data_id(folder_name: str) -> str:
    """
    Normalisiert einen Ordnernamen zu einer data-id.
    Beispiel: "FLAT-O-RAMA" -> "flatorama"
    Beispiel: "LES ASPIRATEURS SONT DES ÉLÉPHANTS SANS DÉFENSES" -> "lesaspirateurs"
    """
    # Mapping für bekannte Ordner (falls automatische Normalisierung nicht passt)
    manual_mapping = {
        "FLAT-O-RAMA": "flatorama",
        "LES ASPIRATEURS SONT DES ÉLÉPHANTS SANS DÉFENSES": "lesaspirateurs",
        "ÉTÉ CULTUREL 2023": "eteculturel2023",
        "POURSUIT OF PLEASURE": "poursuitofpleasure",
        "Mues": "mues",
    }
    
    # Prüfe zuerst das manuelle Mapping
    if folder_name in manual_mapping:
        return manual_mapping[folder_name]
    
    # Automatische Normalisierung:
    # 1. Alles lowercase
    # 2. Entferne Leerzeichen, Bindestriche, Sonderzeichen
    # 3. Nur alphanumerische Zeichen behalten
    normalized = folder_name.lower()
    normalized = re.sub(r'[^a-z0-9]', '', normalized)
    
    return normalized


def find_images(folder_path: str) -> list:
    """
    Findet alle unterstützten Bilddateien im Ordner.
    Gibt eine Liste von (filepath, filename) Tupeln zurück.
    """
    images = []
    if not os.path.exists(folder_path):
        print(f"FEHLER: Ordner nicht gefunden: {folder_path}")
        sys.exit(1)
    
    for filename in sorted(os.listdir(folder_path)):
        ext = os.path.splitext(filename)[1]
        if ext in SUPPORTED_EXTENSIONS:
            images.append((os.path.join(folder_path, filename), filename))
    
    if not images:
        print(f"FEHLER: Keine Bilder gefunden in {folder_path}")
        sys.exit(1)
    
    return images


def classify_orientation(image_path: str) -> str:
    """
    Bestimmt die Orientierung eines Bildes.
    Gibt 'landscape' oder 'portrait' zurück.
    """
    with Image.open(image_path) as img:
        width, height = img.size
        return "landscape" if width > height else "portrait"


def process_image(source_path: str, target_filename: str) -> str:
    """
    Verarbeitet ein Bild:
    - Resize auf max MAX_WIDTH Breite
    - Web-Optimierung (JPEG Qualität)
    - Speichert in IMG_DIR
    
    Gibt den relativen Pfad zurück (z.B. "img/expo-flatorama-01.jpg")
    """
    target_path = os.path.join(IMG_DIR, target_filename)
    
    with Image.open(source_path) as img:
        # Konvertiere zu RGB falls nötig (für PNG mit Transparenz)
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        # Resize wenn breiter als MAX_WIDTH
        width, height = img.size
        if width > MAX_WIDTH:
            ratio = MAX_WIDTH / width
            new_height = int(height * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)
        
        # Speichern mit Web-Optimierung
        img.save(target_path, 'JPEG', quality=JPEG_QUALITY, optimize=True)
    
    return f"img/{target_filename}"


def generate_html_tags(images: list, data_id: str) -> str:
    """
    Generiert HTML/JavaScript img Tags.
    images: Liste von (relative_path, orientation) Tupeln
    Gibt einen String mit den formatierten Tags zurück.
    """
    # Trenne in Landscape und Portrait
    landscape = [(path, orient) for path, orient in images if orient == "landscape"]
    portrait = [(path, orient) for path, orient in images if orient == "portrait"]
    
    # Kombiniere: zuerst Landscape, dann Portrait
    ordered = landscape + portrait
    
    # Generiere Tags
    tags = []
    for i, (path, _) in enumerate(ordered):
        # Bestimme ob letztes Element (kein Komma am Ende)
        is_last = (i == len(ordered) - 1)
        comma = "" if is_last else ","
        tags.append(f'            {{ src: "{path}", caption: "" }}{comma}')
    
    return "\n".join(tags)


def update_script_js(data_id: str, html_tags: str):
    """
    Aktualisiert die script.js Datei:
    - Findet den archiveData Eintrag für data_id
    - Ersetzt oder fügt die images Liste ein
    """
    if not os.path.exists(SCRIPT_FILE):
        print(f"FEHLER: {SCRIPT_FILE} nicht gefunden!")
        sys.exit(1)
    
    with open(SCRIPT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Suche nach dem archiveData Eintrag für data_id
    # Pattern: data_id: { ... images: [ ... ] ... }
    pattern = rf'({re.escape(data_id)}:\s*\{{[^}}]*?images:\s*\[)[^\]]*?(\][^}}]*?\}})'
    
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        # Ersetze nur den Inhalt der images Liste
        new_content = content[:match.start(1)] + match.group(1) + "\n" + html_tags + "\n        " + match.group(2) + content[match.end(2):]
        
        with open(SCRIPT_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ archiveData Eintrag '{data_id}' in {SCRIPT_FILE} aktualisiert.")
    else:
        print(f"⚠ WARNUNG: Kein archiveData Eintrag für '{data_id}' gefunden in {SCRIPT_FILE}")
        print(f"  Die generierten Tags wurden NICHT eingefügt.")
        print(f"  Bitte überprüfe den Ordnernamen oder füge die Tags manuell ein:")
        print(f"\n--- Generierte Tags für '{data_id}' ---")
        print(html_tags)
        print("--- Ende ---\n")


def main():
    # Prüfe Argument
    if len(sys.argv) < 2:
        print("Verwendung: python process_expo.py <ordnername>")
        print('Beispiel: python process_expo.py "FLAT-O-RAMA"')
        sys.exit(1)
    
    folder_name = sys.argv[1]
    
    # Normalisiere zu data_id
    data_id = normalize_to_data_id(folder_name)
    print(f"Ordner: {folder_name}")
    print(f"Data-ID: {data_id}")
    print()
    
    # Finde Bilder
    source_folder = os.path.join(EXPOSITIONS_DIR, folder_name)
    images = find_images(source_folder)
    print(f"Gefundene Bilder: {len(images)}")
    
    # Erstelle img Ordner falls nicht vorhanden
    os.makedirs(IMG_DIR, exist_ok=True)
    
    # Verarbeite Bilder und klassifiziere
    processed_images = []
    landscape_count = 0
    portrait_count = 0
    
    for i, (source_path, original_filename) in enumerate(images, 1):
        # Bestimme Orientierung
        orientation = classify_orientation(source_path)
        
        # Generiere neuen Dateinamen
        ext = ".jpg"  # Immer JPEG für Web-Optimierung
        new_filename = f"expo-{data_id}-{i:02d}{ext}"
        
        # Verarbeite Bild
        relative_path = process_image(source_path, new_filename)
        processed_images.append((relative_path, orientation))
        
        if orientation == "landscape":
            landscape_count += 1
        else:
            portrait_count += 1
        
        print(f"  [{i}/{len(images)}] {original_filename} → {new_filename} ({orientation})")
    
    print()
    print(f"Landscape: {landscape_count} | Portrait: {portrait_count}")
    print()
    
    # Generiere HTML Tags
    html_tags = generate_html_tags(processed_images, data_id)
    
    # Aktualisiere script.js
    update_script_js(data_id, html_tags)
    
    # Erfolgsmeldung
    print()
    print("=" * 50)
    print(f"✓ ERFOLGREICH: {len(processed_images)} Bilder verarbeitet!")
    print(f"  Ordner: {source_folder}")
    print(f"  Ziel: {IMG_DIR}/")
    print(f"  Data-ID: {data_id}")
    print("=" * 50)


if __name__ == "__main__":
    main()