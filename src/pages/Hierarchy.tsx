import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { orgData } from "@/data/orgData";

type View = "tree" | "map" | "list";

const colors: Record<string, { from: string; ring: string; text: string; line: string; soft: string }> = {
  itab: { from: "from-emerald-500 to-teal-700", ring: "ring-emerald-400/40", text: "text-emerald-300", line: "bg-emerald-400/40", soft: "bg-emerald-500/10 border-emerald-400/30" },
  inmed: { from: "from-blue-500 to-blue-700", ring: "ring-blue-400/40", text: "text-blue-300", line: "bg-blue-400/40", soft: "bg-blue-500/10 border-blue-400/30" },
  analytics: { from: "from-amber-500 to-orange-600", ring: "ring-amber-400/40", text: "text-amber-300", line: "bg-amber-400/40", soft: "bg-amber-500/10 border-amber-400/30" },
  marketing: { from: "from-pink-500 to-rose-600", ring: "ring-pink-400/40", text: "text-pink-300", line: "bg-pink-400/40", soft: "bg-pink-500/10 border-pink-400/30" },
  fulfillment: { from: "from-violet-500 to-purple-700", ring: "ring-violet-400/40", text: "text-violet-300", line: "bg-violet-400/40", soft: "bg-violet-500/10 border-violet-400/30" },
};

interface Unit {
  id: string;
  name: string;
  color: string;
  icon: string;
  kind: "company" | "service";
  departments: { name: string; icon: string; employees: string[] }[];
}

const buildUnits = (): Unit[] => {
  const companies: Unit[] = orgData.companies.map((c) => ({
    id: c.id,
    name: c.name,
    color: c.color,
    icon: c.icon,
    kind: "company",
    departments: c.departments.map((d) => ({ name: d.name, icon: d.icon, employees: d.employees.filter(Boolean) })),
  }));
  const services: Unit[] = orgData.services.map((s) => ({
    id: s.id,
    name: s.name,
    color: s.color,
    icon: s.icon,
    kind: "service",
    departments: [{ name: s.description, icon: "Users", employees: (s.employees || []).filter(Boolean) }],
  }));
  return [...companies, ...services];
};

const splitName = (emp: string) => {
  const [name, role] = emp.split(" — ");
  return { name: name?.trim() || emp, role: role?.trim() || "" };
};

const units = buildUnits();
const companyUnits = units.filter((u) => u.kind === "company");
const serviceUnits = units.filter((u) => u.kind === "service");

const SectionHeader = ({ kind, count }: { kind: "company" | "service"; count: number }) => {
  const isCo = kind === "company";
  return (
    <div className="flex items-center gap-3 my-2">
      <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${isCo ? "to-cyan-400/40" : "to-orange-400/40"}`} />
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${isCo ? "bg-cyan-500/10 border-cyan-400/30" : "bg-orange-500/10 border-orange-400/30"}`}>
        <Icon name={isCo ? "Building2" : "Wrench"} size={14} className={isCo ? "text-cyan-300" : "text-orange-300"} fallback="Star" />
        <span className={`text-xs font-bold uppercase tracking-widest ${isCo ? "text-cyan-200" : "text-orange-200"}`}>
          {isCo ? "Организации" : "Сервисные центры"} · {count}
        </span>
      </div>
      <div className={`h-px flex-1 bg-gradient-to-l from-transparent ${isCo ? "to-cyan-400/40" : "to-orange-400/40"}`} />
    </div>
  );
};

/* ---------- 1. ДЕРЕВО ---------- */
const PersonCard = ({ emp, color, boss }: { emp: string; color: string; boss?: boolean }) => {
  const c = colors[color] || colors.itab;
  const { name, role } = splitName(emp);
  return (
    <div className={`rounded-xl px-3 py-2 text-center min-w-[150px] max-w-[200px] ${boss ? `bg-gradient-to-br ${c.from} ring-1 ${c.ring} shadow-lg` : `border ${c.soft}`}`}>
      <p className={`text-xs font-bold leading-tight ${boss ? "text-white" : "text-white/90"}`}>{name}</p>
      {role && <p className={`text-[10px] leading-tight mt-0.5 ${boss ? "text-white/70" : "text-white/50"}`}>{role}</p>}
    </div>
  );
};

const TreeDept = ({ dept, color }: { dept: Unit["departments"][0]; color: string }) => {
  const c = colors[color] || colors.itab;
  const [boss, ...subs] = dept.employees;
  if (!boss) return null;
  return (
    <div className="flex flex-col items-center">
      <PersonCard emp={boss} color={color} boss />
      {subs.length > 0 && (
        <>
          <div className={`w-0.5 h-5 ${c.line}`} />
          <div className="relative flex justify-center gap-4 flex-wrap pt-5">
            {subs.length > 1 && <div className={`absolute top-0 left-[10%] right-[10%] h-0.5 ${c.line}`} />}
            {subs.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-0.5 h-5 -mt-5 ${c.line}`} />
                <PersonCard emp={s} color={color} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const TreeUnit = ({ u }: { u: Unit }) => {
  const c = colors[u.color] || colors.itab;
  const [head, ...rest] = u.departments;
  const headBoss = head?.employees[0];
  const isService = u.kind === "service";
  return (
    <div className={`overflow-x-auto ${isService ? `rounded-2xl border ${c.soft} py-6` : ""}`}>
      <div className="flex flex-col items-center min-w-max mx-auto px-4">
        {/* Компания / Сервис */}
        <div className={`bg-gradient-to-br ${c.from} rounded-2xl px-6 py-3 shadow-xl ring-1 ${c.ring} flex items-center gap-3`}>
          <Icon name={u.icon} size={22} className="text-white" fallback="Building2" />
          <span className="text-white font-black font-montserrat text-lg">{u.name}</span>
        </div>

        {/* Глава (ген.дир / руководство) — выше всех */}
        {headBoss && (
          <>
            <div className={`w-0.5 h-6 ${c.line}`} />
            <div className={`mb-2 px-3 py-1 rounded-full border ${c.soft} flex items-center gap-1.5`}>
              <Icon name={head.icon} size={12} className={c.text} fallback="Crown" />
              <span className={`text-[11px] font-semibold ${c.text}`}>{head.name}</span>
            </div>
            <PersonCard emp={headBoss} color={u.color} boss />
            {head.employees.slice(1).length > 0 && (
              <div className="flex gap-3 flex-wrap justify-center mt-2">
                {head.employees.slice(1).map((e, i) => (
                  <PersonCard key={i} emp={e} color={u.color} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Остальные отделы — уровнем ниже главы */}
        {rest.length > 0 && (
          <>
            <div className={`w-0.5 h-6 ${c.line}`} />
            <div className="flex items-start gap-8 flex-wrap justify-center pt-6 relative">
              <div className={`absolute top-0 left-[8%] right-[8%] h-0.5 ${c.line}`} />
              {rest.map((d, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-0.5 h-6 -mt-6 ${c.line}`} />
                  <div className={`mb-3 px-3 py-1 rounded-full border ${c.soft} flex items-center gap-1.5`}>
                    <Icon name={d.icon} size={12} className={c.text} fallback="Dot" />
                    <span className={`text-[11px] font-semibold ${c.text}`}>{d.name}</span>
                  </div>
                  <TreeDept dept={d} color={u.color} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const TreeView = () => (
  <div className="space-y-10">
    <SectionHeader kind="company" count={companyUnits.length} />
    {companyUnits.map((u) => (
      <TreeUnit key={u.id} u={u} />
    ))}
    <SectionHeader kind="service" count={serviceUnits.length} />
    <div className="grid gap-6 md:grid-cols-3">
      {serviceUnits.map((u) => (
        <TreeUnit key={u.id} u={u} />
      ))}
    </div>
  </div>
);

/* ---------- 2. КАРТА СО СВЯЗЯМИ ---------- */
const MapUnit = ({ u }: { u: Unit }) => {
  const c = colors[u.color] || colors.itab;
  return (
    <div className={`rounded-2xl border ${c.soft} p-5`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.from} flex items-center justify-center`}>
              <Icon name={u.icon} size={20} className="text-white" fallback="Building2" />
            </div>
            <span className="text-white font-black font-montserrat text-lg">{u.name}</span>
          </div>
          <div className="space-y-4">
            {u.departments.map((d, i) => {
              const [boss, ...subs] = d.employees;
              if (!boss) return null;
              return (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon name={d.icon} size={13} className={c.text} fallback="Dot" />
                    <span className={`text-[11px] font-semibold uppercase tracking-wide ${c.text}`}>{d.name}</span>
                  </div>
                  <div className={`rounded-lg bg-gradient-to-br ${c.from} px-3 py-1.5`}>
                    <p className="text-white text-xs font-bold">{splitName(boss).name}</p>
                    <p className="text-white/70 text-[10px]">{splitName(boss).role}</p>
                  </div>
                  {subs.map((s, j) => (
                    <div key={j} className="flex items-stretch gap-2 mt-1.5 ml-3">
                      <div className="flex flex-col items-center pt-1">
                        <div className={`w-2 h-2 rounded-full ${c.line}`} />
                        {j < subs.length - 1 && <div className={`w-0.5 flex-1 ${c.line}`} />}
                      </div>
                      <div className={`flex-1 rounded-lg border ${c.soft} px-3 py-1.5`}>
                        <p className="text-white/90 text-xs font-medium">{splitName(s).name}</p>
                        <p className="text-white/40 text-[10px]">{splitName(s).role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
    </div>
  );
};

const MapView = () => (
  <div className="space-y-4">
    <SectionHeader kind="company" count={companyUnits.length} />
    <div className="grid md:grid-cols-2 gap-6">
      {companyUnits.map((u) => (
        <MapUnit key={u.id} u={u} />
      ))}
    </div>
    <div className="pt-4">
      <SectionHeader kind="service" count={serviceUnits.length} />
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {serviceUnits.map((u) => (
        <MapUnit key={u.id} u={u} />
      ))}
    </div>
  </div>
);

/* ---------- 3. СПИСОК С ОТСТУПАМИ ---------- */
const ListUnit = ({ u }: { u: Unit }) => {
  const c = colors[u.color] || colors.itab;
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon name={u.icon} size={18} className={c.text} fallback="Building2" />
        <span className="text-white font-black font-montserrat text-lg">{u.name}</span>
      </div>
      <div className={`border-l-2 ${c.line} pl-4 space-y-4`}>
        {u.departments.map((d, i) => {
          const [boss, ...subs] = d.employees;
          if (!boss) return null;
          return (
            <div key={i}>
              <div className="flex items-center gap-1.5 mb-1">
                <Icon name={d.icon} size={12} className={c.text} fallback="Dot" />
                <span className={`text-[11px] font-semibold uppercase tracking-wide ${c.text}`}>{d.name}</span>
              </div>
              <p className="text-white text-sm font-bold">{boss}</p>
              <ul className="mt-1 ml-4 space-y-1 border-l border-white/15 pl-3">
                {subs.map((s, j) => (
                  <li key={j} className="text-white/60 text-xs leading-snug relative before:content-['–'] before:absolute before:-left-3 before:text-white/30">{s}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ListView = () => (
  <div className="max-w-2xl mx-auto space-y-8">
    <SectionHeader kind="company" count={companyUnits.length} />
    {companyUnits.map((u) => (
      <ListUnit key={u.id} u={u} />
    ))}
    <SectionHeader kind="service" count={serviceUnits.length} />
    {serviceUnits.map((u) => (
      <ListUnit key={u.id} u={u} />
    ))}
  </div>
);

const tabs: { id: View; label: string; icon: string }[] = [
  { id: "tree", label: "Дерево", icon: "GitBranch" },
  { id: "map", label: "Карта связей", icon: "Network" },
  { id: "list", label: "Список", icon: "List" },
];

export default function Hierarchy() {
  const [view, setView] = useState<View>("tree");
  return (
    <div
      className="min-h-screen font-golos"
      style={{ background: "linear-gradient(135deg, #0f0c29 0%, #141432 40%, #1a1a4e 70%, #0d1117 100%)" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white font-montserrat tracking-tight">Система подчинения</h1>
          <p className="text-white/40 text-sm mt-2">Верхний в блоке — руководитель, ниже — подчинённые</p>
          <div className="no-print mt-4 flex flex-wrap items-center justify-center gap-2">
            <Link to="/mindmap" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/70 hover:text-white text-xs font-medium transition-all">
              <Icon name="Share2" size={13} fallback="ArrowLeft" />
              Майнд-карта
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/70 hover:text-white text-xs font-medium transition-all">
              <Icon name="LayoutGrid" size={13} fallback="ArrowLeft" />
              Классический вид
            </Link>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/40 hover:bg-indigo-600/60 border border-indigo-400/40 text-indigo-50 text-xs font-medium transition-all"
            >
              <Icon name="FileDown" size={13} fallback="Download" />
              Скачать PDF
            </button>
          </div>
        </div>

        <div className="no-print flex justify-center gap-2 mb-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view === t.id ? "bg-white text-slate-900" : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"}`}
            >
              <Icon name={t.icon} size={15} fallback="Square" />
              {t.label}
            </button>
          ))}
        </div>

        {view === "tree" && <TreeView />}
        {view === "map" && <MapView />}
        {view === "list" && <ListView />}
      </div>
    </div>
  );
}