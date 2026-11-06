# Integration
1. `npm i framer-motion` in the main site (React 18).
2. Copy `src/components/` and `src/styles/hve.css` into the site; import the CSS once. All classes are prefixed `hve-`; wrap usage in an element with class `hve` (sets colour variables).
3. Use components, e.g. `<CharacterShowcase name="Maomao" subtitle="..." src="/characters/maomao.png" from="left" intensity={2}/>`, `<FlowerGarden hotspots={[{x:30,y:70,note:'hi'}]}/>`, `<ArtistShowcase featured name="Olivia Rodrigo" albums={[...]}/>`.
4. Decorations take `visible`, `speed`, `style` (position it yourself). Reduced motion is respected in CSS and CharacterShowcase.
