# Asset manifest
Nothing third-party is bundled. Components show a dashed placeholder naming the file when an image is missing.
Drop transparent PNG/WebP files (<=900px tall) into `public/`:
| Slot | Path | Notes |
|---|---|---|
| Maomao cutout | public/characters/maomao.png | user-provided / licensed |
| Toji Fushiguro cutout | public/characters/toji.png | user-provided / licensed |
| Seiroku Sakamoto cutout | public/characters/sakamoto.png | user-provided / licensed |
| Artist photos | public/artists/<name>.jpg | official press photos only |
| Album covers | public/albums/<title>.jpg | from the user's own files or official embeds |
Then pass the path as `src` (or `photo`, `labelSrc`). No audio is included.
