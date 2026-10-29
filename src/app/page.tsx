"use client";

import { useState } from "react";

type WorksheetType = "letter" | "number" | "line";
type PaperSize = "A4" | "A5";
type Difficulty = "Easy" | "Medium" | "Hard";
type LinePattern = "Straight" | "Zigzag" | "Wave" | "Curve";

export default function Home() {
  const [worksheetType, setWorksheetType] =
    useState<WorksheetType>("letter");
  const [letter, setLetter] = useState("A");
  const [numberRange, setNumberRange] = useState("1-10");
  const [linePattern, setLinePattern] =
    useState<LinePattern>("Zigzag");
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");
  const [difficulty, setDifficulty] =
    useState<Difficulty>("Easy");
  const [mascot, setMascot] = useState<string | null>(null);
  const [mascotName, setMascotName] = useState("");
  const [mascotSize, setMascotSize] = useState(80);
  const [notice, setNotice] = useState("");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [start, end] = numberRange.split("-").map(Number);
  const numberItems = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  const isA4 = paperSize === "A4";
  const paperWidth = isA4 ? 794 : 559;
  const paperHeight = isA4 ? 1123 : 794;

  // Easy: fewer, larger examples. Hard: more examples per page.
  const settings = {
    Easy: { letterRows: 3, letterCols: 3, font: 112, numberFont: 66, lineRows: 4 },
    Medium: { letterRows: 4, letterCols: 4, font: 82, numberFont: 52, lineRows: 5 },
    Hard: { letterRows: 5, letterCols: 5, font: 62, numberFont: 40, lineRows: 6 },
  }[difficulty];

  function uploadMascot(file?: File) {
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setNotice("Please upload a PNG, JPG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setNotice("Please choose an image smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setMascot(reader.result as string);
      setMascotName(file.name);
      setNotice("");
    };
    reader.readAsDataURL(file);
  }

  const title =
    worksheetType === "letter"
      ? `Let's Trace ${letter}!`
      : worksheetType === "number"
        ? `Let's Trace Numbers ${numberRange}!`
        : "Let's Practice Our Lines!";

  return (
    <main className="min-h-screen bg-[#f7f5ff] text-slate-800">
      <header className="border-b border-violet-100 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
            ✏️
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Worksheet Maker
            </h1>
            <p className="text-sm text-slate-500">
              Little steps, big discoveries.
            </p>
          </div>
          <span className="ml-auto hidden rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 sm:inline">
            EARLY ACCESS · V0.1
          </span>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-[320px_minmax(0,1fr)] md:p-8">
        <aside className="h-fit space-y-6 rounded-3xl border border-violet-100 bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-lg font-bold">Create a worksheet</h2>
            <p className="mt-1 text-sm text-slate-500">
              Make something special for little learners.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold">Worksheet type</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                ["letter", "🔤", "Letters"],
                ["number", "🔢", "Numbers"],
                ["line", "〰️", "Lines"],
              ] as const).map(([value, icon, label]) => (
                <button
                  key={value}
                  onClick={() => setWorksheetType(value)}
                  className={`rounded-xl border p-3 text-center text-xs font-semibold ${
                    worksheetType === value
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="mb-1 block text-xl">{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {worksheetType === "letter" && (
            <div className="space-y-2">
              <label htmlFor="letter" className="block text-sm font-semibold">
                Letter
              </label>
              <select
                id="letter"
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-3"
              >
                {letters.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          )}

          {worksheetType === "number" && (
            <div className="space-y-2">
              <label htmlFor="numberRange" className="block text-sm font-semibold">
                Number range
              </label>
              <select
                id="numberRange"
                value={numberRange}
                onChange={(e) => setNumberRange(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-3"
              >
                <option value="1-5">1–5</option>
                <option value="1-10">1–10</option>
                <option value="1-20">1–20</option>
              </select>
            </div>
          )}

          {worksheetType === "line" && (
            <div className="space-y-2">
              <label htmlFor="pattern" className="block text-sm font-semibold">
                Line pattern
              </label>
              <select
                id="pattern"
                value={linePattern}
                onChange={(e) => setLinePattern(e.target.value as LinePattern)}
                className="w-full rounded-xl border border-slate-200 bg-white p-3"
              >
                <option>Straight</option>
                <option>Zigzag</option>
                <option>Wave</option>
                <option>Curve</option>
              </select>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold">Difficulty</label>
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
              {(["Easy", "Medium", "Hard"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setDifficulty(item)}
                  className={`rounded-lg px-2 py-2 text-xs font-semibold ${
                    difficulty === item
                      ? "bg-white text-violet-700 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              Easy = bigger tracing guides; Hard = more practice per page.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold">Paper size</label>
            <div className="grid grid-cols-2 gap-2">
              {(["A4", "A5"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setPaperSize(item)}
                  className={`rounded-xl border p-3 text-sm font-semibold ${
                    paperSize === item
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-slate-200"
                  }`}
                >
                  {item} · {item === "A4" ? "Full page" : "Half page"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-5">
            <div>
              <h3 className="font-semibold">🐰 Personalize your page</h3>
              <p className="mt-1 text-xs text-slate-500">
                Add a favorite character. Your image stays in this browser.
              </p>
            </div>

            {!mascot ? (
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-violet-200 p-4 text-sm font-semibold text-violet-700 hover:bg-violet-50">
                <span>＋ Upload mascot</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => uploadMascot(e.target.files?.[0])}
                />
              </label>
            ) : (
              <div className="space-y-3 rounded-xl bg-violet-50 p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={mascot}
                    alt="Uploaded mascot"
                    className="h-12 w-12 object-contain"
                  />
                  <p className="min-w-0 flex-1 truncate text-xs">{mascotName}</p>
                  <button
                    onClick={() => {
                      setMascot(null);
                      setMascotName("");
                    }}
                    className="text-sm font-semibold text-red-600"
                  >
                    Remove
                  </button>
                </div>
                <label className="block text-xs font-semibold">
                  Mascot size: {mascotSize}px
                  <input
                    type="range"
                    min="40"
                    max="140"
                    value={mascotSize}
                    onChange={(e) => setMascotSize(Number(e.target.value))}
                    className="mt-2 w-full"
                  />
                </label>
              </div>
            )}

            {notice && <p role="alert" className="text-xs text-red-600">{notice}</p>}
          </div>

          <button
            onClick={() => window.print()}
            className="w-full rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-violet-700"
          >
            ↓ Download / Print PDF
          </button>
          <p className="text-center text-xs text-slate-400">
            Your settings update the preview instantly.
          </p>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold">Live preview</h2>
              <p className="text-sm text-slate-500">
                {paperSize} · Portrait · {difficulty}
              </p>
            </div>
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm">
              Preview updates automatically
            </span>
          </div>

          <div className="overflow-auto rounded-2xl bg-violet-100/70 p-3 sm:p-6">
            <article
              id="worksheet"
              className={`worksheet-page ${isA4 ? "paper-a4" : "paper-a5"} relative mx-auto flex flex-col overflow-hidden bg-white p-6 shadow-lg sm:p-10`}
              style={{
                width: `min(100%, ${paperWidth}px)`,
                height: paperHeight,
                aspectRatio: isA4 ? "210 / 297" : "148 / 210",
                boxSizing: "border-box",
              }}
            >
              <div className="mb-4 border-b-2 border-dashed border-violet-200 pb-4 text-center">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-violet-500">
                  My little learning book
                </p>
                <h1 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
                  {title}
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Name: ____________________
                </p>
              </div>

              <div className="flex min-h-0 flex-1 flex-col justify-evenly gap-2">
                {worksheetType === "letter" &&
                  Array.from({ length: settings.letterRows }, (_, row) => (
                    <div
                      key={row}
                      className="flex flex-1 items-center justify-evenly gap-2 border-b border-dashed border-slate-200"
                    >
                      {Array.from({ length: settings.letterCols }, (_, col) => (
                        <span
                          key={col}
                          className="font-bold leading-none"
                          style={{
                            fontSize: `${settings.font}px`,
                            color: row === 0 && col === 0 ? "#334155" : "#cbd5e1",
                            WebkitTextStroke:
                              row === 0 && col === 0 ? undefined : "0.7px #94a3b8",
                          }}
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                  ))}

                {worksheetType === "number" &&
                  numberItems.map((n, index) => (
                    <div
                      key={n}
                      className="flex min-h-0 flex-1 items-center gap-2 border-b border-dashed border-slate-200"
                    >
                      <span className="w-7 shrink-0 text-xs text-slate-400">
                        {n}.
                      </span>
                      <div className="flex flex-1 justify-evenly gap-2">
                        {Array.from(
                          { length: difficulty === "Easy" ? 2 : difficulty === "Medium" ? 3 : 4 },
                          (_, i) => (
                            <span
                              key={i}
                              className="font-bold leading-none"
                              style={{
                                fontSize: `${settings.numberFont}px`,
                                color: i === 0 ? "#334155" : "#cbd5e1",
                              }}
                            >
                              {n}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  ))}

                {worksheetType === "line" &&
                  Array.from({ length: settings.lineRows }, (_, row) => (
                    <div
                      key={row}
                      className="flex flex-1 items-center border-b border-dashed border-slate-200"
                    >
                      <svg
                        viewBox="0 0 500 55"
                        className="w-full"
                        aria-label={`${linePattern} tracing line`}
                      >
                        <path
                          d={
                            linePattern === "Straight" ? "M 10 28 L 490 28" :
                            linePattern === "Zigzag" ? "M 10 40 L 70 10 L 130 40 L 190 10 L 250 40 L 310 10 L 370 40 L 430 10 L 490 40" :
                            linePattern === "Wave" ? "M 10 28 Q 40 0 70 28 T 130 28 T 190 28 T 250 28 T 310 28 T 370 28 T 430 28 T 490 28" :
                            "M 10 45 C 80 -10 120 -10 190 28 S 300 75 370 28 S 440 0 490 25"
                          }
                          fill="none"
                          stroke={row === 0 ? "#64748b" : "#cbd5e1"}
                          strokeWidth={difficulty === "Easy" ? 4 : 2.5}
                          strokeDasharray={row === 0 ? "none" : "5 7"}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  ))}
              </div>

              <div className="mt-3 border-t-2 border-dashed border-violet-200 pt-3 text-center">
                <p className="text-sm font-semibold text-violet-600">
                  ⭐ Great job! Keep practicing!
                </p>
              </div>

              {mascot && (
                <img
                  src={mascot}
                  alt="Your worksheet mascot"
                  className="mascot-image absolute bottom-4 right-4 object-contain"
                  style={{ width: mascotSize, height: mascotSize }}
                />
              )}
            </article>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">
            Tip: Upload a transparent PNG for the cleanest mascot result.
          </p>
        </section>
      </div>
    </main>
  );
}