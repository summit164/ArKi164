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
  { label: 'Математика и механика , Математика и компьютерные науки', value: 'Математика и механика , Математика и компьютерные науки' },
  { label: 'Экономика , Менеджмент , Бизнес-информатика , Социология , Юриспруденция', value: 'Экономика , Менеджмент , Бизнес-информатика , Социология , Юриспруденция' },
  { label: 'Физика. Общая и фундаментальная физика , Физика. Физическая информатика ,  Прикладные математика и физика', value: 'Физика. Общая и фундаментальная физика , Физика. Физическая информатика ,  Прикладные математика и физика' },
  { label: 'Информатика и ВТ. Программная инженерия и компьютерные науки , Информатика и ВТ. Компьютерные науки и системотехника', value: 'Информатика и ВТ. Программная инженерия и компьютерные науки , Информатика и ВТ. Компьютерные науки и системотехника' },
  { label: 'Геология', value: 'Геология' },
  { label: 'Химия. Фундаментальная наука и прорывные технологии , Фундаментальная и прикладная химия , Биология. Передовые исследования и технологии', value: 'Химия. Фундаментальная наука и прорывные технологии , Фундаментальная и прикладная химия , Биология. Передовые исследования и технологии' },
  { label: 'Филология , Фундаментальная и прикладная лингвистика , История , Востоковедение и африканистика , Лингвистика , Журналистика ', value: 'Филология , Фундаментальная и прикладная лингвистика , История , Востоковедение и африканистика , Лингвистика , Журналистика' },
  { label: 'Юриспруденция , Философия', value: 'Юриспруденция , Философия' },
  { label: 'Лечебное дело , Психология', value: 'Лечебное дело , Психология' },
  { label: 'Медицинская кибернетика', value: 'Медицинская кибернетика' },
  { label: 'Мехатроника и робототехника. Искусственный интеллект , Прикладная информатика. Прикладной искусственный интеллект', value: 'Мехатроника и робототехника. Искусственный интеллект , Прикладная информатика. Прикладной искусственный интеллект' }
]
