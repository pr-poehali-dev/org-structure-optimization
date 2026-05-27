import { useState } from "react";
import Icon from "@/components/ui/icon";

const orgData = {
  owner: {
    name: "Собственник",
    title: "Владелец холдинга",
  },
  ceo: {
    name: "Управляющий директор",
    title: "Холдинг",
  },
  companies: [
    {
      id: "itab",
      name: "ITAB",
      color: "itab",
      icon: "Monitor",
      departments: [
        {
          name: "Генеральный директор",
          icon: "Crown",
          employees: ["Джессика Савельева — Генеральный директор / управляющий партнёр", "Платонова Елизавета — Бизнес-ассистент", "Мария Павлова — HR Business Partner"],
        },
        {
          name: "Финансы",
          icon: "DollarSign",
          employees: ["Хачатурян Лорина — Финансовый директор"],
        },
        {
          name: "Операционный отдел",
          icon: "Settings",
          employees: [
            "Фролова Олеся — Операционный директор",
            "Лебедева Ирина — Операционный менеджер",
            "Бухгалтерия — аутсорс",
          ],
        },
        {
          name: "Товарный отдел",
          icon: "Package",
          employees: [
            "Светлана Макаренко — Категорийный менеджер",
            "Александра Нагорная — Менеджер отдела по работе с поставщиками",
            "Мария Паулкина — Менеджер ЭМК",
            "Елизарова Юля — Менеджер по закупкам",
          ],
        },
        {
          name: "Продукт",
          icon: "Layers",
          employees: [
            "Айнур Минибаев — Директор по продукту",
            "Афанасьева Ольга — Проджект менеджер",
            "Максим Лоськов — Разработчик",
            "Олег Романов — Разработчик",
          ],
        },
        {
          name: "Технический отдел",
          icon: "Code",
          employees: [
            "Лоськов Максим — Технический директор платформы iTAB",
            "Олег Романов — Разработчик",
          ],
        },
      ],
    },
    {
      id: "inmed",
      name: "ИНМЕД",
      color: "inmed",
      icon: "Heart",
      departments: [
        {
          name: "Руководство",
          icon: "Crown",
          employees: [
            "Джессика Савельева — Управляющий партнёр",
            "Анна Государева — Исполнительный директор",
            "Елизавета Платонова — Бизнес-ассистент",
            "Мария Глинская — Менеджер по производству и исследованиям",
          ],
        },
        {
          name: "Отдел digital-продаж",
          icon: "TrendingUp",
          employees: [
            "Антон Преловский — РОДП",
            "Виолетта Дерепко — Менеджер маркетплейсов",
            "Алексей Прохорченко — Специалист маркетплейсов",
            "Яна Завезен — CRM-маркетолог",
            "Роман Коваленко — Диджитал-маркетолог",
            "Ольга Афанасьева — Менеджер по продукту iTAB",
          ],
        },
        {
          name: "Отдел оптовых продаж",
          icon: "ShoppingCart",
          employees: [
            "Эльдар Мамедов — РООП",
            "Максим Корчев — Заместитель РООП",
            "Диана Гордиенко — Менеджер по продажам",
            "Вакансия — Менеджер по продажам",
          ],
        },
        {
          name: "Отдел брендинга и маркетинга",
          icon: "Megaphone",
          employees: [
            "Елизавета Ященко — Бренд-лид",
            "Мария Косторина — Project-менеджер",
            "Наталья Коткова — Дизайнер",
            "Вакансия — SMM-менеджер",
            "Вакансия — Инфлюенс-маркетолог",
            "Яна Завезен — Карманные блогеры",
            "Албина Гирсова — Амбассадоры",
            "Контент-мейкеры",
          ],
        },
        {
          name: "Операционный отдел",
          icon: "Settings",
          employees: [
            "Олеся Фролова — Операционный директор",
            "Ирина Лебедева — Операционный специалист",
            "Бухгалтерия — аутсорс",
          ],
        },
        {
          name: "Финансовый отдел",
          icon: "DollarSign",
          employees: [
            "Лорина Хачатурян — Финансовый директор",
            "Бухгалтерия",
          ],
        },
      ],
    },
  ],
  services: [
    {
      id: "analytics",
      name: "Аналитик",
      icon: "BarChart3",
      description: "Бизнес-аналитика и данные",
      color: "analytics",
    },
    {
      id: "marketing",
      name: "Маркетинговое агентство",
      icon: "Megaphone",
      description: "Продвижение и реклама",
      color: "marketing",
    },
    {
      id: "fulfillment",
      name: "Фулфилмент",
      icon: "Warehouse",
      description: "Хранение и отгрузка",
      color: "fulfillment",
    },
  ],
};

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
  const colorMap: Record<string, { bg: string; icon: string; glow: string }> = {
    analytics: {
      bg: "bg-gradient-to-br from-amber-500 to-orange-600",
      icon: "text-amber-100",
      glow: "shadow-amber-500/30",
    },
    marketing: {
      bg: "bg-gradient-to-br from-purple-500 to-violet-700",
      icon: "text-purple-100",
      glow: "shadow-purple-500/30",
    },
    fulfillment: {
      bg: "bg-gradient-to-br from-rose-500 to-pink-700",
      icon: "text-rose-100",
      glow: "shadow-rose-500/30",
    },
  };

  const c = colorMap[service.color];

  return (
    <div
      className={`rounded-2xl ${c.bg} shadow-xl ${c.glow} p-5 flex flex-col items-center text-center gap-3 flex-1 min-w-[160px] transition-transform duration-200 hover:scale-105`}
    >
      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
        <Icon name={service.icon} size={26} className="text-white" fallback="Star" />
      </div>
      <div>
        <p className="text-sm font-bold text-white font-montserrat leading-tight">{service.name}</p>
        <p className="text-xs text-white/70 font-golos mt-1">{service.description}</p>
      </div>
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
        </div>

        {/* Owner */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 border border-white/20 rounded-2xl px-8 py-4 flex items-center gap-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Icon name="Crown" size={24} className="text-yellow-400" fallback="User" />
            </div>
            <div>
              <p className="text-xs text-white/40 font-medium uppercase tracking-widest">Холдинг</p>
              <p className="text-xl font-black text-white font-montserrat">{orgData.owner.name}</p>
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