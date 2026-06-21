import { useState, useMemo, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';

const modules = import.meta.glob('../data/kelas*/*.json', { eager: true });
const allGamesData = Object.values(modules).flatMap(mod => mod.default || mod);

import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  DragOverlay,
} from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Trophy, RotateCcw, ArrowLeft, CheckCircle2, Star } from 'lucide-react';

function splitLeadingEmote(label = '') {
  const parts = String(label).trim().split(/\s+/);
  if (parts.length < 2) return { emote: '', text: label };
  const [first, ...rest] = parts;
  const isPlainWord = /^[A-Za-z0-9]+$/.test(first);
  return isPlainWord ? { emote: '', text: label } : { emote: first, text: rest.join(' ') };
}

function LabelStack({ label, className = '', emoteClassName = '', textClassName = '' }) {
  const { emote, text } = splitLeadingEmote(label);
  return (
    <span className={`flex min-w-0 flex-col items-center justify-center gap-1 text-center ${className}`}>
      {emote && <span className={`leading-none ${emoteClassName}`}>{emote}</span>}
      <span className={`min-w-0 break-words leading-tight ${textClassName}`}>{text}</span>
    </span>
  );
}

/* ============================================================
   DRAGGABLE ITEM COMPONENT
   ============================================================ */
function DraggableItem({ id, label, image, isDropped, isLocked }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isDropped || isLocked,
  });

  const isUsed = isDropped || isLocked;

  const style = {
    opacity: isDragging ? 0 : 1,
    touchAction: 'none',
  };

  // Item sudah di-drop: tampilkan kotak kosong dengan ukuran sama agar grid tidak menyusut
  if (isDropped) {
    return (
      <div
        style={{ touchAction: 'none' }}
        className="rounded-2xl border-4 border-dashed border-gray-200 bg-gray-50/50
          h-full min-h-[110px] sm:min-h-[150px] w-full min-w-[80px]
          flex flex-col items-center justify-center"
      >
        <span className="text-3xl opacity-30">✓</span>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        draggable text-center rounded-2xl border-4 p-3 sm:p-4
        h-full min-h-[110px] sm:min-h-[150px] w-full
        flex flex-col items-center justify-center
        transition-opacity duration-150
        ${isLocked
          ? 'border-gray-300 bg-gray-100 cursor-not-allowed scale-[0.95] opacity-50 grayscale'
          : 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-100 cursor-grab active:cursor-grabbing'}
        min-w-[80px] mx-auto will-change-transform select-none
      `}
    >
      {image && (
        <img
          src={image}
          alt={label}
          className="w-16 h-16 object-contain mx-auto mb-2 pointer-events-none"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      <LabelStack
        label={label}
        className="text-lg sm:text-xl font-black text-gray-800 select-none"
        emoteClassName="text-3xl sm:text-4xl"
      />
    </div>
  );
}

/* ============================================================
   DRAG OVERLAY CONTENT
   ============================================================ */
function DragOverlayItem({ label, image }) {
  return (
    <div className="rounded-2xl border-4 border-green-500 bg-gradient-to-br from-green-50 to-emerald-100 shadow-xl p-3 cursor-grabbing opacity-95 flex flex-col items-center justify-center min-w-[120px] min-h-[130px] pointer-events-none">
      {image && (
        <img
          src={image}
          alt={label}
          className="w-16 h-16 object-contain mb-2 pointer-events-none"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      <LabelStack
        label={label}
        className="text-lg font-black text-green-800 select-none"
        emoteClassName="text-3xl"
      />
    </div>
  );
}

/* ============================================================
   DROPPABLE TARGET COMPONENT
   ============================================================ */
function DroppableTarget({ id, label, image, state, droppedItems, slotCount }) {
  const { isOver, setNodeRef } = useDroppable({ id });  const stateStyles = {
    correct:   'border-green-500 bg-gradient-to-br from-green-50 to-emerald-100',
    incorrect: 'border-red-400 bg-red-50 animate-[shake_0.5s_ease-in-out]',
    default:   'border-dashed border-gray-300 bg-gradient-to-br from-white to-gray-50 hover:border-purple-400 hover:bg-purple-50',
    over:      'border-green-400 bg-green-50 shadow-xl border-solid scale-[1.02] transform',
  };

  const currentStyle = isOver ? stateStyles.over : (stateStyles[state] || stateStyles.default);

  // Buat array slot sebanyak slotCount, isi dengan item yang sudah di-drop atau null
  const slots = Array.from({ length: slotCount }, (_, i) => droppedItems[i] ?? null);

  return (
    <div
      ref={setNodeRef}
      className={`
        relative rounded-3xl border-6 p-4 sm:p-5
        flex flex-col gap-3 items-center justify-start
        transition-all duration-300 shadow-lg hover:shadow-xl
        ${currentStyle} mx-auto w-full
      `}
    >
      {/* Target image */}
      {image && (
        <img
          src={image}
          alt={label}
          className="w-16 h-16 object-contain mx-auto pointer-events-none"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}

      {/* Target label */}
      <div className={`text-sm font-black uppercase tracking-wide px-3 py-1 rounded-xl
        ${state === 'correct' ? 'text-green-700 bg-green-200' : 'text-gray-500 bg-gray-100'}`}>
        <LabelStack label={label} emoteClassName="text-2xl" />
      </div>

      {state === 'correct' && (
        <CheckCircle2 className="absolute top-2 right-2 w-5 h-5 text-green-500" />
      )}

      {/* Slot placeholders */}
      <div className="flex flex-wrap gap-2 justify-center w-full">
        {slots.map((item, i) => (
          item ? (
            // Slot terisi — tampilkan chip item
            <div
              key={item.id}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl text-sm font-bold shadow-sm min-w-[70px] text-center
                ${state === 'correct'
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-400 text-white animate-pulse'}`}
            >
              <LabelStack label={item.label} emoteClassName="text-lg" textClassName="text-xs" />
            </div>
          ) : (
            // Slot kosong — kotak tanda tanya
            <div
              key={`slot-${i}`}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed min-w-[70px] min-h-[60px] px-2 py-2
                ${isOver
                  ? 'border-green-400 bg-green-100/60'
                  : 'border-gray-300 bg-gray-50/60'}`}
            >
              <span className="text-2xl leading-none">❓</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SCORE BAR COMPONENT
   ============================================================ */
function ScorePopup({ visible, kind, score, maxScore, message, onClose }) {
  if (!visible) return null;

  const isGood = kind === 'good';
  const title = isGood ? 'Bagus!' : 'Coba lagi';
  const icon = isGood ? <CheckCircle2 className="w-8 h-8" /> : <RotateCcw className="w-8 h-8" />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={
          `relative w-full max-w-md rounded-3xl border-4 shadow-2xl p-6 animate-[pop_0.2s_ease-out] ` +
          (isGood
            ? 'bg-green-500/90 border-green-200'
            : 'bg-orange-500/90 border-orange-200')
        }
      >
        <div className="flex items-center gap-4">
          <div
            className={
              `flex items-center justify-center rounded-2xl ` +
              (isGood ? 'bg-white/25' : 'bg-white/20')
            }
          >
            {icon}
          </div>
          <div className="text-white">
            <div className="font-black text-2xl leading-tight">{title}</div>
            {message ? <div className="mt-1 font-bold text-sm opacity-95">{message}</div> : null}
          </div>
        </div>

        <div className="mt-5 bg-white/20 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="font-black text-xl">Skor</div>
            <div className="font-black text-xl">
              {score} / {maxScore}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className={
              `btn-playful text-base px-6 py-2.5 rounded-xl ` +
              (isGood
                ? 'bg-white/90 text-green-900 hover:bg-white'
                : 'bg-white/90 text-orange-900 hover:bg-white')
            }
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}


/* ============================================================
   WIN SCREEN
   ============================================================ */
function WinScreen({ score, maxScore, onReset, gameTitle, onClose, gameId }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative animate-[pop_0.4s_ease-out] text-center bg-white/25 backdrop-blur-2xl rounded-3xl border-4 border-yellow-300 shadow-4xl p-10 max-w-lg mx-auto">
        <div className="text-8xl mb-4 animate-[bounce_1s_infinite]">🏆</div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg">LUAR BIASA! 🎉</h2>
        <p className="text-xl text-yellow-200 font-bold mb-2">{gameTitle}</p>
        <p className="text-3xl font-black text-yellow-300 mb-6">Skor: {score} / {maxScore} ⭐</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onReset} className="btn-playful text-lg px-8 py-3">
            <RotateCcw className="w-5 h-5" /> Main Lagi!
          </button>
          <Link
            to="/game"
            className="btn-playful text-lg px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white border-b-purple-700 hover:from-purple-400 hover:to-violet-400"
          >
            <Star className="w-5 h-5" /> Game Lain
          </Link>
        </div>
      </div>
    </div>
  );
}



/* ============================================================
   MAIN GAMEBOARD
   ============================================================ */
function GameBoard() {
  const { gameId } = useParams();
  const game = allGamesData.find(g => g.id === gameId);

  const [droppedItems, setDroppedItems] = useState({});
  const [targetStates, setTargetStates] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [popup, setPopup] = useState({ visible: false, kind: 'good', message: '' });

  const [activeId, setActiveId] = useState(null);
  const [wrongItemIds, setWrongItemIds] = useState(() => new Set());

  // ── Custom smooth auto-scroll ─────────────────────────────────────────────
  // dnd-kit autoScroll tidak bekerja pada window scroll, hanya pada overflow container.
  // Solusi: rAF loop yang jalan terus selama drag, speed diupdate tiap onDragMove.
  // Tidak pakai modifier apapun agar tidak ada konflik posisi → tidak ada glitch.
  const rafRef   = useRef(null);
  const speedRef = useRef({ x: 0, y: 0 });

  const startScrollLoop = useCallback(() => {
    if (rafRef.current) return;
    const tick = () => {
      const { x, y } = speedRef.current;
      if (x !== 0 || y !== 0) window.scrollBy(x, y);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopScrollLoop = useCallback(() => {
    speedRef.current = { x: 0, y: 0 };
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  }, []);

  const handleDragMove = useCallback((event) => {
    const rect = event.active.rect.current.translated;
    if (!rect) return;

    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const ZONE = vh * 0.15; // 15% dari tepi atas/bawah
    const SPEED = 1000;       // px per frame

    let y = 0;
    let x = 0;

    if (rect.top < ZONE)          y = -SPEED * (1 - rect.top / ZONE);
    else if (rect.bottom > vh - ZONE) y =  SPEED * (1 - (vh - rect.bottom) / ZONE);

    if (rect.left < ZONE)         x = -SPEED * (1 - rect.left / ZONE);
    else if (rect.right > vw - ZONE)  x =  SPEED * (1 - (vw - rect.right) / ZONE);

    speedRef.current = { x, y };
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 0, tolerance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 8 },
    })
  );

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 to-pink-500 p-8">
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-12 text-center border-4 border-white/50 max-w-md mx-auto shadow-2xl">
          <div className="text-7xl mb-6">😕</div>
          <h1 className="text-4xl font-black text-white mb-6">Game Tidak Ditemukan</h1>
          <Link to="/" className="btn-playful inline-flex items-center gap-2 py-3 px-8 text-lg">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const droppedItemIds = new Set(
    Object.values(droppedItems).flatMap(items => items.map(i => i.id))
  );

  const totalScoredAnswers = useMemo(() => {
    let total = 0;
    for (const t of game.droppableTargets) {
      const correctList = t.correctItems || (t.correctItem ? [t.correctItem] : []);
      total += correctList.length;
    }
    return total;
  }, [game]);

  const maxScore = 100;

  const getCorrectPlacedCount = (itemsByTarget) => {
    let count = 0;
    for (const [targetId, items] of Object.entries(itemsByTarget)) {
      const targetData = game.droppableTargets.find(t => t.id === targetId);
      const correctList = targetData?.correctItems || (targetData?.correctItem ? [targetData.correctItem] : []);
      count += items.filter(item => correctList.includes(item.matchId || item.id)).length;
    }
    return count;
  };

  const showPopup = useCallback((kind, message) => {
    // Popup hanya untuk kondisi akhir (sesuai request), jadi ini tidak dipakai.
    // Disimpan agar tidak mengganggu struktur kode.
  }, []);


  const updateScoreAndFinish = (itemsByTarget, lockedWrongIds) => {
    const correctCount = getCorrectPlacedCount(itemsByTarget);
    const newScore = totalScoredAnswers > 0 ? Math.round((correctCount / totalScoredAnswers) * maxScore) : 0;
    setScore(Math.min(100, newScore));


    const placedIds = new Set(Object.values(itemsByTarget).flatMap(items => items.map(i => i.id)));
    const answeredCount = new Set([...placedIds, ...lockedWrongIds]).size;

    if (totalScoredAnswers > 0 && answeredCount >= totalScoredAnswers) {
      setIsComplete(true);
      setFeedback(`Game selesai! Skor siswa: ${Math.min(100, newScore)} / ${maxScore}`);
      return true;
    }
    return false;
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    startScrollLoop();
  };

  const handleDragEnd = (event) => {
    stopScrollLoop();
    const { active, over } = event;
    setActiveId(null);


    if (!over || isComplete) return;
    const targetId = over.id;
    const itemId = active.id;

    if (droppedItemIds.has(itemId) || wrongItemIds.has(itemId)) return;

    const targetData = game.droppableTargets.find(t => t.id === targetId);
    if (!targetData) return;

    const draggedItem = game.draggableItems.find(i => i.id === itemId);
    if (!draggedItem) return;

    const matchId = draggedItem.matchId || draggedItem.id;

    // Prevent dropping duplicate item type into the same target
    const alreadyDropped = droppedItems[targetId] || [];
    const isTypeAlreadyDropped = alreadyDropped.some(
      item => (item.matchId || item.id) === matchId
    );
    if (isTypeAlreadyDropped) return;

    const isCorrect =
      targetData.correctItem === matchId ||
      (targetData.correctItems && targetData.correctItems.includes(matchId));

    if (isCorrect) {
      setDroppedItems(prev => {
        const nextDropped = {
          ...prev,
          [targetId]: [...(prev[targetId] || []), draggedItem],
        };
        const isFinished = updateScoreAndFinish(nextDropped, wrongItemIds);
        // Popup hanya muncul setelah game selesai (WinScreen), bukan setiap jawaban.
        if (!isFinished) {
          setFeedback('');
        }

        return nextDropped;
      });
      setTargetStates(prev => ({ ...prev, [targetId]: 'correct' }));

    } else {
      const nextWrongItemIds = new Set(wrongItemIds);
      nextWrongItemIds.add(itemId);
      setWrongItemIds(nextWrongItemIds);
      const isFinished = updateScoreAndFinish(droppedItems, nextWrongItemIds);
      setTargetStates(prev => ({ ...prev, [targetId]: 'incorrect' }));
      if (isFinished) return;
      setFeedback('');
      // Popup tidak ditampilkan saat proses drag-drop.
      setTimeout(() => {
        setTargetStates(prev => ({ ...prev, [targetId]: 'default' }));
      }, 1200);


    }
  };

  const resetGame = () => {
    setDroppedItems({});
    setTargetStates({});
    setScore(0);
    setFeedback('');
    setIsComplete(false);
    setActiveId(null);
    setWrongItemIds(new Set());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Top navigation */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/game"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 border-2 border-white/40 text-white font-bold px-4 py-2.5 rounded-xl transition-all duration-200 hover:-translate-x-0.5"
          >
            <ArrowLeft className="w-5 h-5" /> Kembali ke Game
          </Link>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-white/20 border border-white/30 text-white text-sm font-bold px-3 py-1 rounded-full">
              Kelas {game.grade}
            </span>
            <span className="bg-white/20 border border-white/30 text-white text-sm font-bold px-3 py-1 rounded-full">
              {game.subject}
            </span>
            <span className="bg-white/20 border border-white/30 text-white text-sm font-bold px-3 py-1 rounded-full">
              {game.level}
            </span>
          </div>
        </div>

        {/* Game Title */}
        <div className="text-center mb-6 animate-[slideUp_0.4s_ease-out]">
          <div className="text-6xl mb-3">{game.emoji || '🎮'}</div>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg mb-3">
            {game.title}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto font-semibold leading-relaxed bg-white/10 rounded-xl px-4 py-2 inline-block">
            📋 {game.instructions}
          </p>
        </div>



        {/* DnD Game Board */}
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          autoScroll={false}
        >
          <div className="grid lg:grid-cols-2 gap-8 mb-8 items-stretch">

            {/* ---- DRAGGABLE ITEMS ---- */}
            <section className="animate-[fadeIn_0.5s_ease-out]">
              <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-sm font-black shadow-md">
                  {game.draggableItems.length}
                </span>
                🎒 Pilihan — Seret ke Kotak Target!
              </h2>
              <div className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/40 shadow-xl p-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 auto-rows-fr">
                  {game.draggableItems.map(item => (
                    <DraggableItem
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      image={item.image}
                      isDropped={droppedItemIds.has(item.id)}
                      isLocked={wrongItemIds.has(item.id) || isComplete}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* ---- DROPPABLE TARGETS ---- */}
            <section className="animate-[fadeIn_0.6s_ease-out]">
              <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center text-sm font-black shadow-md">
                  {game.droppableTargets.length}
                </span>
                🏠 Kotak Target — Tempat untuk Menjawab!
              </h2>
              <div className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/40 shadow-xl p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
                  {game.droppableTargets.map(target => (
                    <DroppableTarget
                      key={target.id}
                      id={target.id}
                      label={target.label}
                      image={target.image}
                      state={targetStates[target.id] || 'default'}
                      droppedItems={droppedItems[target.id] || []}
                      slotCount={
                        target.correctItems
                          ? target.correctItems.length
                          : 1
                      }
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>

          <DragOverlay dropAnimation={null}>
            {activeId ? (
              <DragOverlayItem
                label={game.draggableItems.find(i => i.id === activeId)?.label}
                image={game.draggableItems.find(i => i.id === activeId)?.image}
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">

          <button
            onClick={resetGame}
            className="btn-playful inline-flex items-center gap-2 px-8 py-3 text-lg"
          >
            <RotateCcw className="w-5 h-5" /> Main Ulang
          </button>
        </div>

        {/* Win screen (popup) */}
        {isComplete && (
<WinScreen
            score={score}
            maxScore={maxScore}
            onReset={resetGame}
            gameTitle={game.title}
            gameId={gameId}
            onClose={() => setIsComplete(false)}
          />
        )}

        {/* Score feedback popup */}
        <ScorePopup
          visible={popup.visible}
          kind={popup.kind}
          score={score}
          maxScore={maxScore}
          message={popup.message}
          onClose={() => setPopup(p => ({ ...p, visible: false }))}
        />

      </div>
    </div>
  );
}

export default GameBoard;
