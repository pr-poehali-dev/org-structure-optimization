import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { orgData, downloadStructure } from "@/data/orgData";

const CompanyCard = ({ company }: { company: typeof orgData.companies[0] }) => {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  const colorMap: Record<string, { bg: string; border: string; badge: string; text: string; empBg: string }> = {
    itab: {
      bg: "bg-gradient-to-br from-emerald-600 to-teal-800",
      border: "border-emerald-400/40",
      badge: "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30",
      text: "text-emerald-100",
      empBg: "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-400/20",
    },
    inmed: {
      bg: "bg-gradient-to-br from-blue-600 to-blue-800",
      border: "border-blue-400/40",
      badge: "bg-blue-500/20 text-blue-200 border border-blue-400/30",
      text: "text-blue-100",
      empBg: "bg-blue-500/10 hover:bg-blue-500/20 border-blue-400/20",
    },
  };

  const c = colorMap[company.color];

  return (
    <div className={`rounded-2xl ${c.bg} shadow-2xl border ${c.border} overflow-hidden flex-1 min-w-0`}>
      <div className="px-6 py-5 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <Icon name={company.icon} size={22} className="text-white" fallback="Building2" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white font-montserrat tracking-wide">{company.name}</h2>
          <p className={`text-xs font-medium ${c.text}`}>{company.departments.length} {company.departments.length === 1 ? "отдел" : company.departments.length < 5 ? "отдела" : "отделов"}</p>
        </div>
      </div>
      <div className="p-4 grid grid-cols-1 gap-3">
        {company.departments.map((dept) => (
          <div
            key={dept.name}
            className={`rounded-xl border ${c.empBg} border-white/10 overflow-hidden transition-all duration-300`}
          >
            <button
              className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left"
              onClick={() => setExpandedDept(expandedDept === dept.name ? null : dept.name)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                  <Icon name={dept.icon} size={16} className="text-white" fallback="Briefcase" />
                </div>
                <span className="text-sm font-semibold text-white font-golos">{dept.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>
                  {dept.employees.length}
                </span>
                <Icon
                  name={expandedDept === dept.name ? "ChevronUp" : "ChevronDown"}
                  size={14}
                  className="text-white/60"
                  fallback="ChevronDown"
                />
              </div>
            </button>
            {expandedDept === dept.name && (
              <div className="px-4 pb-3 space-y-1.5">
                {dept.employees.map((emp, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Icon name="User" size={12} className="text-white" fallback="User" />
                    </div>
                    <span className="text-xs text-white/90 font-golos">{emp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ServiceCard = ({ service }: { service: typeof orgData.services[0] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl shadow-orange-500/30 overflow-hidden flex-1 min-w-[200px]">
      <button
        className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <Icon name={service.icon} size={22} className="text-white" fallback="Star" />
          </div>
          <div>
            <p className="text-sm font-bold text-white font-montserrat leading-tight">{service.name}</p>
            <p className="text-xs text-white/70 font-golos">{service.description}</p>
          </div>
        </div>
        {service.employees && service.employees.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-white/20 text-white border border-white/30">
              {service.employees.length}
            </span>
            <Icon
              name={expanded ? "ChevronUp" : "ChevronDown"}
              size={14}
              className="text-white/60"
              fallback="ChevronDown"
            />
          </div>
        )}
      </button>
      {expanded && service.employees && service.employees.length > 0 && (
        <div className="px-4 pb-4 space-y-1.5 border-t border-white/20 pt-3">
          {service.employees.map((emp, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Icon name="User" size={12} className="text-white" fallback="User" />
              </div>
              <span className="text-xs text-white/90 font-golos">{emp}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ConnectorLine = () => (
  <div className="flex justify-center">
    <div className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-white/10" />
  </div>
);

const HorizontalConnector = ({ count }: { count: number }) => (
  <div className="flex justify-center items-center relative h-8">
    <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/20 -translate-x-1/2" />
    {count > 1 && (
      <div
        className="absolute top-0 h-0.5 bg-white/20"
        style={{ left: `calc(50% - ${(count - 1) * 50}% / ${count})`, right: `calc(50% - ${(count - 1) * 50}% / ${count})` }}
      />
    )}
  </div>
);

export default function Index() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (!unlocked) {
    return (
      <div
        className="min-h-screen flex items-center justify-center font-golos"
        style={{ background: "linear-gradient(135deg, #0f0c29 0%, #141432 40%, #1a1a4e 70%, #0d1117 100%)" }}
      >
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Icon name="Lock" size={26} className="text-white/60" fallback="Lock" />
          </div>
          <h2 className="text-xl font-black text-white font-montserrat mb-1">Доступ закрыт</h2>
          <p className="text-white/40 text-sm mb-6">Введите пароль для просмотра структуры</p>
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (input === "1310") setUnlocked(true);
                else setError(true);
              }
            }}
            placeholder="Пароль"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-white/40 mb-3"
          />
          {error && <p className="text-red-400 text-xs mb-3">Неверный пароль</p>}
          <button
            onClick={() => { if (input === "1310") setUnlocked(true); else setError(true); }}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3 text-sm font-semibold transition-colors"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen font-golos overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #141432 40%, #1a1a4e 70%, #0d1117 100%)",
      }}
    >
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-emerald-600/5 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 rounded-full bg-purple-600/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium mb-4">
            <Icon name="Building2" size={12} fallback="Building2" />
            Организационная структура холдинга
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white font-montserrat tracking-tight">
            Структура холдинга
          </h1>
          <p className="text-white/40 text-sm mt-2 font-golos">Нажмите на отдел, чтобы увидеть сотрудников</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={downloadStructure}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/70 hover:text-white text-xs font-medium transition-all duration-200"
            >
              <Icon name="Download" size={13} fallback="Download" />
              Скачать структуру
            </button>
            <Link
              to="/mindmap"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/30 text-indigo-100 text-xs font-medium transition-all duration-200"
            >
              <Icon name="Network" size={13} fallback="Share2" />
              Майнд-карта
            </Link>
          </div>
        </div>

        {/* Owner */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 border border-white/20 rounded-2xl px-8 py-4 flex items-center gap-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Icon name="Crown" size={24} className="text-yellow-400" fallback="User" />
            </div>
            <div>
              <p className="text-xl font-black text-white font-montserrat">{orgData.owner.name}</p>
              <p className="text-xs text-white/40 font-medium uppercase tracking-widest">{orgData.owner.title}</p>
            </div>
          </div>
        </div>

        <ConnectorLine />

        {/* CEO */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 border border-indigo-400/30 rounded-2xl px-8 py-4 flex items-center gap-4 shadow-2xl shadow-indigo-900/50">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
              <Icon name="Briefcase" size={22} className="text-white" fallback="User" />
            </div>
            <div>
              <p className="text-xs text-indigo-300 font-medium uppercase tracking-widest">Управление</p>
              <p className="text-xl font-black text-white font-montserrat">{orgData.ceo.name}</p>
            </div>
          </div>
        </div>

        <ConnectorLine />

        {/* Companies */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          {orgData.companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {/* Service centers connector */}
        <div className="mt-10 mb-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Icon name="Layers" size={14} className="text-white/60" fallback="Star" />
              <span className="text-xs text-white/50 font-medium uppercase tracking-widest">Сервисные центры</span>
              <Icon name="Layers" size={14} className="text-white/60" fallback="Star" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Dashed lines showing service centers serve both companies */}
          <div className="flex justify-center mb-4">
            <div className="text-xs text-white/30 font-golos italic flex items-center gap-2">
              <div className="w-6 h-px border-t border-dashed border-white/20" />
              обслуживают обе компании
              <div className="w-6 h-px border-t border-dashed border-white/20" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {orgData.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <div className="w-3 h-3 rounded-sm bg-blue-500" />
            ITAB
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <div className="w-3 h-3 rounded-sm bg-emerald-500" />
            ИНМЕД
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <div className="w-3 h-3 rounded-sm bg-amber-500" />
            Сервисные центры
          </div>
        </div>
      </div>
    </div>
  );
}