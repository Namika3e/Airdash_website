import { LocateFixed, Radio, Wind, Thermometer } from "lucide-react";
export default function Tracking() {
  return (
    <section
      id="tracking"
      className="relative isolate overflow-hidden bg-[#302f20] px-5 py-20 text-white md:px-9"
    >
      <div className="dash-ring absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-white/10">
          <LocateFixed className="text-[#6fc6ef]" />
        </div>
        <h2 className="mt-5 text-4xl font-black leading-none md:text-5xl">
          TRACK YOUR PAYLOAD
        </h2>
        <p className="mt-4 max-w-md text-[11px] leading-relaxed">
          Enter your 12-digit AirDash tracking ID to access real-time telemetry,
          altitude data, and estimated time of arrival.
        </p>
        <form
          className="mt-7 flex w-full max-w-lg rounded-xl border-2 border-black bg-white p-2 shadow-[4px_4px_0_#0b78b8]"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            aria-label="Tracking ID"
            className="min-w-0 flex-1 rounded-md border border-slate-400 px-4 py-3 text-xs font-bold tracking-wider text-black outline-none"
            placeholder="E.G. AD-8472-9184"
          />
          <button className="ml-2 rounded-full border-2 border-black bg-[#0b7eb9] px-5 text-[10px] font-bold">
            LOCATE
          </button>
        </form>
        <div className="mt-7 flex flex-wrap justify-center gap-3 text-[9px]">
          {[
            [Radio, "Live GPS Updates"],
            [Wind, "Velocity Tracking"],
            [Thermometer, "Climate Controlled"],
          ].map(([Icon, label]) => (
            <span
              key={label}
              className="flex items-center gap-1 rounded bg-white/10 px-2 py-1"
            >
              <Icon size={10} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
