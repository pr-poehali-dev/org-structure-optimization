export interface Metric {
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

export const metrics: Metric[] = [
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

export const palette: Record<string, { from: string; ring: string; text: string }> = {
  emerald: { from: "from-emerald-500 to-teal-700", ring: "ring-emerald-400/30", text: "text-emerald-300" },
  blue: { from: "from-blue-500 to-blue-700", ring: "ring-blue-400/30", text: "text-blue-300" },
  indigo: { from: "from-indigo-500 to-indigo-700", ring: "ring-indigo-400/30", text: "text-indigo-300" },
  amber: { from: "from-amber-500 to-orange-600", ring: "ring-amber-400/30", text: "text-amber-300" },
  pink: { from: "from-pink-500 to-rose-600", ring: "ring-pink-400/30", text: "text-pink-300" },
  violet: { from: "from-violet-500 to-purple-700", ring: "ring-violet-400/30", text: "text-violet-300" },
  teal: { from: "from-teal-500 to-cyan-700", ring: "ring-teal-400/30", text: "text-teal-300" },
};

export const exportMetricsToExcel = () => {
  import("xlsx").then((XLSX) => {
    const header = [
      "№",
      "Метрика",
      "Ед.",
      "Было",
      "Стало",
      "Динамика",
      "Хорошо когда",
      "Что показывает",
      "Как считать",
      "Источник данных",
    ];

    const rows = metrics.map((m) => {
      const diff = +(m.current - m.prev).toFixed(2);
      return [
        m.id,
        m.title,
        m.unit,
        m.prev,
        m.current,
        { f: `E${m.id + 1}-D${m.id + 1}` },
        m.goodDirection === "up" ? "растёт" : "падает",
        m.what,
        m.how,
        m.source,
      ];
    });

    const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);
    ws["!cols"] = [
      { wch: 4 },
      { wch: 26 },
      { wch: 5 },
      { wch: 7 },
      { wch: 7 },
      { wch: 9 },
      { wch: 13 },
      { wch: 42 },
      { wch: 42 },
      { wch: 30 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Метрики");

    const date = new Date().toISOString().slice(0, 7);
    XLSX.writeFile(wb, `Метрики-опердиректора-${date}.xlsx`);
  });
};
