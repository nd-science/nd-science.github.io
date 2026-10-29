"""
Извлечение карточек из инфографики.
Следует системному промпту: сначала исследуем, потом извлекаем.
"""
from pathlib import Path
from PIL import Image
import numpy as np

BASE = Path(r"D:\Projects\Natali\KompasIMG")

# Создаём папки
for folder in ["cards_v2", "extras_v2", "cards_v2_textless", "extras_v2_textless",
               "cards_v2_textless_transparent", "extras_v2_textless_transparent"]:
    (BASE / folder).mkdir(exist_ok=True)

# ============================================================
# ЭТАП 1: Извлечение карточек
# ============================================================

# Наставник/Карточки.png (1024x633)
# Row 1: y=145-327 (182px), Row 2: y=430-620 (190px)
# Столбцы: x=22-190, 213-385, 413-577, 612-792, 825-1009
NASTAVNIK_CARDS = {
    "file": "Наставник/Карточки.png",
    "rows": [(145, 327), (430, 620)],
    "cols": [(22, 190), (213, 385), (413, 577), (612, 792), (825, 1009)],
    "emotions": [
        "Радость", "Любопытство", "Задумчивость", "Объяснение", "Удивление",
        "Уверенность", "Сосредоточенность", "Усталость", "Ободрение", "Празднование",
    ],
}

# Исследователь/Карточки.png (1024x705)
# Row 1: y=46-259 (213px), Row 2: y=388-582 (194px)
# Столбцы: x=31-217, 228-402, 427-606, 627-786, 810-998
ISSLEDOVATEL_CARDS = {
    "file": "Исследователь/Карточки.png",
    "rows": [(46, 259), (388, 582)],
    "cols": [(31, 217), (228, 402), (427, 606), (627, 786), (810, 998)],
    "emotions": [
        "Радость", "Любопытство", "Чтение", "Думает", "Удивление",
        "Сосредоточенность", "Вдохновение", "Поддержка", "Ошибка", "Усталость",
    ],
}

def extract_cards():
    """Извлекаем 20 карточек из исходников"""
    print("=" * 60)
    print("ЭТАП 1: Извлечение карточек")
    print("=" * 60)
    
    for char_name, cfg in [("Наставник", NASTAVNIK_CARDS), ("Исследователь", ISSLEDOVATEL_CARDS)]:
        img = Image.open(BASE / cfg["file"])
        print(f"\n{char_name}:")
        
        for row_idx, (ry1, ry2) in enumerate(cfg["rows"]):
            for col_idx, (cx1, cx2) in enumerate(cfg["cols"]):
                emo_idx = row_idx * 5 + col_idx
                if emo_idx >= len(cfg["emotions"]):
                    continue
                emotion = cfg["emotions"][emo_idx]
                prefix = f"{char_name} - {emo_idx + 1}. {emotion}"
                
                card = img.crop((cx1, ry1, cx2, ry2))
                card.save(BASE / "cards_v2" / f"{prefix}.png", "PNG")
                print(f"  {prefix}: {card.size[0]}x{card.size[1]}")

# ============================================================
# ЭТАП 2: Извлечение доп.элементов
# ============================================================

# Исследователь/повороты.png (585x235)
# Вид спереди: x=30-180, 3/4 вид: x=196-310
# Вид сбоку: x=340-418, Вид сзади: x=444-558
ROTATIONS = [
    ("Поворот - Вид спереди", 30, 180, 19, 208),
    ("Поворот - 3_4 вид", 196, 310, 19, 208),
    ("Поворот - Вид сбоку", 340, 418, 19, 208),
    ("Поворот - Вид сзади", 444, 558, 19, 208),
]

# Исследователь/Доп элементы.png (436x235)
# Изображения иконок: y=36-100
# 4 иконки: x=20-85, 85-200, 200-280, 280-337
EXTRAS_ITEMS = [
    ("Доп - Книга закрытая", 20, 85, 36, 100),
    ("Доп - Книга открытая", 85, 200, 36, 100),
    ("Доп - Лупа", 200, 280, 36, 100),
    ("Доп - Лампочка", 280, 337, 36, 100),
]

def extract_extras():
    """Извлекаем повороты и иконки"""
    print("\n" + "=" * 60)
    print("ЭТАП 2: Извлечение доп.элементов")
    print("=" * 60)
    
    # Повороты
    img_rot = Image.open(BASE / "Исследователь/повороты.png")
    print("\nПовороты:")
    for name, x1, x2, y1, y2 in ROTATIONS:
        crop = img_rot.crop((x1, y1, x2, y2))
        crop.save(BASE / "extras_v2" / f"{name}.png", "PNG")
        print(f"  {name}: {crop.size[0]}x{crop.size[1]}")
    
    # Иконки
    img_icons = Image.open(BASE / "Исследователь/Доп элементы.png")
    print("\nИконки:")
    for name, x1, x2, y1, y2 in EXTRAS_ITEMS:
        crop = img_icons.crop((x1, y1, x2, y2))
        crop.save(BASE / "extras_v2" / f"{name}.png", "PNG")
        print(f"  {name}: {crop.size[0]}x{crop.size[1]}")

# ============================================================
# ЭТАП 3: Удаление текста
# ============================================================

# Координаты текстовых регионов
# Наставник: текст в Row 1 на y=13-141, в Row 2 на y=358-427
# Исследователь: текст в Row 1 на y=266-361, в Row 2 на y=590-695
TEXT_REGIONS = {
    "Наставник": {
        "row1": (13, 141),  # y1, y2 текста
        "row2": (358, 427),
    },
    "Исследователь": {
        "row1": (266, 361),
        "row2": (590, 695),
    },
}

def create_textless():
    """Создаём версии без текста"""
    print("\n" + "=" * 60)
    print("ЭТАП 3: Удаление текста")
    print("=" * 60)
    
    cards_dir = BASE / "cards_v2"
    textless_dir = BASE / "cards_v2_textless"
    
    for f in sorted(cards_dir.glob("*.png")):
        img = Image.open(f)
        char_name = f.stem.split(" - ")[0]
        
        # Определяем, к какому ряду относится карточка
        # по номеру в имени файла
        try:
            card_num = int(f.stem.split(" - ")[1].split(".")[0])
        except (IndexError, ValueError):
            card_num = 1
        
        row = "row1" if card_num <= 5 else "row2"
        text_y1, text_y2 = TEXT_REGIONS[char_name][row]
        
        # Высота изображения
        img_height = img.size[1]
        
        # Удаляем текст: обрезаем снизу до начала текста
        # и сверху после текста (если текст сверху)
        if char_name == "Наставник":
            # Текст сверху для Row 1
            if row == "row1":
                textless = img.crop((0, text_y2, img.size[0], img_height))
            else:
                textless = img.crop((0, 0, img.size[0], text_y1))
        else:
            # Исследователь: текст снизу
            if row == "row1":
                textless = img.crop((0, 0, img.size[0], text_y1))
            else:
                textless = img.crop((0, 0, img.size[0], text_y1))
        
        textless.save(textless_dir / f.name, "PNG")
        print(f"  {f.stem}: {img.size} -> {textless.size}")
    
    # Доп.элементы - удаляем текст под иконками
    extras_dir = BASE / "extras_v2"
    extras_textless_dir = BASE / "extras_v2_textless"
    
    for f in sorted(extras_dir.glob("*.png")):
        img = Image.open(f)
        
        if f.stem.startswith("Доп"):
            # Иконки: текст под иконками на y=127-207
            # Обрезаем только если высота > 64px (размер иконки)
            if img.size[1] > 64:
                textless = img.crop((0, 0, img.size[0], 64))
            else:
                textless = img
        else:
            # Повороты - текста нет, оставляем как есть
            textless = img
        
        textless.save(extras_textless_dir / f.name, "PNG")
        print(f"  {f.stem}: {img.size} -> {textless.size}")

# ============================================================
# ЭТАП 4: Удаление фона (flood-fill алгоритм)
# ============================================================

def flood_fill_remove_bg(rgb, tolerance=32):
    """Flood-fill удаление фона с анализом углов"""
    from collections import deque
    
    h, w = rgb.shape[:2]
    rgb_f = rgb.astype(float)
    
    # Анализируем углы для определения фона
    corners = [rgb_f[0, 0], rgb_f[0, w-1], rgb_f[h-1, 0], rgb_f[h-1, w-1],
               rgb_f[0, w//2], rgb_f[h-1, w//2]]
    light = [c for c in corners if np.mean(c) > 160]
    bg = np.mean(light, axis=0) if light else np.mean(corners, axis=0)
    
    is_bg = np.zeros((h, w), dtype=bool)
    
    def match(y, x):
        return np.all(np.abs(rgb_f[y, x] - bg) < tolerance) and np.mean(rgb_f[y, x]) > 150
    
    # Заполняем с границ
    q = deque()
    for y in range(h):
        for x in [0, w-1]:
            if match(y, x):
                is_bg[y, x] = True
                q.append((y, x))
    for x in range(w):
        for y in [0, h-1]:
            if match(y, x) and not is_bg[y, x]:
                is_bg[y, x] = True
                q.append((y, x))
    
    # Распространяем
    while q:
        y, x = q.popleft()
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if dy == 0 and dx == 0:
                    continue
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and not is_bg[ny, nx] and match(ny, nx):
                    is_bg[ny, nx] = True
                    q.append((ny, nx))
    
    return is_bg

def save_transparent(src_path, dst_path):
    """Сохраняем изображение с прозрачным фоном"""
    from scipy.ndimage import gaussian_filter, binary_dilation
    
    img = Image.open(src_path)
    arr = np.array(img)
    if arr.ndim == 2:
        arr = np.dstack([arr, arr, arr])
    rgb = arr[:, :, :3]
    
    is_bg = flood_fill_remove_bg(rgb, tolerance=32)
    
    rgba = np.dstack([rgb, np.full(rgb.shape[:2], 255, dtype=np.uint8)])
    is_bg_d = binary_dilation(is_bg, iterations=1)
    alpha = np.where(is_bg_d, 0, 255).astype(np.uint8)
    alpha = np.clip(gaussian_filter(alpha.astype(float), sigma=0.7), 0, 255).astype(np.uint8)
    rgba[:, :, 3] = alpha
    
    result = Image.fromarray(rgba, "RGBA")
    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)
    result.save(dst_path, "PNG")
    return result.size

def create_transparent():
    """Создаём прозрачные версии"""
    print("\n" + "=" * 60)
    print("ЭТАП 4: Удаление фона")
    print("=" * 60)
    
    for src_name, dst_name in [("cards_v2_textless", "cards_v2_textless_transparent"),
                               ("extras_v2_textless", "extras_v2_textless_transparent")]:
        src_dir = BASE / src_name
        dst_dir = BASE / dst_name
        
        print(f"\n{src_name} -> {dst_name}:")
        for f in sorted(src_dir.glob("*.png")):
            dst_path = dst_dir / f.name
            size = save_transparent(f, dst_path)
            print(f"  {f.stem}: {size[0]}x{size[1]}")

# ============================================================
# ЗАПУСК
# ============================================================

if __name__ == "__main__":
    extract_cards()
    extract_extras()
    create_textless()
    create_transparent()
    
    print("\n" + "=" * 60)
    print("ГОТОВО!")
    print("=" * 60)
