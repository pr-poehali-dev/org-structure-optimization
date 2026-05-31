import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { orgData, downloadStructure } from "@/data/orgData";

const branchColors: Record<string, { node: string; ring: string; line: string; chip: string }> = {
  itab: {
    node: "from-emerald-500 to-teal-700",
    ring: "ring-emerald-400/40",
    line: "bg-emerald-400/40",
    chip: "bg-emerald-500/15 border-emerald-400/30 text-emerald-100",
  },
  inmed: {
    node: "from-blue-500 to-blue-700",
    ring: "ring-blue-400/40",
    line: "bg-blue-400/40",
    chip: "bg-blue-500/15 border-blue-400/30 text-blue-100",
  },
  analytics: {
    node: "from-amber-500 to-orange-600",
    ring: "ring-amber-400/40",
    line: "bg-amber-400/40",
    chip: "bg-amber-500/15 border-amber-400/30 text-amber-100",
  },
  marketing: {
    node: "from-pink-500 to-rose-600",
    ring: "ring-pink-400/40",
    line: "bg-pink-400/40",
    chip: "bg-pink-500/15 border-pink-400/30 text-pink-100",
  },
  fulfillment: {
    node: "from-violet-500 to-purple-700",
    ring: "ring-violet-400/40",
    line: "bg-violet-400/40",
    chip: "bg-violet-500/15 border-violet-400/30 text-violet-100",
  },
};

interface BranchNode {
  id: string;
  name: string;
  icon: string;
  color: string;
  subtitle?: string;
  children: { name: string; icon: string; people: string[] }[];
}

const Branch = ({ node, side }: { node: BranchNode; side: "left" | "right" }) => {
  const [open, setOpen] = useState<string | null>(null);
  const c = branchColors[node.color] || branchColors.itab;
  const isLeft = side === "left";

  return (
    <div className={`flex items-start gap-4 ${isLeft ? "flex-row-reverse text-right" : "flex-row"}`}>
      {/* Main branch node */}
      <button
        onClick={() => setOpen(open === node.id ? null : node.id)}
        className={`shrink-0 bg-gradient-to-br ${c.node} rounded-2xl px-5 py-4 shadow-xl ring-1 ${c.ring} flex items-center gap-3 transition-transform hover:scale-105`}
      >
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Icon name={node.icon} size={22} className="text-white" fallback="Building2" />
        </div>
        <div className={isLeft ? "text-right" : "text-left"}>
          <p className="text-white font-black font-montserrat leading-tight">{node.name}</p>
          {node.subtitle && <p className="text-white/70 text-xs">{node.subtitle}</p>}
          <p className="text-white/60 text-[11px] mt-0.5">{node.children.length} {node.children.length === 1 ? "блок" : "блоков"}</p>
        </div>
        <Icon name={open === node.id ? "ChevronUp" : "ChevronDown"} size={16} className="text-white/70 shrink-0" fallback="ChevronDown" />
      </button>

      {/* Sub-branches */}
      {open === node.id && (
        <div className={`flex flex-col gap-2 pt-1 ${isLeft ? "items-end" : "items-start"}`}>
          {node.children.map((child) => (
            <div key={child.name} className={`rounded-xl border ${c.chip} px-3 py-2 max-w-xs`}>
              <div className={`flex items-center gap-2 ${isLeft ? "flex-row-reverse" : ""}`}>
                <Icon name={child.icon} size={14} fallback="Dot" />
                <span className="text-xs font-semibold">{child.name}</span>
              </div>
              {child.people.filter(Boolean).length > 0 && (
                <ul className={`mt-1 space-y-0.5 ${isLeft ? "text-right" : "text-left"}`}>
                  {child.people.filter(Boolean).map((p, i) => (
                    <li key={i} className="text-[11px] text-white/70 leading-snug">{p}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function MindMap() {
  const companyNodes: BranchNode[] = orgData.companies.map((co) => ({
    id: co.id,
    name: co.name,
    icon: co.icon,
    color: co.color,
    children: co.departments.map((d) => ({ name: d.name, icon: d.icon, people: d.employees })),
  }));

  const serviceNodes: BranchNode[] = orgData.services.map((s) => ({
    id: s.id,
    name: s.name,
    icon: s.icon,
    color: s.color,
    subtitle: s.description,
    children: [{ name: "Сотрудники", icon: "Users", people: s.employees }],
  }));

  const leftNodes = [companyNodes[0], serviceNodes[0], serviceNodes[1]].filter(Boolean);
  const rightNodes = [companyNodes[1], serviceNodes[2]].filter(Boolean);

  return (
    <div
      className="min-h-screen font-golos overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #0f0c29 0%, #141432 40%, #1a1a4e 70%, #0d1117 100%)" }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-pink-600/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white font-montserrat tracking-tight">
            Майнд-карта холдинга
          </h1>
          <p className="text-white/40 text-sm mt-2">Нажмите на ветку, чтобы раскрыть отделы</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/70 hover:text-white text-xs font-medium transition-all"
            >
              <Icon name="LayoutGrid" size={13} fallback="ArrowLeft" />
              Классический вид
            </Link>
            <button
              onClick={downloadStructure}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/70 hover:text-white text-xs font-medium transition-all"
            >
              <Icon name="Download" size={13} fallback="Download" />
              Скачать структуру
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-2">
          {/* Left branches */}
          <div className="flex-1 flex flex-col gap-6 w-full lg:items-end">
            {leftNodes.map((n) => (
              <Branch key={n.id} node={n} side="left" />
            ))}
          </div>

          {/* Connector + Center */}
          <div className="flex flex-col items-center shrink-0 py-4">
            <div className="hidden lg:block w-16 h-0.5 bg-white/20 absolute" />
            <div className="relative bg-gradient-to-br from-indigo-600 to-slate-900 rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-2xl ring-2 ring-white/20 z-10">
              <Icon name="Crown" size={32} className="text-yellow-400 mb-1" fallback="Star" />
              <p className="text-white font-black font-montserrat text-lg">{orgData.owner.name}</p>
              <p className="text-white/60 text-[11px] uppercase tracking-wider">{orgData.ceo.name}</p>
            </div>
          </div>

          {/* Right branches */}
          <div className="flex-1 flex flex-col gap-6 w-full lg:items-start">
            {rightNodes.map((n) => (
              <Branch key={n.id} node={n} side="right" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}