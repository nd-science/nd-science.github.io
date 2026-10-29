"""
Создание анимации: Наставник обучает (5 секунд)
"""
from pathlib import Path
from PIL import Image, ImageDraw
import numpy as np

BASE = Path(r"D:\Projects\Natali\KompasIMG")
OUTPUT = BASE / "Наставник_обучает.gif"

# Конфигурация
CANVAS_SIZE = (400, 400)
FPS = 10
DURATION_MS = 100  # 1000ms / 10fps = 100ms per frame

# Загружаем ассеты
def load_asset(filename, folder="cards_v2"):
    path = BASE / folder / filename
    if path.exists():
        return Image.open(path).convert("RGBA")
    return None

# Ассеты
assets = {
    "character_explain": load_asset("Наставник - 4. Объяснение.png"),
    "character_concentrate": load_asset("Наставник - 7. Сосредоточенность.png"),
    "character_joy": load_asset("Наставник - 1. Радость.png"),
    "book_closed": load_asset("Доп - Книга закрытая.png", "extras_v2"),
    "book_open": load_asset("Доп - Книга открытая.png", "extras_v2"),
}

print("Загруженные ассеты:")
for name, img in assets.items():
    if img:
        print(f"  {name}: {img.size}")
    else:
        print(f"  {name}: НЕ НАЙДЕН!")

def create_frame(character_img, book_img, bob_offset=0, book_scale=1.0):
    """Создаём один кадр анимации"""
    # Создаём холст
    canvas = Image.new("RGBA", CANVAS_SIZE, (255, 255, 255, 255))
    
    if not character_img or not book_img:
        return canvas
    
    # Масштабируем персонажа
    char_width = 200
    char_height = int(character_img.size[1] * (char_width / character_img.size[0]))
    character = character_img.resize((char_width, char_height), Image.Resampling.LANCZOS)
    
    # Позиция персонажа (по центру, с учётом bob_offset)
    char_x = (CANVAS_SIZE[0] - char_width) // 2
    char_y = (CANVAS_SIZE[1] - char_height) // 2 - 30 + bob_offset
    
    # Вставляем персонажа
    canvas.paste(character, (char_x, char_y), character)
    
    # Масштабируем книгу
    book_width = int(book_img.size[0] * book_scale)
    book_height = int(book_img.size[1] * book_scale)
    book = book_img.resize((book_width, book_height), Image.Resampling.LANCZOS)
    
    # Позиция книги (справа внизу от персонажа)
    book_x = char_x + char_width - 40
    book_y = char_y + char_height - 60
    
    # Вставляем книгу
    canvas.paste(book, (book_x, book_y), book)
    
    return canvas

def create_animation():
    """Создаём анимацию"""
    frames = []
    
    print("\nСоздание кадров:")
    
    # Стадия 1: Начальная поза (0-9)
    print("  Стадия 1: Начальная поза")
    for i in range(10):
        bob = int(2 * np.sin(i * 0.3))  # Лёгкое покачивание
        frame = create_frame(
            assets["character_explain"],
            assets["book_closed"],
            bob_offset=bob
        )
        frames.append(frame)
    
    # Стадия 2: Открывает книгу (10-19)
    print("  Стадия 2: Открывает книгу")
    for i in range(10):
        progress = i / 9  # 0.0 - 1.0
        bob = int(2 * np.sin((i + 10) * 0.3))
        
        # Плавный переход от закрытой к открытой книге
        if progress < 0.5:
            book = assets["book_closed"]
        else:
            book = assets["book_open"]
        
        frame = create_frame(
            assets["character_concentrate"],
            book,
            bob_offset=bob
        )
        frames.append(frame)
    
    # Стадия 3: Читает/объясняет (20-29)
    print("  Стадия 3: Читает/объясняет")
    for i in range(10):
        bob = int(3 * np.sin((i + 20) * 0.4))  # Более активное покачивание
        frame = create_frame(
            assets["character_concentrate"],
            assets["book_open"],
            bob_offset=bob
        )
        frames.append(frame)
    
    # Стадия 4: Переворачивает страницу (30-39)
    print("  Стадия 4: Переворачивает страницу")
    for i in range(10):
        bob = int(2 * np.sin((i + 30) * 0.3))
        # Анимация переворота - книга немного двигается
        book_scale = 1.0 + 0.1 * np.sin(i * 0.5)
        frame = create_frame(
            assets["character_explain"],
            assets["book_open"],
            bob_offset=bob,
            book_scale=book_scale
        )
        frames.append(frame)
    
    # Стадия 5: Закрывает книгу (40-49)
    print("  Стадия 5: Закрывает книгу")
    for i in range(10):
        progress = i / 9  # 0.0 - 1.0
        bob = int(2 * np.sin((i + 40) * 0.3))
        
        # Плавный переход от открытой к закрытой книге
        if progress < 0.5:
            book = assets["book_open"]
        else:
            book = assets["book_closed"]
        
        frame = create_frame(
            assets["character_joy"],
            book,
            bob_offset=bob
        )
        frames.append(frame)
    
    return frames

def save_gif(frames, output_path):
    """Сохраняем анимацию как GIF"""
    print(f"\nСохранение GIF: {output_path}")
    
    # Конвертируем в RGB для GIF
    rgb_frames = []
    for frame in frames:
        # Создаём белый фон
        bg = Image.new("RGB", CANVAS_SIZE, (255, 255, 255))
        bg.paste(frame, (0, 0), frame)
        rgb_frames.append(bg)
    
    # Сохраняем
    rgb_frames[0].save(
        output_path,
        save_all=True,
        append_images=rgb_frames[1:],
        duration=DURATION_MS,
        loop=0,  # Бесконечный цикл
        optimize=True
    )
    
    print(f"  Готово! {len(frames)} кадров, {DURATION_MS}ms на кадр")
    print(f"  Длительность: {len(frames) * DURATION_MS / 1000:.1f} секунд")

if __name__ == "__main__":
    print("=" * 60)
    print("СОЗДАНИЕ АНИМАЦИИ: Наставник обучает")
    print("=" * 60)
    
    frames = create_animation()
    save_gif(frames, OUTPUT)
    
    print("\n" + "=" * 60)
    print("ГОТОВО!")
    print(f"  Файл: {OUTPUT}")
    print("=" * 60)
