export const TAB_FORM = 'form'
export const TAB_SUCCESS = 'success'
export const TAB_FAIL = 'fail'
export const TAB_LOADING = 'loading'
export const TAB_NO_USERNAME = 'no_username'

export const ORDER_MAX_FILES = 5

export const accept = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.bmp',
  '.tiff',
  '.heic',
  '.heif',
  '.svg',
  '.ico',

  '.pdf',
  '.txt',
  '.csv',
  '.rtf',
  '.html',
  '.xml',

  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',

  '.odt',
  '.ods',
  '.odp'
]?.join(',')

export const allowedTypes = [
  // Изображения
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/tiff',
  'image/heic',
  'image/heif',
  'image/svg+xml',
  'image/x-icon',

  // Документы
  'application/pdf',
  'text/plain',
  'text/csv',
  'text/rtf',
  'text/html',
  'application/rtf',
  'application/xml',

  // Microsoft Office
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx

  // OpenDocument / LibreOffice
  'application/vnd.oasis.opendocument.text',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.presentation'
]

export const facults = [
  { label: 'ММФ', value: 'ММФ' },
  { label: 'ЭФ', value: 'ЭФ' },
  { label: 'ФФ', value: 'ФФ' },
  { label: 'ФИТ', value: 'ФИТ' },
  { label: 'ГГФ', value: 'ГГФ' },
  { label: 'ФЕН', value: 'ФЕН' },
  { label: 'ГИ', value: 'ГИ' },
  { label: 'ИФП', value: 'ИФП' },
  { label: 'ФМП', value: 'ФМП' },
  { label: 'ФФМК', value: 'ФФМК' },
  { label: 'ИИР', value: 'ИИР' }
]

export const durations = [
  {
    name: 'ММФ',
    value: [
      { label: 'Математика и механика', value: 'Математика и механика' },
      { label: 'Математика и компьютерные науки', value: 'Математика и компьютерные науки' }
    ]
  },
  {
    name: 'ЭФ',
    value: [
      { label: 'Экономика', value: 'Экономика' },
      { label: 'Менеджмент', value: 'Менеджмент' },
      { label: 'Бизнес-информатика', value: 'Бизнес-информатика' },
      { label: 'Социология', value: 'Социология' },
      { label: 'Юриспруденция', value: 'Юриспруденция' }
    ]
  },
  {
    name: 'ФФ',
    value: [
      { label: 'Физика. Общая и фундаментальная физика', value: 'Физика. Общая и фундаментальная физика' },
      { label: 'Физика. Физическая информатика', value: 'Физика. Физическая информатика' },
      { label: 'Прикладные математика и физика', value: 'Прикладные математика и физика' }
    ]
  },
  {
    name: 'ФИТ',
    value: [
      { label: 'Информатика и ВТ. Программная инженерия и компьютерные науки', value: 'Информатика и ВТ. Программная инженерия и компьютерные науки' },
      { label: 'Информатика и ВТ. Компьютерные науки и системотехника', value: 'Информатика и ВТ. Компьютерные науки и системотехника' }
    ]
  },
  {
    name: 'ГГФ',
    value: [
      { label: 'Геология', value: 'Геология' }
    ]
  },
  {
    name: 'ФЕН',
    value: [
      { label: 'Химия. Фундаментальная наука и прорывные технологии', value: 'Химия. Фундаментальная наука и прорывные технологии' },
      { label: 'Фундаментальная и прикладная химия', value: 'Фундаментальная и прикладная химия' },
      { label: 'Биология. Передовые исследования и технологии', value: 'Биология. Передовые исследования и технологии' }
    ]
  },
  {
    name: 'ГИ',
    value: [
      { label: 'Филология', value: 'Филология' },
      { label: 'Фундаментальная и прикладная лингвистика', value: 'Фундаментальная и прикладная лингвистика' },
      { label: 'История', value: 'История' },
      { label: 'Востоковедение и африканистика', value: 'Востоковедение и африканистика' },
      { label: 'Лингвистика', value: 'Лингвистика' },
      { label: 'Журналистика', value: 'Журналистика' }
    ]
  },
  {
    name: 'ИФП',
    value: [
      { label: 'Юриспруденция', value: 'Юриспруденция' },
      { label: 'Философия', value: 'Философия' }
    ]
  },
  {
    name: 'ФМП',
    value: [
      { label: 'Лечебное дело', value: 'Лечебное дело' },
      { label: 'Психология', value: 'Психология' }
    ]
  },
  {
    name: 'ФФМК',
    value: [
      { label: 'Медицинская кибернетика', value: 'Медицинская кибернетика' }
    ]
  },
  {
    name: 'ИИР',
    value: [
      { label: 'Мехатроника и робототехника. Искусственный интеллект', value: 'Мехатроника и робототехника. Искусственный интеллект' },
      { label: 'Прикладная информатика. Прикладной искусственный интеллект', value: 'Прикладная информатика. Прикладной искусственный интеллект' }
    ]
  }
]
