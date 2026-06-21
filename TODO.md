# TODO (VibeBoard - Drag & Drop UX)

- [ ] Update `src/components/GameBoard.jsx`:
  - [ ] Hide draggable item node asli saat sedang drag (hindari duplicate/ghost)
  - [ ] Tampilkan hanya `DragOverlay` sebagai preview
  - [ ] Kurangi efek visual target saat `isOver` (hapus/mildkan scale agar drop presisi)
  - [ ] Rapikan `DragOverlayItem` (hilangkan rotate/scale berlebihan agar tidak terasa loncat)
  - [ ] Tambahkan animasi smooth (±200–300ms) saat chip baru masuk ke target benar
  - [ ] Pastikan z-index & pointer-events aman

