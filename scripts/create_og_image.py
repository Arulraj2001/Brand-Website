import os
from PIL import Image, ImageDraw, ImageFont

def create_og_image():
    width = 1200
    height = 630
    img = Image.new('RGB', (width, height), color='#0F172A')
    draw = ImageDraw.Draw(img)

    # Draw gradient background overlay
    for y in range(height):
        r = int(15 + (y / height) * 12)
        g = int(23 + (y / height) * 10)
        b = int(42 - (y / height) * 15)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Top accent bar (Gold to Orange to Emerald)
    for x in range(width):
        t = x / width
        if t < 0.5:
            # Gold to Orange
            r = int(255)
            g = int(210 * (1 - t*2) + 157 * (t*2))
            b = int(30 * (1 - t*2) + 0)
        else:
            # Orange to Emerald
            t2 = (t - 0.5) * 2
            r = int(255 * (1 - t2) + 16 * t2)
            g = int(157 * (1 - t2) + 185 * t2)
            b = int(0 * (1 - t2) + 129 * t2)
        draw.line([(x, 0), (x, 8)], fill=(r, g, b))

    # Decorative glows/circles
    draw.ellipse([850, -100, 1350, 400], fill=(255, 157, 0, 15))
    draw.ellipse([-150, 300, 350, 800], fill=(59, 130, 246, 15))

    # Load system font
    try:
        font_large = ImageFont.truetype("arialbd.ttf", 64)
        font_h1 = ImageFont.truetype("arialbd.ttf", 46)
        font_sub = ImageFont.truetype("arial.ttf", 24)
        font_badge = ImageFont.truetype("arialbd.ttf", 18)
        font_bold = ImageFont.truetype("arialbd.ttf", 22)
    except:
        font_large = font_h1 = font_sub = font_badge = font_bold = ImageFont.load_default()

    # Brand Pill Badge (Top Left)
    badge_rect = [80, 70, 480, 110]
    draw.rounded_rectangle(badge_rect, radius=20, fill='#FFF9E6', outline='#FFD21E', width=2)
    draw.text((100, 79), "✨ GLOBAL DIGITAL ENGINEERING", font=font_badge, fill='#1C1C1C')

    # Main Brand Name
    draw.text((80, 140), "Ostrune", font=font_large, fill='#FFFFFF')
    draw.text((340, 160), "AGENCY", font=font_badge, fill='#FF9D00')

    # H1 Headline
    draw.text((80, 235), "Affordable Web Development, SEO &", font=font_h1, fill='#F8FAFC')
    draw.text((80, 295), "Digital Growth Systems", font=font_h1, fill='#FF9D00')

    # Subtitle
    draw.text((80, 375), "Sub-second web engineering, old website speed overhauls, high-ROAS UGC ads", font=font_sub, fill='#94A3B8')
    draw.text((80, 410), "and SEO dominance for growing businesses worldwide.", font=font_sub, fill='#94A3B8')

    # 3 Stat Cards at Bottom
    card1_rect = [80, 480, 410, 560]
    draw.rounded_rectangle(card1_rect, radius=12, fill='#1E293B', outline='#334155', width=1)
    draw.text((100, 495), "0.68s Speed Vitals", font=font_bold, fill='#10B981')
    draw.text((100, 525), "100/100 Mobile Lighthouse", font=font_sub, fill='#94A3B8')

    card2_rect = [430, 480, 760, 560]
    draw.rounded_rectangle(card2_rect, radius=12, fill='#1E293B', outline='#334155', width=1)
    draw.text((450, 495), "60% Offshore Savings", font=font_bold, fill='#FF9D00')
    draw.text((450, 525), "FAANG Quality Engineering", font=font_sub, fill='#94A3B8')

    card3_rect = [780, 480, 1110, 560]
    draw.rounded_rectangle(card3_rect, radius=12, fill='#1E293B', outline='#334155', width=1)
    draw.text((800, 495), "12-Hour SLA Reply", font=font_bold, fill='#3B82F6')
    draw.text((800, 525), "Global Timezone Coverage", font=font_sub, fill='#94A3B8')

    # Save highly optimized PNG (< 150 KB)
    public_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public')
    png_path = os.path.join(public_dir, 'og-image.png')
    jpg_path = os.path.join(public_dir, 'og-image.jpg')
    
    img.save(png_path, format='PNG', optimize=True)
    img.save(jpg_path, format='JPEG', quality=90, optimize=True)

    print(f"PNG size: {os.path.getsize(png_path)} bytes")
    print(f"JPG size: {os.path.getsize(jpg_path)} bytes")

if __name__ == '__main__':
    create_og_image()
