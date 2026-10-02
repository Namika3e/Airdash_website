import { ArrowRight, Check, MapPin } from "lucide-react";
const steps = [
  [
    "1",
    "SELECT HUB",
    "Choose your origin and destination from our active nodes in Lagos, Abuja, or Port Harcourt.",
  ],
  [
    "2",
    "CHOOSE FLEET",
    "Select the Dart V-2 for speed or the Goliath X-1 for heavier cargo payloads.",
  ],
  [
    "3",
    "LAUNCH & TRACK",
    "Confirm the dash and monitor your payload’s trajectory in real-time until touchdown.",
  ],
];
function MapPanel() {
  return (
    <div className="map-grid relative min-h-[330px] overflow-hidden rounded-r-xl bg-[#eaf4f4] p-6 text-[#1d3e57]">
      <svg
        className="absolute inset-7 h-[75%] w-[85%] opacity-80"
        viewBox="0 0 500 270"
      >
        <path
          d="M34 135 L93 92 L154 105 L204 54 L266 75 L318 32 L425 78 L466 145 L426 188 L341 202 L282 242 L204 212 L129 242 L68 200 Z"
          fill="#a9dfe9"
          stroke="#33819f"
          strokeWidth="2"
        />
        <path
          d="M73 172 Q150 140 211 159 T329 128 T429 147"
          fill="none"
          stroke="#4f99b3"
          strokeDasharray="8 7"
          strokeWidth="3"
        />
      </svg>
      <span className="absolute left-[14%] top-[55%] h-4 w-4 rounded-full bg-orange-400 ring-4 ring-orange-200" />
      <span className="absolute left-[49%] top-[45%] h-4 w-4 rounded-full bg-orange-400 ring-4 ring-orange-200" />
      <span className="absolute right-[14%] top-[60%] h-4 w-4 rounded-full bg-orange-400 ring-4 ring-orange-200" />
      <strong className="absolute left-[9%] top-[66%] text-sm">Lagos</strong>
      <strong className="absolute left-[46%] top-[34%] text-sm">Abuja</strong>
      <strong className="absolute right-[8%] top-[72%] text-sm">
        Port Harcourt
      </strong>
      <div className="absolute inset-x-5 bottom-4 flex flex-col gap-2 sm:inset-x-auto sm:left-5 sm:w-56">
        <div className="flex items-center justify-between rounded-md border border-black bg-white p-2 text-[10px] shadow-[2px_2px_0_#111]">
          <span className="flex gap-2">
            <MapPin size={13} /> Lagos
          </span>
          <b className="rounded bg-[#8d6300] px-1 text-[7px] text-white">
            ACTIVE
          </b>
        </div>
        <div className="flex items-center justify-between rounded-md border border-black bg-white p-2 text-[10px] shadow-[2px_2px_0_#111]">
          <span className="flex gap-2">
            <MapPin size={13} /> Abuja
          </span>
          <b className="rounded bg-slate-400 px-1 text-[7px] text-white">
            IDLE
          </b>
        </div>
      </div>
    </div>
  );
}
export default function MissionBriefing() {
  return (
    <section id="mission" className="px-5 py-16 md:px-9">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-black text-[#006b61] md:text-5xl">
          MISSION BRIEFING
        </h2>
        <p className="mt-3 text-center text-[11px]">
          How to schedule a Dash and leverage our Tri-City logistics network.
        </p>
        <div className="outline-card mt-7 grid overflow-hidden rounded-xl md:grid-cols-[.82fr_1.65fr]">
          <div className="bg-[#006f66] p-6 text-white">
            <h3 className="text-lg font-bold">Execute a Dash in 3 Steps</h3>
            <ol className="mt-5 space-y-4">
              {steps.map(([number, title, copy]) => (
                <li key={number} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white text-[9px]">
                    {number}
                  </span>
                  <div>
                    <p className="text-[9px] font-bold tracking-widest">
                      {title}
                    </p>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#d7f2ed]">
                      {copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href="#tracking"
              className="mt-6 inline-block rounded-full border border-black bg-[#b87900] px-4 py-3 text-[9px] font-bold shadow-[2px_2px_0_#111]"
            >
              SCHEDULE A DASH NOW{" "}
              <ArrowRight className="ml-2 inline" size={13} />
            </a>
          </div>
          <MapPanel />
        </div>
      </div>
    </section>
  );
}
