#!/usr/bin/env python3
"""
process_VHSArchie.py - Verarbeitet VHS-Archiv-Einträge für die Houloc-Website.

Verwendung: python process_VHSArchie.py <ordnername>
Beispiel: python process_VHSArchie.py "# 14 - ALEXIS GUILLIER"

Das Skript:
1. Sucht alle Bilder im Ordner VHS/<ordnername>/
2. Optimiert sie für Web (max 1920px Breite)
3. Speichert sie in img/ mit Präfix vhs-<data-id>-XX.jpg
4. Liest das Textdokument und extrahiert Informationen
5. Erstellt den archiveData-Eintrag in script.js
6. Macht den Eintrag in archives.html klickbar
"""

import os
import sys
import re
import shutil
from pathlib import Path

# Versuche PIL zu importieren, falls nicht verfügbar, verwende Fallback
try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print("⚠ WARNUNG: Pillow nicht installiert. Bilder werden nicht optimiert.")
    print("  Installiere mit: pip install Pillow")

# Konfiguration
MAX_WIDTH = 1920
JPEG_QUALITY = 85
SUPPORTED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}
VHS_DIR = "VHS"
IMG_DIR = "img"
SCRIPT_FILE = "script.js"
ARCHIVES_FILE = "archives.html"


def normalize_to_data_id(folder_name: str) -> str:
    """
    Normalisiert einen Ordnernamen zu einer data-id.
    Beispiel: "# 15 - FESTIVAL VHS" -> "festivalvhs"
    Beispiel: "# 14 - ALEXIS GUILLIER" -> "alexisguillier"
    """
    # Mapping für bekannte Ordner
    manual_mapping = {
        "# 15 - FESTIVAL VHS": "festivalvhs",
        "# 14 - ALEXIS GUILLIER": "alexisguillier",
        "# 13 - SACHA REY": "sacharey",
        "# 12 - ARNAUD DEZOTEUX": "arnauddezoteux",
        "# 11 - MAGALI DOUGOUD": "magalidougoud",
        "# 10 - PATRICKANDRÉDEPUIS1966 & CHRISTINE JOUVE": "patrickandredepuis1966christinejouve",
        "# 9 - ANNE-CHARLOTTE FINEL": "annecharlottefinel",
        "# 8 - CARTE BLANCHE - YASMINA BENABDERRAHMANE": "carteblanaceyasminebenabderrahmane",
        "# 7 - ELOÏSE LE GALLO ET JULIA BORDERIE": "eloiselegalloetjuliaborderie",
        "# 6 - FANNY DIDELON ET EMMA BOCCANFUSO": "fannydidelonetemmaboccanfuso",
        "# 5 - SARAH SRAGE": "sarahsrage",
        "# 4 - CHLOÉ MOSSESSIAN": "chloemossessian",
        "# 3 - MEHDI BESNAINOU": "mehdibesnainou",
        "# 2 - SAMI TRABELSI": "samitrabelsi",
        "# 1 - CHARLOTTE EL MOUSSAED": "charlotteelmoussaed",
    }
    
    if folder_name in manual_mapping:
        return manual_mapping[folder_name]
    
    # Automatische Normalisierung
    normalized = folder_name.lower()
    # Entferne Nummer-Prefix
    normalized = re.sub(r'^#\s*\d+\s*-\s*', '', normalized)
    # Entferne alle nicht-alphanumerischen Zeichen
    normalized = re.sub(r'[^a-z0-9]', '', normalized)
    return normalized


def normalize_to_display_name(folder_name: str) -> str:
    """
    Normalisiert einen Ordnernamen für die Anzeige.
    Beispiel: "# 15 - FESTIVAL VHS" -> "#15 FESTIVAL VHS"
    """
    # Entferne Leerzeichen um die Raute
    display = re.sub(r'#\s+', '#', folder_name)
    return display


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
        if ext.lower() in {e.lower() for e in SUPPORTED_EXTENSIONS}:
            images.append((os.path.join(folder_path, filename), filename))
    
    if not images:
        print(f"FEHLER: Keine Bilder gefunden in {folder_path}")
        sys.exit(1)
    
    return images


def find_text_file(folder_path: str) -> str:
    """
    Findet das Textdokument im Ordner.
    Gibt den Pfad zur Textdatei zurück oder None.
    """
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            return os.path.join(folder_path, filename)
    return None


def read_text_file(file_path: str) -> dict:
    """
    Liest das Textdokument und extrahiert Informationen.
    Gibt ein Dictionary mit title, info, description, text, links zurück.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.strip().split('\n')
    
    # Extrahiere Titel (erste Zeile)
    title = lines[0].strip() if lines else ""
    
    # Extrahiere Datum (zweite Zeile, falls vorhanden)
    info = ""
    description = ""
    text = ""
    links = []
    
    # Suche nach Datum-Pattern (DD/DD/MM/YYYY oder DD+DD/MM/YYYY)
    for line in lines:
        if re.search(r'\d{1,2}[/+]\d{1,2}/\d{4}', line):
            info = line.strip()
            break
    
    # Sammle alle Zeilen für den Text
    text_lines = []
    
    for line in lines:
        line_stripped = line.strip()
        
        # Überspringe leere Zeilen und die Titel/Datum-Zeilen
        if not line_stripped or line_stripped == title or line_stripped == info:
            continue
        
        # Erkenne Links
        if 'http' in line_stripped:
            links.append(line_stripped)
            continue
        
        # Füge Zeile zum Text hinzu
        text_lines.append(line_stripped)
    
    # Kombiniere Textzeilen
    text = '<br><br>'.join(text_lines)
    
    # Extrahiere Künstler aus dem Text (falls vorhanden)
    artist_match = re.search(r'(?:ARTISTES?|Artistes?)\s*:\s*(.+?)(?:\n|$)', content, re.IGNORECASE)
    if artist_match:
        description = artist_match.group(1).strip()
    
    return {
        'title': title,
        'info': info,
        'description': description,
        'text': text,
        'links': links
    }


def classify_orientation(image_path: str) -> str:
    """
    Bestimmt die Orientierung eines Bildes.
    Gibt 'landscape' oder 'portrait' zurück.
    """
    if not HAS_PIL:
        # Fallback: Verwende Dateinamen-Heuristik
        filename = os.path.basename(image_path).lower()
        if 'h_' in filename or 'horizontal' in filename:
            return 'landscape'
        return 'portrait'
    
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            return "landscape" if width > height else "portrait"
    except Exception as e:
        print(f"⚠ WARNUNG: Konnte Bild nicht öffnen {image_path}: {e}")
        return "landscape"


def process_image(source_path: str, target_filename: str) -> str:
    """
    Verarbeitet ein Bild:
    - Resize auf max MAX_WIDTH Breite (falls PIL verfügbar)
    - Web-Optimierung (JPEG Qualität)
    - Speichert in IMG_DIR
    
    Gibt den relativen Pfad zurück (z.B. "img/vhs-festivalvhs-01.jpg")
    """
    target_path = os.path.join(IMG_DIR, target_filename)
    
    if HAS_PIL:
        try:
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
        except Exception as e:
            print(f"⚠ WARNUNG: Fehler bei Bildverarbeitung {source_path}: {e}")
            # Fallback: Kopiere Original
            shutil.copy2(source_path, target_path)
    else:
        # Fallback: Kopiere Original ohne Verarbeitung
        shutil.copy2(source_path, target_path)
    
    return f"img/{target_filename}"


def generate_images_js(images: list, data_id: str) -> str:
    """
    Generiert JavaScript Array für Bilder.
    images: Liste von (relative_path, orientation) Tupeln
    Gibt einen String mit den formatierten Einträgen zurück.
    """
    # Trenne in Landscape und Portrait
    landscape = [(path, orient) for path, orient in images if orient == "landscape"]
    portrait = [(path, orient) for path, orient in images if orient == "portrait"]
    
    # Kombiniere: zuerst Landscape, dann Portrait
    ordered = landscape + portrait
    
    # Generiere Einträge
    entries = []
    for i, (path, _) in enumerate(ordered):
        is_last = (i == len(ordered) - 1)
        comma = "" if is_last else ","
        entries.append(f'            {{ src: "{path}", caption: "" }}{comma}')
    
    return "\n".join(entries)


def format_links_for_text(links: list) -> str:
    """
    Formatiert Links für den Text-Bereich.
    """
    if not links:
        return ""
    
    links_html = "<br><br>Liens :<br>"
    for link in links:
        # Extrahiere Link-Text
        link_text = link.split('http')[0].strip()
        if not link_text:
            # Verwende Domain als Text
            link_text = link.split('/')[2][:30] if len(link.split('/')) > 2 else link[:30]
        links_html += f"<a href='{link}' target='_blank'>{link_text}</a><br>"
    
    return links_html


def create_archive_entry(data_id: str, text_data: dict, flyer_path: str, images_js: str) -> str:
    """
    Erstellt einen vollständigen archiveData-Eintrag.
    """
    # Kombiniere Text mit Links
    links_text = format_links_for_text(text_data['links'])
    full_text = text_data['text'] + links_text
    
    # Escape Anführungszeichen für JavaScript
    full_text = full_text.replace('"', '\\"').replace('\n', '\\n')
    description = text_data['description'].replace('"', '\\"')
    
    entry = f'''    {data_id}: {{
        title: "{text_data['title']}",
        description:
            "{description}",
        info: "{text_data['info']}",
        flyer: "{flyer_path}",
        text: "{full_text}",
        images: [
{images_js}
        ]
    }},'''
    
    return entry


def update_script_js(data_id: str, entry: str):
    """
    Aktualisiert die script.js Datei mit dem neuen Eintrag.
    """
    if not os.path.exists(SCRIPT_FILE):
        print(f"FEHLER: {SCRIPT_FILE} nicht gefunden!")
        sys.exit(1)
    
    with open(SCRIPT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Prüfe ob Eintrag bereits existiert
    if f'{data_id}:' in content:
        print(f"⚠ Eintrag '{data_id}' existiert bereits in {SCRIPT_FILE}")
        print("  Überspringe script.js Update.")
        return
    
    # Finde Position für neuen Eintrag (vor der schließenden Klammer von archiveData)
    # Suche nach dem letzten Eintrag vor };
    pattern = r'(\};\s*\n\s*\n\s*// 2\. Kern-Funktion)'
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        # Füge neuen Eintrag vor der schließenden Klammer ein
        new_content = content[:match.start(1)] + entry + "\n\n" + match.group(1) + content[match.end(1):]
        
        with open(SCRIPT_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ Neuer archiveData Eintrag '{data_id}' in {SCRIPT_FILE} erstellt.")
    else:
        print(f"⚠ WARNUNG: Konnte archiveData Struktur nicht finden in {SCRIPT_FILE}")
        print("Bitte füge den Eintrag manuell ein:")
        print(entry)


def update_archives_html(data_id: str, display_name: str):
    """
    Aktualisiert die archives.html Datei:
    - Findet den Eintrag mit dem display_name
    - Fügt das data-id Attribut hinzu
    """
    if not os.path.exists(ARCHIVES_FILE):
        print(f"FEHLER: {ARCHIVES_FILE} nicht gefunden!")
        sys.exit(1)
    
    with open(ARCHIVES_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Suche nach dem Eintrag ohne data-id
    pattern = rf'(<div class="archive-item">){re.escape(display_name)}(</div>)'
    match = re.search(pattern, content)
    
    if match:
        # Füge data-id hinzu
        new_content = content[:match.start(1)] + f'<div class="archive-item" data-id="{data_id}">' + display_name + match.group(2) + content[match.end(2):]
        
        with open(ARCHIVES_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ Eintrag '{display_name}' in {ARCHIVES_FILE} klickbar gemacht.")
    else:
        # Prüfe ob bereits data-id vorhanden
        pattern_with_id = rf'<div class="archive-item" data-id="{re.escape(data_id)}">'
        if re.search(pattern_with_id, content):
            print(f"✓ Eintrag '{display_name}' in {ARCHIVES_FILE} bereits klickbar.")
        else:
            print(f"⚠ WARNUNG: Eintrag '{display_name}' nicht gefunden in {ARCHIVES_FILE}")


def main():
    """Hauptfunktion"""
    print("=" * 60)
    print("VHS Archiv Processor - Houloc Website")
    print("=" * 60)
    print()
    
    # Prüfe Argument
    if len(sys.argv) < 2:
        print("Verwendung: python process_VHSArchie.py <ordnername>")
        print('Beispiel: python process_VHSArchie.py "# 14 - ALEXIS GUILLIER"')
        print()
        print("Verfügbare Ordner:")
        if os.path.exists(VHS_DIR):
            for folder in sorted(os.listdir(VHS_DIR)):
                if os.path.isdir(os.path.join(VHS_DIR, folder)):
                    print(f"  - {folder}")
        sys.exit(1)
    
    folder_name = sys.argv[1]
    
    # Normalisiere zu data-id und display-name
    data_id = normalize_to_data_id(folder_name)
    display_name = normalize_to_display_name(folder_name)
    
    print(f"Ordner:      {folder_name}")
    print(f"Data-ID:     {data_id}")
    print(f"Display:     {display_name}")
    print()
    
    # Finde Bilder
    source_folder = os.path.join(VHS_DIR, folder_name)
    images = find_images(source_folder)
    print(f"📷 Gefundene Bilder: {len(images)}")
    
    # Finde und lese Textdokument
    text_file = find_text_file(source_folder)
    text_data = {
        'title': display_name,
        'info': '',
        'description': '',
        'text': 'Description à compléter.',
        'links': []
    }
    
    if text_file:
        print(f"📄 Textdokument: {os.path.basename(text_file)}")
        text_data = read_text_file(text_file)
        print(f"   Titel: {text_data['title'][:50]}...")
        if text_data['info']:
            print(f"   Info:  {text_data['info']}")
        if text_data['links']:
            print(f"   Links: {len(text_data['links'])}")
    else:
        print("⚠  Kein Textdokument gefunden")
    
    print()
    
    # Erstelle img Ordner falls nicht vorhanden
    os.makedirs(IMG_DIR, exist_ok=True)
    
    # Verarbeite Bilder
    processed_images = []
    landscape_count = 0
    portrait_count = 0
    flyer_path = ""
    
    print("🔄 Verarbeite Bilder:")
    for i, (source_path, original_filename) in enumerate(images, 1):
        # Bestimme Orientierung
        orientation = classify_orientation(source_path)
        
        # Generiere neuen Dateinamen
        ext = ".jpg"
        new_filename = f"vhs-{data_id}-{i:02d}{ext}"
        
        # Verarbeite Bild
        relative_path = process_image(source_path, new_filename)
        processed_images.append((relative_path, orientation))
        
        # Erstes Bild als Flyer
        if i == 1:
            flyer_path = relative_path
        
        if orientation == "landscape":
            landscape_count += 1
        else:
            portrait_count += 1
        
        orient_symbol = "🖼️" if orientation == "landscape" else "📱"
        print(f"   [{i}/{len(images)}] {orient_symbol} {original_filename} → {new_filename}")
    
    print()
    print(f"📊 Statistik: {landscape_count} Landscape | {portrait_count} Portrait")
    print()
    
    # Generiere JavaScript für Bilder (ohne das erste Bild, da es der Flyer ist)
    gallery_images = processed_images[1:] if len(processed_images) > 1 else []
    images_js = generate_images_js(gallery_images, data_id)
    
    # Erstelle archiveData Eintrag
    entry = create_archive_entry(data_id, text_data, flyer_path, images_js)
    
    # Aktualisiere script.js
    print("📝 Aktualisiere script.js...")
    update_script_js(data_id, entry)
    
    # Aktualisiere archives.html
    print("📝 Aktualisiere archives.html...")
    update_archives_html(data_id, display_name)
    
    # Erfolgsmeldung
    print()
    print("=" * 60)
    print(f"✅ ERFOLGREICH: {len(processed_images)} Bilder verarbeitet!")
    print(f"   Quelle:   {source_folder}")
    print(f"   Ziel:     {IMG_DIR}/")
    print(f"   Data-ID:  {data_id}")
    print(f"   Flyer:    {flyer_path}")
    print(f"   Gallery:  {len(gallery_images)} Bilder")
    print("=" * 60)


if __name__ == "__main__":
    main()