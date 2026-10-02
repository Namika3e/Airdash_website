import { ArrowRight, BatteryCharging, ShieldCheck, Zap } from "lucide-react";

function StatCard({ type, children, className = "" }) {
  return (
    <div className={`outline-card rounded-xl p-6 ${className}`}>
      {type && (
        <div className="mb-3 flex items-center gap-2 text-[9px] font-bold tracking-[.13em]">
          <span>
            {type === "secure" ? <ShieldCheck size={14} /> : <Zap size={14} />}
          </span>
          {type === "secure" ? "PAYLOAD SECURE" : "NEXT-GEN POWER"}
        </div>
      )}
      {children}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-7xl gap-5 px-5 py-16 md:grid-cols-[2fr_1fr] md:px-9 md:py-28"
    >
      <div className="outline-card flex min-h-[330px] flex-col justify-end rounded-xl bg-[#064c7b] p-6 text-white md:min-h-[390px] md:p-8">
        <span className="mb-4 w-fit rounded-full bg-[#009c88] px-3 py-1 text-[8px] font-black tracking-widest">
          LAGOS SPEED DELIVERY
        </span>
        <h1 className="max-w-lg text-4xl font-black leading-[.95] tracking-tight md:text-6xl">
          THE SKY IS OURS
          <br />
          NOW.
        </h1>
        <p className="mt-4 max-w-md text-xs leading-relaxed">
          High-velocity drone logistics connecting Lagos, Abuja, and Port
          Harcourt. We cut through the traffic so your business never stops.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#mission"
            className="rounded-full border border-black bg-[#1889c4] px-5 py-2 text-[10px] font-bold shadow-[2px_2px_0_#111]"
          >
            Launch a Drone <ArrowRight className="ml-1 inline" size={11} />
          </a>
          <a
            href="#tracking"
            className="rounded-full bg-white px-5 py-2 text-[10px] font-bold text-black shadow-[2px_2px_0_#111]"
          >
            Track Shipment <span className="ml-2">⌕</span>
          </a>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
        <StatCard type="secure" className="bg-[#ffb541]">
          <p className="text-3xl font-black">99.9%</p>
          <p className="mt-1 text-[9px]">Uptime</p>
        </StatCard>
        <StatCard type="power" className="bg-white">
          <p className="max-w-[210px] text-[11px] leading-relaxed text-[#414141]">
            Hot-swappable solid-state batteries ensure our fleet never grounds
            for more than 45 seconds between missions.
          </p>
          <BatteryCharging className="mt-4 text-[#00528b]" size={25} />
        </StatCard>
      </div>
    </section>
  );
}
