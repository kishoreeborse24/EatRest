import re
from pathlib import Path
path = Path('delfood-style.css')
text = path.read_text(encoding='utf8')
terms = ['.slider_section', '.hero_area', '.detail-box', '.slider_container', '.item', '.img-box', '.find_container', '.custom_nav-container', '@keyframes', 'animation', 'transform', 'transition']
for term in terms:
    print('\n' + '='*40)
    print(term)
    for m in re.finditer(re.escape(term), text):
        start = max(0, m.start() - 200)
        end = min(len(text), m.end() + 400)
        snippet = text[start:end]
        print('---')
        print(snippet.replace('\n', ' '))
        break
