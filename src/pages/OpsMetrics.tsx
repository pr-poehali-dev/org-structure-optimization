import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface Metric {
  id: number;
  title: string;
  icon: string;
  color: string;
  unit: string;
  prev: number;
  current: number;
  goodDirection: "up" | "down";
  what: string;
  how: string;
  source: string;
}

const metrics: Metric[] = [
  {
    id: 1,
    title: "Задачи в срок",
    icon: "CalendarCheck",
    color: "emerald",
    unit: "%",
    prev: 71,
    current: 84,
    goodDirection: "up",
    what: "Дисциплина исполнения задач по компаниям.",
    how: "(Выполнено в срок ÷ всего завершённых) × 100.",
    source: "Битрикс24 → Задачи и проекты",
  },
  {
    id: 2,
    title: "Новые регламенты",
    icon: "FilePlus2",
    color: "blue",
    unit: "шт",
    prev: 3,
    current: 5,
    goodDirection: "up",
    what: "Рост «описанности» компании за месяц.",
    how: "Счётчик выпущенных и внедрённых регламентов.",
    source: "Реестр регламентов на диске",
  },
  {
    id: 3,
    title: "Процессы с регламентом",
    icon: "ClipboardCheck",
    color: "indigo",
    unit: "%",
    prev: 42,
    current: 55,
    goodDirection: "up",
    what: "Доля стандартизированных ключевых процессов.",
    how: "(Процессов с регламентом ÷ всего ключевых) × 100.",
    source: "Google-лист «Реестр процессов»",
  },
  {
    id: 4,
    title: "Сбои устранены",
    icon: "ShieldCheck",
    color: "amber",
    unit: "%",
    prev: 78,
    current: 90,
    goodDirection: "up",
    what: "Как быстро система чинит сама себя.",
    how: "(Закрытые сбои ÷ выявленные) × 100.",
    source: "Журнал инцидентов, тег «Сбой»",
  },
  {
    id: 5,
    title: "Решение рассинхрона",
    icon: "Users",
    color: "pink",
    unit: "дн",
    prev: 4.5,
    current: 2.8,
    goodDirection: "down",
    what: "Среднее время разрешения рассинхрона между отделами.",
    how: "Среднее число дней от открытия до закрытия кейса.",
    source: "Журнал, тег «Рассинхрон»",
  },
  {
    id: 6,
    title: "Выдача доступа/данных",
    icon: "KeyRound",
    color: "violet",
    unit: "ч",
    prev: 9,
    current: 5,
    goodDirection: "down",
    what: "Скорость обеспечения доступами, файлами, реквизитами.",
    how: "Среднее время от запроса до выдачи.",
    source: "Задачи с тегом «Доступ/Данные»",
  },
  {
    id: 7,
    title: "Процессы с ответственным",
    icon: "UserCheck",
    color: "teal",
    unit: "%",
    prev: 68,
    current: 80,
    goodDirection: "up",
    what: "Нет «ничьих» зон ответственности.",
    how: "(Процессов с ответственным ÷ всего) × 100.",
    source: "Google-лист «Реестр процессов»",
  },
];

const palette: Record<string, { from: string; ring: string; text: string }> = {
  emerald: { from: "from-emerald-500 to-teal-700", ring: "ring-emerald-400/30", text: "text-emerald-300" },
  blue: { from: "from-blue-500 to-blue-700", ring: "ring-blue-400/30", text: "text-blue-300" },
  indigo: { from: "from-indigo-500 to-indigo-700", ring: "ring-indigo-400/30", text: "text-indigo-300" },
  amber: { from: "from-amber-500 to-orange-600", ring: "ring-amber-400/30", text: "text-amber-300" },
  pink: { from: "from-pink-500 to-rose-600", ring: "ring-pink-400/30", text: "text-pink-300" },
  violet: { from: "from-violet-500 to-purple-700", ring: "ring-violet-400/30", text: "text-violet-300" },
  teal: { from: "from-teal-500 to-cyan-700", ring: "ring-teal-400/30", text: "text-teal-300" },
};

const Trend = ({ m }: { m: Metric }) => {
  const diff = +(m.current - m.prev).toFixed(1);
  const isGood = m.goodDirection === "up" ? diff > 0 : diff < 0;
  const isFlat = diff === 0;
  const arrow = diff === 0 ? "Minus" : diff > 0 ? "TrendingUp" : "TrendingDown";
  const cls = isFlat ? "text-white/40 bg-white/10" : isGood ? "text-emerald-300 bg-emerald-500/15" : "text-rose-300 bg-rose-500/15";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${cls}`}>
      <Icon name={arrow} size={12} fallback="Minus" />
      {diff > 0 ? "+" : ""}
      {diff}
    </span>
  );
};

const MetricCard = ({ m }: { m: Metric }) => {
  const p = palette[m.color] || palette.emerald;
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.from} ring-1 ${p.ring} flex items-center justify-center shrink-0`}>
          <Icon name={m.icon} size={20} className="text-white" fallback="Activity" />
        </div>
        <h3 className="text-white font-bold font-montserrat leading-tight text-sm">{m.title}</h3>
      </div>

      <div className="flex items-end gap-3 mb-1">
        <span className="text-4xl font-black text-white font-montserrat leading-none">
          {m.current}
          <span className="text-lg text-white/40 font-bold ml-1">{m.unit}</span>
        </span>
        <Trend m={m} />
      </div>
      <p className="text-white/40 text-xs mb-4">
        было {m.prev}
        {m.unit} → стало {m.current}
        {m.unit}
      </p>

      <div className="mt-auto space-y-2 text-xs border-t border-white/10 pt-3">
        <p className="text-white/60">{m.what}</p>
        <p className="text-white/40">
          <span className="text-white/50 font-semibold">Как считать: </span>
          {m.how}
        </p>
        <p className={`${p.text} flex items-center gap-1`}>
          <Icon name="Database" size={11} fallback="Folder" />
          {m.source}
        </p>
      </div>
    </div>
  );
};

const OpsMetrics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-indigo-600/5 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-emerald-600/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium mb-4">
            <Icon name="Gauge" size={12} fallback="Activity" />
            Ежемесячный отчёт перед ГД
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white font-montserrat tracking-tight">
            Метрики операционного директора
          </h1>
          <p className="text-white/40 text-sm mt-2">
            Олеся Фролова · процессы, регламенты, ответственные, синхрон
          </p>
          <div className="no-print mt-4 flex flex-wrap items-center justify-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/70 hover:text-white text-xs font-medium transition-all"
            >
              <Icon name="LayoutGrid" size={13} fallback="ArrowLeft" />
              Структура холдинга
            </Link>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/30 text-indigo-100 text-xs font-medium transition-all"
            >
              <Icon name="Printer" size={13} fallback="Download" />
              Сохранить в PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <MetricCard key={m.id} m={m} />
          ))}
        </div>

        <div className="mt-8 max-w-3xl mx-auto rounded-2xl bg-white/5 border border-white/10 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Lightbulb" size={16} className="text-amber-300" fallback="Info" />
            <h2 className="text-white font-bold font-montserrat">Как отслеживать</h2>
          </div>
          <ul className="text-white/60 text-sm space-y-1.5 list-disc list-inside">
            <li>Один Google-лист «Реестр процессов» закрывает метрики «процессы с регламентом» и «с ответственным».</li>
            <li>Журнал в Битрикс24 с тегами «Сбой», «Рассинхрон», «Доступ/Данные» — метрики 4, 5, 6.</li>
            <li>Встроенные отчёты Битрикс24 дают задачи в срок и новые регламенты.</li>
            <li>В конце месяца ~30 минут: выгрузить цифры → занести в сводную → показать ГД динамику «было → стало».</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OpsMetrics;
